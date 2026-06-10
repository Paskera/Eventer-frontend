import { restAxios } from '../api';

export interface Notification {
  id: number;
  user_id: number;
  event_id: number | null;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const apiNotifications = {
  getMyNotifications: async (): Promise<Notification[]> => {
    return (await restAxios.get('/api/notifications/my/')).data;
  },

  getUnreadCount: async (): Promise<{ count: number }> => {
    return (await restAxios.get('/api/notifications/unread-count/')).data;
  },

  markAsRead: async (notificationId: number): Promise<Notification> => {
    return (await restAxios.patch(`/api/notifications/${notificationId}/read/`)).data;
  },

  markAllAsRead: async (): Promise<void> => {
    await restAxios.patch('/api/notifications/read-all/');
  },

  sendEventNotification: async (
    eventId: number,
    data: { title: string; message: string }
  ): Promise<Notification[]> => {
    return (await restAxios.post(`/api/notifications/send/${eventId}/`, data)).data;
  },
};
