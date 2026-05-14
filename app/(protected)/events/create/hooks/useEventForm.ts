import { useState, useEffect } from 'react';

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

const STORAGE_KEY = 'eventer_create_event_form';

export const useEventForm = (initialState: Partial<EventFormData> = {}) => {
  const [formData, setFormData] = useState<EventFormData>({
    ...initialFormData,
    ...initialState,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // Restore dates correctly
        if (parsedData.startDate) parsedData.startDate = new Date(parsedData.startDate);
        if (parsedData.endDate) parsedData.endDate = new Date(parsedData.endDate);
        
        setFormData(prev => ({
          ...prev,
          ...parsedData,
          // We don't restore eventImage as Files can't be stored in localStorage easily
          eventImage: prev.eventImage, 
        }));
      }
    } catch (e) {
      console.error('Failed to load draft from localStorage', e);
    }
  }, []);

  // Save to localStorage when form changes
  useEffect(() => {
    try {
      // Exclude eventImage from being saved
      const { eventImage, ...dataToSave } = formData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to save draft to localStorage', e);
    }
  }, [formData]);

  const handleFormChange = (
    field: keyof EventFormData,
    value: EventFormData[keyof EventFormData]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { formData, setFormData, handleFormChange, clearForm };
};