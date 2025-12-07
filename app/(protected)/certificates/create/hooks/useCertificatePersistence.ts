import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { TextLayer, Layer } from '../data';
import { PageSizeSettings } from '../components/PageSizeModal';

interface PersistenceData {
  layers: Layer[];
  backgroundImage: string | null;
  pageSizeSettings: PageSizeSettings;
  updatedAt: number;
}

const STORAGE_KEY = 'eventer_certificate_draft_v2';
const AUTOSAVE_DELAY = 10000; // 10 seconds interval

interface UseCertificatePersistenceProps {
  layers: Layer[];
  backgroundImage: string | null;
  pageSizeSettings: PageSizeSettings;
  setLayers: (layers: Layer[]) => void;
  setBackgroundImage: (image: string | null) => void;
  setPageSizeSettings: (settings: PageSizeSettings) => void;
}

export function useCertificatePersistence({
  layers,
  backgroundImage,
  pageSizeSettings,
  setLayers,
  setBackgroundImage,
  setPageSizeSettings
}: UseCertificatePersistenceProps) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Refs to access latest state in interval without resetting it
  const stateRef = useRef({ layers, backgroundImage, pageSizeSettings });
  const isDirty = useRef(false);

  // Update refs when state changes
  useEffect(() => {
    stateRef.current = { layers, backgroundImage, pageSizeSettings };
    if (isInitialized) {
      isDirty.current = true;
    }
  }, [layers, backgroundImage, pageSizeSettings, isInitialized]);

  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data: PersistenceData = JSON.parse(saved);
        
        if (data.layers) setLayers(data.layers);
        if (data.backgroundImage !== undefined) setBackgroundImage(data.backgroundImage);
        if (data.pageSizeSettings) setPageSizeSettings(data.pageSizeSettings);
        
        if (data.updatedAt) {
          setLastSaved(new Date(data.updatedAt));
        }
        
        toast.info("Черновик восстановлен из локального хранилища");
      } catch (e) {
        console.error("Failed to load draft", e);
        toast.error("Не удалось восстановить черновик");
      }
    }
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Manual save function
  const save = useCallback((showToast = true) => {
    try {
      const data: PersistenceData = {
        layers: stateRef.current.layers,
        backgroundImage: stateRef.current.backgroundImage,
        pageSizeSettings: stateRef.current.pageSizeSettings,
        updatedAt: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastSaved(new Date());
      isDirty.current = false;
      
      if (showToast) {
        toast.success("Сертификат успешно сохранен");
      }
    } catch (e) {
      console.error("Failed to save draft", e);
      if (showToast) {
        toast.error("Ошибка при сохранении");
      }
    }
  }, []);

  // Auto-save interval
  useEffect(() => {
    if (!isInitialized) return;

    const intervalId = setInterval(() => {
      if (isDirty.current) {
        save(false); // Silent save
      }
    }, AUTOSAVE_DELAY);

    return () => clearInterval(intervalId);
  }, [isInitialized, save]);

  return {
    save,
    lastSaved
  };
}
