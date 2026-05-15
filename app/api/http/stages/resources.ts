import { restAxios } from '../api';

export interface StageResourceRead {
  id: number;
  title: string;
  resource_type: 'link' | 'file';
  url_path: string;
}

export interface ResourceFilePayload {
  title: string;
  file: File;
}

export const apiResources = {
  /**
   * Загрузить файл-ресурс к этапу.
   * Backend принимает multipart: payload (JSON string в form field) + file.
   */
  uploadResource: async (
    stageId: number,
    payload: ResourceFilePayload
  ): Promise<StageResourceRead> => {
    const formData = new FormData();
    formData.append(
      'payload',
      JSON.stringify({
        title: payload.title,
        resource_type: 'file',
        url_path: '',
      })
    );
    formData.append('file', payload.file);

    const response = await restAxios.post(
      `/api/stages/${stageId}/resources/`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  },

  /** Получить ссылку для скачивания ресурса */
  getDownloadUrl: async (stageId: number, resourceId: number): Promise<string> => {
    const response = await restAxios.get(
      `/api/stages/${stageId}/resources/${resourceId}/download`
    );
    return response.data.url;
  },

  /** Удалить ресурс */
  deleteResource: async (stageId: number, resourceId: number): Promise<void> => {
    await restAxios.delete(`/api/stages/${stageId}/resources/${resourceId}`);
  },
};
