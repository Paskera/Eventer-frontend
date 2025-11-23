'use client';

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";

interface StepControlProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  onSave: () => void;
}

export function StepControl({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isLastStep,
  onSave,
}: StepControlProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-border">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 1}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Назад
      </Button>

      <div className="text-sm text-muted-foreground">
        Шаг {currentStep} из {totalSteps}
      </div>

      {isLastStep ? (
        <Button onClick={onSave} className="gap-2">
          <Save className="h-4 w-4" />
          Сохранить мероприятие
        </Button>
      ) : (
        <Button onClick={onNext} className="gap-2">
          Далее
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}