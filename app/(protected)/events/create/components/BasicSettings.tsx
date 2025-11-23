'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Users, MapPin, Laptop, Home, Blend } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format as formatDate } from "date-fns"
import { ru } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface BasicSettingsProps {
    startDate: Date | undefined
    endDate: Date | undefined
    onStartDateChange: (date: Date | undefined) => void
    onEndDateChange: (date: Date | undefined) => void
    eventName: string
    onEventNameChange: (name: string) => void
    description: string
    onDescriptionChange: (desc: string) => void
    venue: string
    onVenueChange: (venue: string) => void
    format: 'online' | 'offline' | 'hybrid'
    onFormatChange: (format: 'online' | 'offline' | 'hybrid') => void
    participationType: 'solo' | 'team'
    onParticipationTypeChange: (type: 'solo' | 'team') => void
    usersCount: number
    onUsersCountChange: (count: number) => void
    category: number
    onCategoryChange: (cat: number) => void
}

export function BasicSettings({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    eventName,
    onEventNameChange,
    description,
    onDescriptionChange,
    venue,
    onVenueChange,
    format,
    onFormatChange,
    participationType,
    onParticipationTypeChange,
    usersCount,
    onUsersCountChange,
    category,
    onCategoryChange
}: BasicSettingsProps) {
    const formatOptions = [
        { value: 'offline', label: 'Оффлайн', icon: Home, color: 'text-primary' },
        { value: 'online', label: 'Онлайн', icon: Laptop, color: 'text-info' },
        { value: 'hybrid', label: 'Гибрид', icon: Blend, color: 'text-accent' }
    ];
    return (
        <div className="space-y-6">
      {/* Event Name */}
      <div className="space-y-2">
        <Label htmlFor="eventName" className="text-sm font-medium">
          Название мероприятия <span className="text-destructive">*</span>
        </Label>
        <Input
          id="eventName"
          placeholder="Введите название мероприятия"
          value={eventName}
          onChange={(e) => onEventNameChange(e.target.value)}
          className="transition-all duration-200 focus:shadow-sm"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Описание <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Опишите ваше мероприятие"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="min-h-[120px] resize-none transition-all duration-200 focus:shadow-sm"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Дата начала <span className="text-destructive">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal transition-all duration-200 hover:shadow-sm",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? formatDate(startDate, "PPP", { locale: ru }) : "Выберите дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={onStartDateChange}
                autoFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Дата окончания <span className="text-destructive">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal transition-all duration-200 hover:shadow-sm",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? formatDate(endDate, "PPP", { locale: ru }) : "Выберите дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={onEndDateChange}
                autoFocus
                disabled={(date) => startDate ? date < startDate : false}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Venue */}
      <div className="space-y-2">
        <Label htmlFor="venue" className="text-sm font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Место проведения <span className="text-destructive">*</span>
        </Label>
        <Input
          id="venue"
          placeholder="Укажите адрес или ссылку"
          value={venue}
          onChange={(e) => onVenueChange(e.target.value)}
          className="transition-all duration-200 focus:shadow-sm"
        />
      </div>

      {/* Format */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Формат проведения <span className="text-destructive">*</span>
        </Label>
        <RadioGroup value={format} onValueChange={(value: string) => onFormatChange(value as 'online' | 'offline' | 'hybrid')}>
          <div className="grid grid-cols-3 gap-3">
            {formatOptions.map((option) => {
              const Icon = option.icon;
              return (
                <label
                  key={option.value}
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-all duration-200",
                    format === option.value
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="sr-only"
                  />
                  <Icon className={cn("h-6 w-6 mb-2", format === option.value ? option.color : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", format === option.value ? "text-foreground" : "text-muted-foreground")}>
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </RadioGroup>
      </div>

      {/* Participation Type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Users className="h-4 w-4" />
          Тип участия
        </Label>
        <RadioGroup value={participationType} onValueChange={(value) => onParticipationTypeChange(value as 'solo' | 'team')}>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={cn(
                "flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-200",
                participationType === 'solo'
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <RadioGroupItem value="solo" id="solo" />
              <span className="text-sm font-medium">Индивидуальное</span>
            </label>
            <label
              className={cn(
                "flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-200",
                participationType === 'team'
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <RadioGroupItem value="team" id="team" />
              <span className="text-sm font-medium">Командное</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Users Count & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="usersCount" className="text-sm font-medium">
            Количество участников
          </Label>
          <Input
            id="usersCount"
            type="number"
            min="0"
            placeholder="0"
            value={usersCount || ''}
            onChange={(e) => onUsersCountChange(parseInt(e.target.value) || 0)}
            className="transition-all duration-200 focus:shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">
            Категория
          </Label>
          <Select value={category.toString()} onValueChange={(value) => onCategoryChange(parseInt(value))}>
            <SelectTrigger className="transition-all duration-200 hover:shadow-sm">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Хакатон</SelectItem>
              <SelectItem value="2">Конференция</SelectItem>
              <SelectItem value="3">Воркшоп</SelectItem>
              <SelectItem value="4">Семинар</SelectItem>
              <SelectItem value="5">Другое</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}