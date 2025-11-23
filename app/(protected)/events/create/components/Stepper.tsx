'use client';

import { CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Step {
  number: number;
  title: string;
  icon: React.ElementType;
}

interface StepperProps {
  currentStep: number;
  steps: Step[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  const totalSteps = steps.length;
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  return (
      <div className="space-y-4">
        <Progress value={progressPercentage} className="h-2" />
      
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