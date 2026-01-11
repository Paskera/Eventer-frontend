import { restAxios } from '../api';

export interface StageCriteria {
  id: number;
  stage_id: number;
  criteria_name: string;
  description?: string;
  max_score: number;
  weight?: number;
  order?: number;
}

export interface CreateStageCriteriaRequest {
  stage_id: number;
  criteria_name: string;
  description?: string;
  max_score: number;
  weight?: number;
  order?: number;
}

export interface UpdateStageCriteriaRequest {
  criteria_name?: string;
  description?: string;
  max_score?: number;
  weight?: number;
  order?: number;
}

export const apiStageCriteria = {
  /**
   * Получить критерий по ID
   */
  getStageCriteria: async (id: number): Promise<StageCriteria> => {
    const response = await restAxios.get(`/api/stage-criteria/${id}/`);
    return response.data;
  },

  /**
   * Получить все критерии для этапа
   */
  getStageCriteriaByStage: async (stage_id: number): Promise<StageCriteria[]> => {
    const response = await restAxios.get(`/api/stage-criteria/by-stage/${stage_id}/`);
    return response.data;
  },

  /**
   * Создать новый критерий
   */
  createStageCriteria: async (data: CreateStageCriteriaRequest): Promise<StageCriteria> => {
    const response = await restAxios.post('/api/stage-criteria/', data);
    return response.data;
  },

  /**
   * Обновить критерий
   */
  updateStageCriteria: async (id: number, data: UpdateStageCriteriaRequest): Promise<StageCriteria> => {
    const response = await restAxios.patch(`/api/stage-criteria/${id}/`, data);
    return response.data;
  },

  /**
   * Удалить критерий
   */
  deleteStageCriteria: async (id: number): Promise<void> => {
    await restAxios.delete(`/api/stage-criteria/${id}/`);
  },

  /**
   * Копировать критерии из одного этапа в другой
   */
  copyStageCriteria: async (source_stage_id: number, target_stage_id: number): Promise<StageCriteria[]> => {
    const response = await restAxios.post(
      `/api/stage-criteria/copy/${source_stage_id}/${target_stage_id}/`
    );
    return response.data;
  },
};
