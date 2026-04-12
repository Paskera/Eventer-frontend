import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import type { Layer } from '../data';
import { PageSizeSettings } from '../components/PageSizeModal';

interface PersistenceData {
  layers: Layer[];
  backgroundImage: string | null;
  pageSizeSettings: PageSizeSettings;
  updatedAt: number;
}

export const CERTIFICATE_DRAFT_STORAGE_KEY = 'eventer_certificate_draft_v2';
export const CERTIFICATE_DRAFT_STEPS_STORAGE_KEY = 'eventer_certificate_draft_steps_v1';
const AUTOSAVE_DELAY = 1200; // debounce after change
const MAX_DRAFT_STEPS = 30;

function createDraftFingerprint(data: Omit<PersistenceData, "updatedAt">): string {
  return JSON.stringify({
    layers: data.layers,
    backgroundImage: data.backgroundImage,
    pageSizeSettings: data.pageSizeSettings,
  })
}

function readDraftSteps(): PersistenceData[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CERTIFICATE_DRAFT_STEPS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as PersistenceData[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter((s) => Array.isArray(s.layers))
  } catch {
    return []
  }
}

function appendDraftStep(step: PersistenceData) {
  const prev = readDraftSteps()
  const prevLast = prev[prev.length - 1]
  const nextBase = prev.slice()

  if (prevLast) {
    const prevFp = createDraftFingerprint({
      layers: prevLast.layers,
      backgroundImage: prevLast.backgroundImage,
      pageSizeSettings: prevLast.pageSizeSettings,
    })
    const nextFp = createDraftFingerprint({
      layers: step.layers,
      backgroundImage: step.backgroundImage,
      pageSizeSettings: step.pageSizeSettings,
    })

    // Если фактически ничего не изменилось — не плодим новый шаг.
    if (prevFp === nextFp) {
      localStorage.setItem(CERTIFICATE_DRAFT_STORAGE_KEY, JSON.stringify(step))
      return
    }
  }

  nextBase.push(step)
  const trimmed = nextBase.slice(-MAX_DRAFT_STEPS)
  localStorage.setItem(CERTIFICATE_DRAFT_STEPS_STORAGE_KEY, JSON.stringify(trimmed))
  // Храним latest-ключ для обратной совместимости.
  localStorage.setItem(CERTIFICATE_DRAFT_STORAGE_KEY, JSON.stringify(step))
}

export function certificateDraftExistsInStorage(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const steps = readDraftSteps()
    const lastStep = steps[steps.length - 1]
    if (lastStep && Array.isArray(lastStep.layers) && lastStep.layers.length > 0) {
      return true
    }
    const raw = localStorage.getItem(CERTIFICATE_DRAFT_STORAGE_KEY)
    if (!raw) return false
    const data = JSON.parse(raw) as PersistenceData
    return Array.isArray(data.layers) && data.layers.length > 0
  } catch {
    return false
  }
}

interface UseCertificatePersistenceProps {
  layers: Layer[];
  backgroundImage: string | null;
  pageSizeSettings: PageSizeSettings;
  setLayers: (layers: Layer[] | ((prev: Layer[]) => Layer[]), saveHistory?: boolean) => void;
  setBackgroundImage: (image: string | null) => void;
  setPageSizeSettings: (settings: PageSizeSettings) => void;
  enabled?: boolean;
  /** Если false — не подставлять черновик из localStorage при монтировании (выбор в стартовом меню). */
  autoLoadOnMount?: boolean;
  /** Слои с учётом несохранённого в state текста в contenteditable (иначе автосейв пишет старое). */
  getLayersForPersistence?: () => Layer[];
}

export function useCertificatePersistence({
  layers,
  backgroundImage,
  pageSizeSettings,
  setLayers,
  setBackgroundImage,
  setPageSizeSettings,
  enabled = true,
  autoLoadOnMount = true,
  getLayersForPersistence,
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

  const restoreDraftFromLocalStorage = useCallback(
    (options?: { silent?: boolean }): boolean => {
      if (!enabled) return false
      try {
        const steps = readDraftSteps()
        const fromSteps = steps.length > 0 ? steps[steps.length - 1] : null
        const saved = localStorage.getItem(CERTIFICATE_DRAFT_STORAGE_KEY)
        const fallback = saved ? (JSON.parse(saved) as PersistenceData) : null
        const data: PersistenceData | null = fromSteps ?? fallback
        if (!data) return false

        if (data.layers) setLayers(data.layers, false)
        if (data.backgroundImage !== undefined) setBackgroundImage(data.backgroundImage)
        if (data.pageSizeSettings) setPageSizeSettings(data.pageSizeSettings)
        if (data.updatedAt) setLastSaved(new Date(data.updatedAt))
        stateRef.current = {
          layers: data.layers ?? stateRef.current.layers,
          backgroundImage: data.backgroundImage ?? stateRef.current.backgroundImage,
          pageSizeSettings: data.pageSizeSettings ?? stateRef.current.pageSizeSettings,
        }
        isDirty.current = false
        if (!options?.silent) {
          toast.info("Черновик восстановлен из локального хранилища")
        }
        return true
      } catch (e) {
        console.error("Failed to load draft", e)
        toast.error("Не удалось восстановить черновик")
        return false
      }
    },
    [enabled, setLayers, setBackgroundImage, setPageSizeSettings],
  )

  // Load state on mount (опционально — на главной странице конструктора ждём выбор в модалке)
  useEffect(() => {
    if (!enabled) {
      setIsInitialized(true)
      return
    }

    if (autoLoadOnMount) {
      restoreDraftFromLocalStorage()
    }
    setIsInitialized(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, autoLoadOnMount])

  // Manual save function (overrides.layers — пока текст только в editingText, ref ещё без правок до blur)
  const save = useCallback(
    (
      showToast = true,
      options?: { layers?: Layer[]; recordStep?: boolean },
    ) => {
      if (!enabled) {
        setLastSaved(new Date())
        return
      }

      try {
        const layersToSave =
          options?.layers ??
          getLayersForPersistence?.() ??
          stateRef.current.layers
        const data: PersistenceData = {
          layers: layersToSave,
          backgroundImage: stateRef.current.backgroundImage,
          pageSizeSettings: stateRef.current.pageSizeSettings,
          updatedAt: Date.now(),
        }
        const shouldRecordStep = options?.recordStep ?? true
        if (shouldRecordStep) {
          appendDraftStep(data)
        } else {
          localStorage.setItem(CERTIFICATE_DRAFT_STORAGE_KEY, JSON.stringify(data))
        }
        stateRef.current = {
          ...stateRef.current,
          layers: layersToSave,
        }
        setLastSaved(new Date())
        isDirty.current = false

        if (showToast) {
          toast.success("Сертификат успешно сохранен")
        }
      } catch (e) {
        console.error("Failed to save draft", e)
        if (showToast) {
          toast.error("Ошибка при сохранении")
        }
      }
    },
    [enabled, getLayersForPersistence],
  )

  // Auto-save as draft step after each change (debounced)
  useEffect(() => {
    if (!enabled || !isInitialized) return

    if (!isDirty.current) return

    const timeoutId = window.setTimeout(() => {
      if (isDirty.current) {
        save(false, { recordStep: true }) // Silent step save
      }
    }, AUTOSAVE_DELAY)

    return () => window.clearTimeout(timeoutId)
  }, [enabled, isInitialized, layers, backgroundImage, pageSizeSettings, save])

  return {
    save,
    lastSaved,
    restoreDraftFromLocalStorage,
  };
}
