'use client';

import { Progress } from "@/components/ui/progress";
import { CheckCircle2, CalendarDays, FileText, Settings } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, title: "Базовые настройки", icon: Settings },
  { number: 2, title: "Этапы мероприятия", icon: CalendarDays },
  { number: 3, title: "Документы", icon: FileText },
  { number: 4, title: "Публикация", icon: CheckCircle2 }
];

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      <Progress value={progressPercentage} className="h-2" />
      
      {/* Steps Indicator */}
      <div className="grid grid-cols-4 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <div
              key={step.number}
              className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                isActive ? 'scale-105' : ''
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'border-success bg-success text-success-foreground'
                    : isActive
                    ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'border-border bg-card text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={`text-xs font-medium text-center transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}