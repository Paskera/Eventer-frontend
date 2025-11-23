'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
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
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Базовые настройки</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="event-name" className="text-base">Название мероприятия</Label>
                            <Input
                                id="event-name"
                                placeholder="Введите название мероприятия"
                                className="text-base"
                                value={eventName}
                                onChange={(e) => onEventNameChange(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="event-type" className="text-base">Тип участия</Label>
                            <Select value={participationType} onValueChange={(value: 'solo' | 'team') => onParticipationTypeChange(value)}>
                                <SelectTrigger className="text-base">
                                    <SelectValue placeholder="Выберите тип участия" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="solo">Индивидуальное</SelectItem>
                                    <SelectItem value="team">Командное</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="format" className="text-base">Формат мероприятия</Label>
                            <Select value={format} onValueChange={(value: 'online' | 'offline' | 'hybrid') => onFormatChange(value)}>
                                <SelectTrigger className="text-base">
                                    <SelectValue placeholder="Выберите формат" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="online">Онлайн</SelectItem>
                                    <SelectItem value="offline">Оффлайн</SelectItem>
                                    <SelectItem value="hybrid">Гибридный</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-base">Локация</Label>
                            <Input
                                id="location"
                                placeholder="Введите название локации"
                                className="text-base"
                                value={venue}
                                onChange={(e) => onVenueChange(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="users-count" className="text-base">Ожидаемое количество участников</Label>
                            <Input
                                id="users-count"
                                type="number"
                                placeholder="Введите количество участников"
                                className="text-base"
                                value={usersCount || ''}
                                onChange={(e) => onUsersCountChange(Number(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-base">Категория мероприятия</Label>
                            <Input
                                id="category"
                                type="number"
                                placeholder="Введите ID категории"
                                className="text-base"
                                value={category || ''}
                                onChange={(e) => onCategoryChange(Number(e.target.value))}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="start-date" className="text-base">Дата начала</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !startDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {startDate ? formatDate(startDate, "PPP", { locale: ru }) : "Выберите дату"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={startDate}
                                            onSelect={onStartDateChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end-date" className="text-base">Дата конца</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !endDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {endDate ? formatDate(endDate, "PPP", { locale: ru }) : "Выберите дату"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={endDate}
                                            onSelect={onEndDateChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="event-description" className="text-base">Описание мероприятия</Label>
                            <Textarea
                                id="event-description"
                                placeholder="Введите описание мероприятия"
                                className="text-base min-h-[200px]"
                                value={description}
                                onChange={(e) => onDescriptionChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}