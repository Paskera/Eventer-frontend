import { useState } from 'react';

export interface EventFormData {
  eventName: string;
  description: string;
  venue: string;
  format: 'online' | 'offline' | 'hybrid';
  participationType: 'solo' | 'team';
  usersCount: number;
  category: number;
  startDate?: Date;
  endDate?: Date;
  eventImage?: File | null;
}

const initialFormData: EventFormData = {
  eventName: '',
  description: '',
  venue: '',
  format: 'offline',
  participationType: 'team',
  usersCount: 0,
  category: 1,
  startDate: undefined,
  endDate: undefined,
  eventImage: null,
};

export const useEventForm = (initialState: Partial<EventFormData> = {}) => {
  const [formData, setFormData] = useState<EventFormData>({
    ...initialFormData,
    ...initialState,
  });

  const handleFormChange = (
    field: keyof EventFormData,
    value: EventFormData[keyof EventFormData]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return { formData, setFormData, handleFormChange };
};