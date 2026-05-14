"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEventForm } from "@/app/(protected)/events/create/hooks/useEventForm";
import { BasicSettings } from "@/app/(protected)/events/create/components/BasicSettings";
import { ImageUpload } from "@/app/(protected)/events/create/components/ImageUpload";
import { Stepper } from "@/app/(protected)/events/create/components/Stepper";
import { StepControl } from "@/app/(protected)/events/create/components/StepControl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiEvents } from "@/app/api/http/event/events";
import { CheckCircle2, CalendarDays, Settings, Info } from "lucide-react";

export default function CreateEvent() {
  const router = useRouter();
  const { formData, handleFormChange, clearForm } = useEventForm();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: "Основная информация", icon: Settings },
    { number: 2, title: "Этапы и материалы", icon: CalendarDays },
    { number: 3, title: "Публикация", icon: CheckCircle2 }
  ];

  const handleNext = () => {
    if (currentStep === 1 && (!eventName || !description || !venue || !startDate || !endDate)) {
      toast.error("Ошибка валидации", {
        description: "Пожалуйста, заполните все обязательные поля (Название, Описание, Место, Даты).",
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

  const handleSave = async () => {
    const eventData = {
      event_name: eventName,
      description: description,
      users_count: usersCount,
      participation_type: participationType,
      format: format,
      venue: venue,
      start_date: startDate ? startDate.toISOString() : '',
      end_date: endDate ? endDate.toISOString() : '',
      event_status: 'active' as const,
      category_id: category,
      stages: []
    };

    try {
      setIsSubmitting(true);
      const result = await apiEvents.createEvent(eventData, eventImage || undefined);
      
      toast.success("Мероприятие успешно создано", {
        description: "Теперь вы можете добавить этапы и материалы в дашборде.",
      });
      
      clearForm();
      router.push(`/events/dashboard/${result.id}`);
    } catch (error: any) {
      console.error('Ошибка при создании мероприятия:', error);
      const detail = error?.response?.data?.detail;
      toast.error("Ошибка сервера", {
        description: typeof detail === 'string' ? detail : "Не удалось создать мероприятие.",
      });
      setIsSubmitting(false); // Only set false on error, if success it will redirect
    }
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
            <div className="pt-4 border-t border-border/50">
              <h3 className="text-xl font-semibold mb-4">Обложка мероприятия</h3>
              <ImageUpload
                value={eventImage}
                onImageChange={(file) => handleFormChange('eventImage', file)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in-50 duration-500 py-8">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
              <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <CalendarDays className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Настройка этапов доступна позже
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Чтобы не перегружать процесс создания, детальная настройка турнира перенесена в дашборд. Вы сможете сделать это сразу после сохранения.
              </p>

              <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 text-left border border-border/50">
                <h4 className="font-semibold text-lg mb-4 text-foreground">В дашборде вы сможете:</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">📅</div>
                    <span className="text-lg text-slate-700 dark:text-slate-300">Создать этапы (Stages) и настроить расписание</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">📝</div>
                    <span className="text-lg text-slate-700 dark:text-slate-300">Загрузить регламенты и документы для участников</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">🏆</div>
                    <span className="text-lg text-slate-700 dark:text-slate-300">Настроить турнирные сетки и критерии оценки</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in-50 duration-500 py-8">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
              <div className="h-20 w-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Info className="h-10 w-10 text-amber-600 dark:text-amber-400" />
              </div>
              
              <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Сохранение черновика
              </h3>
              
              <div className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Сейчас ваше мероприятие будет сохранено со статусом <b>«Черновик»</b>. 
                <br /><br />
                Вы сможете опубликовать его и открыть регистрацию для команд из панели управления, когда убедитесь, что все этапы и правила настроены корректно.
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Создание мероприятия
            </h1>
            <p className="text-muted-foreground text-lg">
              Пройдите основные шаги для регистрации нового турнира на платформе.
            </p>
          </div>

          <Stepper currentStep={currentStep} steps={steps}/>

          {/* Content */}
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border/50 pb-6 mb-6">
              <CardTitle className="text-2xl font-bold">
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
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
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}