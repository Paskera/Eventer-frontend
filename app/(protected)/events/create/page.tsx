"use client";

import { useState } from "react";
import { useEventForm } from "@/app/(protected)/events/create/hooks/useEventForm";
import { BasicSettings } from "@/app/(protected)/events/create/components/BasicSettings";
import { ImageUpload } from "@/app/(protected)/events/create/components/ImageUpload";
import { DaySelector } from "@/app/(protected)/events/create/components/DaySelector";
import { CheckpointList } from "@/app/(protected)/events/create/components/CheckpointList";
import { DocumentUpload } from "@/app/(protected)/events/create/components/DocumentUpload";
import { StatusControl } from "@/app/(protected)/events/create/components/StatusControl";
import { StepControl } from "@/app/(protected)/events/create/components/StepControl";
import { CheckpointModal } from "@/app/(protected)/events/create/components/CheckpointModal";
import { Stepper } from "@/app/(protected)/events/create/components/Stepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CalendarDays, FileText, Settings } from "lucide-react";
import { toast } from "sonner";

interface Checkpoint {
  id: number;
  title: string;
  subtitle: string;
  date: Date;
  startTime: string;
  endTime: string;
  description: string;
  format: 'online' | 'offline' | 'hybrid';
}

export default function CreateEvent() {
  const { formData, handleFormChange } = useEventForm();
  const {
    eventName,
    description,
    venue,
    format,
    participationType,
    usersCount,
    category,
    startDate,
    endDate,
    eventImage,
  } = formData;

  const [currentStep, setCurrentStep] = useState(1);
  const [currentStatus, setCurrentStatus] = useState("Черновик");
  const [isCheckpointModalOpen, setIsCheckpointModalOpen] = useState(false);
  const [editingCheckpoint, setEditingCheckpoint] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);


  const steps = [
    { number: 1, title: "Базовые настройки", icon: Settings },
    { number: 2, title: "Этапы мероприятия", icon: CalendarDays },
    { number: 3, title: "Документы", icon: FileText },
    { number: 4, title: "Публикация", icon: CheckCircle2 }
  ];

  const handleNext = () => {
    if (currentStep === 1 && (!startDate || !endDate)) {
      toast.error("Ошибка валидации", {
        description: "Пожалуйста, выберите даты начала и окончания мероприятия.",
      });
      return;
    }
    if (currentStep === 2 && checkpoints.length === 0) {
      toast.error("Ошибка валидации", {
        description: "Добавьте хотя бы один этап.",
      });
      return;
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddCheckpoint = () => {
    if (!selectedDate) {
      toast.warning("Не выбран день", {
        description: "Пожалуйста, выберите день для добавления нового этапа.",
      });
      return;
    }
    setEditingCheckpoint(null);
    setIsCheckpointModalOpen(true);
  };

  const handleEditCheckpoint = (id: number) => {
    setEditingCheckpoint(id);
    setIsCheckpointModalOpen(true);
  };

  const handleSaveCheckpoint = (checkpoint: {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    stage_type: 'online' | 'offline';
  }) => {
    if (editingCheckpoint) {
      setCheckpoints(prev => prev.map(cp =>
        cp.id === editingCheckpoint
          ? {
              ...cp,
              title: checkpoint.name,
              description: checkpoint.description,
              startTime: checkpoint.startTime,
              endTime: checkpoint.endTime,
              format: checkpoint.stage_type
            }
          : cp
      ));
    } else {
      const newCheckpoint = {
        id: checkpoints.length > 0
          ? Math.max(...checkpoints.map(cp => cp.id)) + 1
          : 1,
        title: checkpoint.name,
        subtitle: '',
        description: checkpoint.description,
        startTime: checkpoint.startTime,
        endTime: checkpoint.endTime,
        format: checkpoint.stage_type,
        date: selectedDate!
      };
      setCheckpoints(prev => [...prev, newCheckpoint]);
    }
    setIsCheckpointModalOpen(false);
    setEditingCheckpoint(null);
  };

  const handleFileUpload = (file: File, type: 'regulation' | 'task') => {
    console.log('Загрузка файла:', file.name, type);
    toast.success("Файл успешно загружен", {
      description: `Файл "${file.name}" был успешно загружен.`,
    });
  };

  const handleSave = async () => {
    if (!eventName || !description || !venue || !startDate || !endDate || checkpoints.length === 0) {
      toast.error("Ошибка сохранения", {
        description: "Пожалуйста, заполните все обязательные поля и добавьте хотя бы один этап.",
      });
      return;
    }
    
    const eventData = {
      event_name: eventName,
      description: description,
      users_count: usersCount,
      participation_type: participationType,
      format: format,
      venue: venue,
      start_date: startDate ? startDate.toISOString() : '',
      end_date: endDate ? endDate.toISOString() : '',
      event_status: 'active',
      organizer_id: 1,
      category_id: category,
      stages: checkpoints.map((checkpoint, index) => ({
        name: checkpoint.title,
        description: checkpoint.description,
        stage_type: checkpoint.format === 'online' ? 'online' : 'offline',
        start_time: new Date(`${new Date(checkpoint.date).toISOString().split('T')[0]}T${checkpoint.startTime}`).toISOString(),
        end_time: new Date(`${new Date(checkpoint.date).toISOString().split('T')[0]}T${checkpoint.endTime}`).toISOString(),
        order: index + 1,
        event_id: 0
      }))
    };

    const formData = new FormData();
    formData.append('event_payload', JSON.stringify(eventData));

    if (eventImage) {
      formData.append('file', eventImage);
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/events/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Мероприятие успешно создано:', result);
        toast.success("Мероприятие создано", {
          description: "Ваше мероприятие было успешно создано и сохранено.",
        });
      } else {
        const errorData = await response.json();
        console.error('Ошибка при создании мероприятия:', errorData);
        toast.error("Ошибка сервера", {
          description: `Не удалось создать мероприятие: ${errorData.detail || response.statusText}`,
        });
      }
    } catch (error) {
      console.error('Ошибка при создании мероприятия:', error);
      toast.error("Сетевая ошибка", {
        description: "Не удалось подключиться к серверу. Проверьте ваше интернет-соединение.",
      });
    }
  };

  const handleDaySelect = (date: Date) => {
    setSelectedDate(date);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <BasicSettings
              formData={formData}
              onFormChange={handleFormChange}
            />
           <ImageUpload
              onImageChange={(file) => handleFormChange('eventImage', file)}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <DaySelector
              startDate={startDate}
              endDate={endDate}
              activeDay={selectedDate}
              onDaySelect={handleDaySelect}
            />
            <CheckpointList
              stages={checkpoints}
              onAddCheckpoint={handleAddCheckpoint}
              onEditCheckpoint={handleEditCheckpoint}
              selectedDate={selectedDate}
            />
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in-50 duration-500">
            <DocumentUpload onFileUpload={handleFileUpload} />
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in-50 duration-500">
            <StatusControl
              currentStatus={currentStatus}
              onStatusChange={setCurrentStatus}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Создание мероприятия
            </h1>
            <p className="text-muted-foreground">
              Заполните информацию о мероприятии и настройте этапы проведения
            </p>
          </div>

          {/* Progress Bar */}
          <Stepper currentStep={currentStep} steps={steps}/>

          {/* Content */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <StepControl
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={handleNext}
            onBack={handleBack}
            isLastStep={currentStep === steps.length}
            onSave={handleSave}
          />
        </div>

        <CheckpointModal
          isOpen={isCheckpointModalOpen}
          onOpenChange={setIsCheckpointModalOpen}
          checkpointId={editingCheckpoint || undefined}
          onSave={handleSaveCheckpoint}
          selectedDate={selectedDate}
          checkpoints={checkpoints}
        />
      </div>
    </div>
  );
}