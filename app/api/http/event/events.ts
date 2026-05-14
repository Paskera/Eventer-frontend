import { restAxios } from '../api';

interface Category {
  id: number;
  name: string;
}

export interface Events {
  event_name: string;
  description: string;
  image_url: string;
  users_count: number;
  format: 'online' | 'offline' | 'hybrid';
  venue: string;
  start_date: string;
  end_date: string;
  event_status: 'active' | 'cancelled' | 'completed';
  id: number;
  organizer_id: number;
  category: Category;
};

export interface EventStage {
  stage_name: string
  description: string
  type: string
  users_on_stage: number
  stage_status: string
  id: number
  start_date: string
  end_date: string
}


export interface Event {
  event_name: string;
  description: string;
  image_url: string;
  users_count: number;
  format: 'offline' | 'online' | string;
  venue: string;
  start_date: string;
  end_date: string;
  event_status: 'active' | 'inactive' | string;
  id: number;
  organizer_id: number;
  category_id: number;
  stages: EventStage[];
}

export interface CurrentEvents {
  team: string
  event: string
  stage: string
}

type EventsResponse = {
  events: Events[]
  total: number
  count: number
  offset: number
}

export interface EventStats {
  event_id: number;
  teams: {
    approved: number;
    pending: number;
    rejected: number;
  };
  total_teams: number;
  total_participants: number;
}

export interface EventCreateData {
  event_name: string;
  description: string;
  users_count: number;
  participation_type: 'team' | 'solo';
  format: 'online' | 'offline' | 'hybrid';
  venue: string;
  start_date: string;
  end_date: string;
  event_status?: 'active' | 'cancelled' | 'completed';
  organizer_id?: number;
  category_id: number;
  stages?: Array<{
    stage_name: string;
    description?: string;
    stage_type: 'content' | 'submission';
    stage_format: 'online' | 'offline' | 'hybrid';
    start_date: string;
    end_date: string;
    content?: string;
    requirements?: Array<{
      key: string;
      name: string;
      mimes: string[];
      required: boolean;
    }>;
    max_files?: number;
  }>;
}

export const apiEvents = {
  getAllEvents: async (params?: {
    name?: string | null
    page?: number
    page_size?: number
    venue?: string | null
    date?: string | null
    category?: string | null
    format?: string | null
    event_status?: string | null
  }): Promise<EventsResponse> => {
    return (await restAxios.get(`api/events/`, { params })).data
  },

  getParticipationsEvents: async (params?: {
    // name?: string | null
    page?: number
    page_size?: number
    // venue?: string | null
    date?: string | null
    category?: string | null
    // format?: string | null
    event_status?: string | null
  }): Promise<EventsResponse> => {
    return (await restAxios.get(`api/events/my/participations`, { params })).data
  },

  getCurrentEventsUser: async (): Promise<CurrentEvents[]> => {
    return (await restAxios.get(`/api/users/users/my/events/current`)).data
  },

  getEventStats: async (event_id: number): Promise<EventStats> => {
    return (await restAxios.get(`api/events/events/${event_id}/analytics`)).data
  },

  getEventDetail: async (id: number): Promise<Event> => {
    return (await restAxios.get(`api/events/${id}`)).data
  },

  // slavik // переделать
  getMyEvents: async (): Promise<{ events: Event[], total: number, count: number, offset: number }> => {
    const res = await restAxios.get(`api/events/my/participations/?page=1&page_size=10`);
    return res.data;
  },

  getMyCreatedEvents: async (params?: {
    page?: number;
    page_size?: number;
  }): Promise<EventsResponse> => {
    return (await restAxios.get(`api/events/my/created/`, { params })).data;
  },

  updateEvent: async (id: number, data: Partial<Event>): Promise<Event> => {
    return (await restAxios.patch(`api/events/${id}`, data)).data;
  },

  uploadEventImage: async (id: number, imageFile: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', imageFile);
    await restAxios.post(`api/events/${id}/upload-image/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteEvent: async (id: number): Promise<void> => {
    await restAxios.delete(`api/events/${id}`);
  },

  createEvent: async (data: EventCreateData, imageFile?: File): Promise<Event> => {
    const formData = new FormData();
    formData.append('event_payload', JSON.stringify(data));

    if (imageFile) {
      formData.append('file', imageFile);
    }

    return (await restAxios.post(`api/events/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })).data;
  },
}
