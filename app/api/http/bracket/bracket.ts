import { restAxios } from '../api';

export interface BracketTeam {
  id: number | null;
  name: string | null;
  from_match?: number | null;
}

export interface BracketMatch {
  id: number;
  match_number: number;
  status: 'pending' | 'open' | 'completed' | 'cancelled' | 'walkover' | 'disputed' | 'draw';
  scheduled_time: string | null;
  completion_type: 'normal' | 'walkover' | 'draw' | null;
  winner_id: number | null;
  score_data: Record<string, any> | null;
  teams: BracketTeam[];
}

export interface BracketRound {
  round_number: number;
  matches: BracketMatch[];
}

export interface BracketGroup {
  id: number;
  name: string;
  group_type: string;
  rounds: BracketRound[];
}

export interface BracketRead {
  stage_id: number;
  bracket_type: string;
  settings: Record<string, any>;
  groups: BracketGroup[];
}

export interface CompleteMatchRequest {
  winner_team_id: number;
  score_data?: Record<string, any>;
}

export interface WalkoverMatchRequest {
  winner_team_id: number;
}

export interface DrawMatchRequest {
  score_data?: Record<string, any>;
}

export const apiBracket = {
  getBracket: async (event_id: number, stage_id: number): Promise<BracketRead> => {
    return (await restAxios.get(`/api/events/${event_id}/stages/${stage_id}/bracket/`)).data;
  },

  generateBracket: async (event_id: number, stage_id: number, data: any): Promise<BracketRead> => {
    return (await restAxios.post(`/api/events/${event_id}/stages/${stage_id}/bracket/generate`, data)).data;
  },

  completeMatch: async (event_id: number, stage_id: number, match_id: number, data: CompleteMatchRequest): Promise<BracketRead> => {
    return (await restAxios.patch(`/api/events/${event_id}/stages/${stage_id}/bracket/matches/${match_id}/complete`, data)).data;
  },

  walkoverMatch: async (event_id: number, stage_id: number, match_id: number, data: WalkoverMatchRequest): Promise<BracketRead> => {
    return (await restAxios.patch(`/api/events/${event_id}/stages/${stage_id}/bracket/matches/${match_id}/walkover`, data)).data;
  },

  drawMatch: async (event_id: number, stage_id: number, match_id: number, data: DrawMatchRequest): Promise<BracketRead> => {
    return (await restAxios.patch(`/api/events/${event_id}/stages/${stage_id}/bracket/matches/${match_id}/draw`, data)).data;
  },
};
