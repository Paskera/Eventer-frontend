import { restAxios } from '../api';

export interface BracketTeam {
  id: number | null;
  name: string | null;
  from_match?: number;
}

export interface BracketMatch {
  id: number;
  match_number: number;
  status: string;
  teams: BracketTeam[];
  scheduled_time: string | null;
}

export interface BracketRound {
  round_number: number;
  matches: BracketMatch[];
}

export interface BracketGroup {
  id: number;
  name: string;
  rounds: BracketRound[];
}

export interface BracketRead {
  groups: BracketGroup[];
}

export const apiBracket = {
  getBracket: async (event_id: number, stage_id: number): Promise<BracketRead> => {
    return (await restAxios.get(`/api/events/${event_id}/stages/${stage_id}/bracket/`)).data;
  },

  generateBracket: async (event_id: number, stage_id: number, data: any): Promise<BracketRead> => {
    return (await restAxios.post(`/api/events/${event_id}/stages/${stage_id}/bracket/generate`, data)).data;
  },
};
