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
  requirements?: FileRequirement[]
  resources?: StageResource[]
}

export const apiStages = {
  getAllStages: async (event_id: number): Promise<Stages[]> => {
    return (await restAxios.get(`http://localhost:8000/api/events/${event_id}/stages/`)).data
  },
}
