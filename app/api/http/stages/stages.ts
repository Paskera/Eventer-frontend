import { restAxios } from '../api';
import { FileRequirement } from '../submissions/submissions';

export interface StageResource {
  id: number
  title: string
  resource_type: 'link' | 'file'
  url_path: string
}

export interface Stages {
  stage_name: string
  description: string
  stage_type: string
  users_on_stage: number
  stage_status: string
  id: number
  start_date: string
  end_date: string
  stage_format?: string
  max_slots?: number
  requirements?: FileRequirement[]
  resources?: StageResource[]
  content?: string
  max_files?: number
  bracket_type?: string
  settings?: any
}

export const apiStages = {
  getAllStages: async (event_id: number): Promise<Stages[]> => {
    return (await restAxios.get(`/api/events/${event_id}/stages/`)).data
  },

  getStage: async (event_id: number, stage_id: number): Promise<Stages> => {
    return (await restAxios.get(`/api/events/${event_id}/stages/${stage_id}/`)).data
  },

  createStage: async (event_id: number, data: Partial<Stages>): Promise<Stages> => {
    return (await restAxios.post(`/api/events/${event_id}/stages/`, data)).data
  },

  updateStage: async (event_id: number, stage_id: number, data: Partial<Stages>): Promise<Stages> => {
    return (await restAxios.patch(`/api/events/${event_id}/stages/${stage_id}/`, data)).data
  },

  deleteStage: async (event_id: number, stage_id: number): Promise<void> => {
    await restAxios.delete(`/api/events/${event_id}/stages/${stage_id}/`);
  },
}
