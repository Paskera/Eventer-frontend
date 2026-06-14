import { restAxios } from '../api';

export interface JoinTeam {
  event_id: number;
  invite_token: string;
}

export interface CreateTeam {
  event_id: number;
  name: string;
}

export interface TeamMember {
  id: number;
  firstname: string;
  lastname: string;
  role: 'LEADER' | 'MEMBER';
  consent_status: 'unverified' | 'verified' | 'not_required';
  has_consent_document: boolean;
}

export interface Team {
  id: number;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  members: TeamMember[];
}

export interface TeamsResponse {
  teams: Team[];
}

interface MyTeam {
  name: string;
  invite_token: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface MyMember {
  firstname: string;
  lastname: string;
  is_event_leader: boolean;
}

interface MyTeamWithMembers {
  team: MyTeam;
  members: MyMember[];
}

export const apiEventTeams = {
  getEventTeam: async (event_id: number): Promise<MyTeamWithMembers | null> => {
    try {
      return (await restAxios.get(`api/events/${event_id}/event-teams/my/`)).data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
  createTeam: async (event_id: number, file: File | null, name: string) => {
    const formData = new FormData();
    formData.append("name", name);
    if (file) {
      formData.append("consent_document", file);
    }
    return (await restAxios.post(`/api/events/${event_id}/event-teams/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })).data;
  },
  joinTeam: async (event_id: number, invite_token: string, file?: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append("consent_document", file);
      return (await restAxios.post(`/api/events/${event_id}/event-teams/join/${invite_token}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })).data;
    }
    return (await restAxios.post(`/api/events/${event_id}/event-teams/join/${invite_token}/`)).data;
  },
  getEventTeams: async (event_id: number, page?: number, page_size?: number): Promise<TeamsResponse> => {
    return (await restAxios.get(`/api/events/${event_id}/event-teams/`)).data;
  },

  updateTeamStatus: async (event_id: number, team_id: number, status: 'approved' | 'rejected'): Promise<void> => {
    await restAxios.post(`/api/events/${event_id}/event-teams/${team_id}/update-status/?new_status=${status}`);
  },

  deleteEventTeam: async (event_id: number, team_id: number): Promise<void> => {
    await restAxios.delete(`/api/events/${event_id}/event-teams/${team_id}/`);
  },

  regenerateInviteToken: async (event_id: number, team_id: number): Promise<string> => {
    return (await restAxios.post(`/api/events/${event_id}/event-teams/${team_id}/generate-invite-code/`)).data;
  },

  removeMember: async (event_id: number, team_id: number, member_id: number): Promise<void> => {
    await restAxios.delete(`/api/events/${event_id}/event-teams/${team_id}/members/${member_id}/`);
  },

  promoteToLeader: async (event_id: number, team_id: number, member_id: number): Promise<void> => {
    await restAxios.post(`/api/events/${event_id}/event-teams/${team_id}/members/${member_id}/promote/`);
  },

  getConsentUrl: async (event_id: number, team_id: number, member_id: number): Promise<{ url: string }> => {
    return (await restAxios.get(`/api/events/${event_id}/event-teams/${team_id}/members/${member_id}/consent-url/`)).data;
  },

  updateConsentStatus: async (event_id: number, team_id: number, member_id: number, status: 'verified' | 'unverified' | 'not_required'): Promise<void> => {
    await restAxios.post(`/api/events/${event_id}/event-teams/${team_id}/members/${member_id}/update-consent-status/?new_status=${status}`);
  },

  // getEventsTeams: async (params?: {
  //   event_id: number
  //   page?: number
  //   page_size?: number
  // }): Promise<TeamsResponse> => {
  //   return (await restAxios.get(`/api/events/${params?.event_id}/event-teams`, {params })).data
  // },

}

