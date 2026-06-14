import { restAxios } from '../api';

export interface EventJudge {
  id: number;
  event_id: number;
  judge_id: number;
}

export interface DetailedEventJudge extends EventJudge {
  judge: {
    id: number;
    email: string;
    firstname: string | null;
    lastname: string | null;
    patronymic: string | null;
    avatar_url: string | null;
  };
}

export const apiEventJudges = {
  getDetailedEventJudges: async (eventId: number): Promise<DetailedEventJudge[]> => {
    return (await restAxios.get(`/api/event-judges/by-event/${eventId}/detailed`)).data;
  },

  addJudgeByEmail: async (eventId: number, email: string): Promise<EventJudge> => {
    return (await restAxios.post(`/api/event-judges/by-email`, { event_id: eventId, email })).data;
  },

  removeJudge: async (eventId: number, judgeId: number): Promise<void> => {
    await restAxios.delete(`/api/event-judges/by-event/${eventId}/judge/${judgeId}`);
  },
};
