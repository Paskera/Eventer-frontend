'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Clock, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusControlProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  isAdmin?: boolean;
  isApproved?: boolean;
}

export function StatusControl({ currentStatus, onStatusChange, isAdmin = false, isApproved = false }: StatusControlProps) {
  const allStatuses = [
    {
      value: "waiting",
      label: "Черновик",
      description: "Мероприятие находится в разработке и не видно участникам",
      icon: Clock,
      color: "text-yellow-600 dark:text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500",
      ringColor: "ring-yellow-500",
    },
    {
      value: "on_moderation",
      label: "На модерацию",
      description: "Отправить мероприятие на проверку администратором",
      icon: Clock,
      color: "text-orange-600 dark:text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500",
      ringColor: "ring-orange-500",
    },
    {
      value: "active",
      label: "Опубликовано",
      description: "Мероприятие доступно для просмотра и регистрации",
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500",
      ringColor: "ring-emerald-500",
    },
    {
      value: "rejected",
      label: "Отклонено",
      description: "Мероприятие отклонено администратором",
      icon: Clock,
      color: "text-red-600 dark:text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500",
      ringColor: "ring-red-500",
    },
    {
      value: "archived",
      label: "В архиве",
      description: "Мероприятие завершено и скрыто из публичного доступа",
      icon: Archive,
      color: "text-slate-600 dark:text-slate-400",
      bgColor: "bg-slate-500/10",
      borderColor: "border-slate-500",
      ringColor: "ring-slate-500",
    }
  ];

  // Фильтруем статусы в зависимости от роли
  const statuses = allStatuses.filter(status => {
    if (isAdmin) return true; // Админ видит всё
    
    if (status.value === "rejected" || status.value === "active") return false;

    return true;
  });

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold">Статус публикации</h3>
        <p className="text-base text-muted-foreground">
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
                      ? `${status.borderColor} ring-1 ${status.ringColor} shadow-md bg-white dark:bg-neutral-900`
                      : "border-border hover:border-primary/30 opacity-70 hover:opacity-100"
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
                            className="text-lg font-bold cursor-pointer"
                          >
                            {status.label}
                          </Label>
                        </div>
                        <p className="text-base text-muted-foreground pl-6">
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
