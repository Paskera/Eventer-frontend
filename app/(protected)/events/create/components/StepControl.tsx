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
  isSubmitting?: boolean;
}

export function StepControl({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isLastStep,
  onSave,
  isSubmitting = false,
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
        <Button onClick={onSave} className="gap-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent" />
              Сохранение...
            </span>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Создать черновик
            </>
          )}
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