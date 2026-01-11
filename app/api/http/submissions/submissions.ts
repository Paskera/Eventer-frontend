import { restAxios } from '../api';

export interface FileRequirement {
  id: string;
  name: string;
  mimes: string[];
  max_size_mb: number;
  is_required: boolean;
}

export interface StageSubmissionFile {
  id: number;
  requirement_id: string;
  original_filename: string;
  file_size: number;
  mime_type: string | null;
  created_at: string;
}

export interface StageSubmission {
  id: number;
  stage_id: number;
  user_id: number;
  team_id: number | null;
  created_at: string;
  updated_at: string;
  files: StageSubmissionFile[];
  meta: Record<string, any>;
}

export const apiSubmissions = {
  // Получить submissions для этапа (возвращает массив)
  getSubmission: async (stage_id: number): Promise<StageSubmission | null> => {
    try {
      const response = await restAxios.get(`/api/stages/${stage_id}/submissions`);
      const submissions = response.data;
      // API возвращает массив, берем первый элемент (или null если массив пустой)
      if (Array.isArray(submissions) && submissions.length > 0) {
        return submissions[0];
      }
      return null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  // Загрузить файл для requirement
  uploadFile: async (
    stage_id: number,
    requirement_id: string,
    file: File
  ): Promise<StageSubmission> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await restAxios.post(
      `/api/stages/${stage_id}/submissions/${requirement_id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Удалить файл
  deleteFile: async (submission_id: number, file_id: number): Promise<void> => {
    await restAxios.delete(`/api/submissions/${submission_id}/files/${file_id}`);
  },

  // Получить ссылку для скачивания файла
  getDownloadLink: async (file_id: number): Promise<string> => {
    const response = await restAxios.get(`/api/submissions/files/${file_id}/download`);
    return response.data.url;
  },
};
