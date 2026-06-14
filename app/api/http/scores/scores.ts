import { restAxios } from '../api';

export interface StageScore {
  id: number;
  stage_criteria_id: number;
  stage_id: number;
  team_id: number;
  judge_id: number;
  score: number;
  comment: string | null;
}

export interface DetailedStageScore extends StageScore {
  judge: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  };
  criteria: {
    id: number;
    criteria_name: string;
    max_score: number;
    weight: number;
  };
}

export interface StageScoreCreate {
  stage_criteria_id: number;
  team_id: number;
  score: number;
  comment?: string | null;
}

export interface StageScoreUpdate {
  score?: number;
  comment?: string | null;
}

export const apiScores = {
  getDetailedScores: async (teamId: number, stageId: number): Promise<DetailedStageScore[]> => {
    return (await restAxios.get(`/api/stage-scores/by-team/${teamId}/stage/${stageId}/detailed`)).data;
  },

  getDetailedScoresByEvent: async (eventId: number): Promise<DetailedStageScore[]> => {
    return (await restAxios.get(`/api/stage-scores/by-event/${eventId}/detailed`)).data;
  },

  createScore: async (data: StageScoreCreate): Promise<StageScore> => {
    return (await restAxios.post(`/api/stage-scores/`, data)).data;
  },

  updateScore: async (scoreId: number, data: StageScoreUpdate): Promise<StageScore> => {
    return (await restAxios.patch(`/api/stage-scores/${scoreId}/`, data)).data;
  }
};
