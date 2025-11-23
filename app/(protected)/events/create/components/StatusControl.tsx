'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Clock, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusControlProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

export function StatusControl({ currentStatus, onStatusChange }: StatusControlProps) {
  const statuses = [
    {
      value: "Черновик",
      label: "Черновик",
      description: "Мероприятие находится в разработке и не видно участникам",
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/50",
    },
    {
      value: "Опубликован",
      label: "Опубликовать",
      description: "Мероприятие будет доступно для просмотра и регистрации",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-600/10",
      borderColor: "border-green-600/50",
    },
    {
      value: "Архивирован",
      label: "Архивировать",
      description: "Мероприятие завершено и перемещено в архив",
      icon: Archive,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      borderColor: "border-success/50"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Статус публикации</h3>
        <p className="text-sm text-muted-foreground">
          Выберите статус мероприятия перед сохранением
        </p>
      </div>

      <RadioGroup value={currentStatus} onValueChange={onStatusChange}>
        <div className="grid gap-4">
          {statuses.map((status) => {
            const Icon = status.icon;
            const isSelected = currentStatus === status.value;
            
            return (
              <label
                key={status.value}
                className={cn(
                  "relative cursor-pointer transition-all duration-200",
                  isSelected && "scale-[1.02]"
                )}
              >
                <Card
                  className={cn(
                    "border-2 transition-all duration-200",
                    isSelected
                      ? `${status.borderColor} shadow-md`
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "rounded-lg p-3 flex-shrink-0",
                        isSelected ? status.bgColor : "bg-muted"
                      )}>
                        <Icon className={cn(
                          "h-6 w-6",
                          isSelected ? status.color : "text-muted-foreground"
                        )} />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value={status.value}
                            id={status.value}
                            className="mt-0.5"
                          />
                          <Label
                            htmlFor={status.value}
                            className="text-base font-semibold cursor-pointer"
                          >
                            {status.label}
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">
                          {status.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </label>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}
