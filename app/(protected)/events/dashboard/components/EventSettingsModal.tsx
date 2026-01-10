"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface Event {
    id: number;
    event_name: string;
    description: string;
    start_date: string;
    end_date: string;
    format: string;
    venue: string;
    event_status: string;
    registration_open: boolean;
    max_teams: number;
    max_team_size: number;
}

interface EventSettingsModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    event: Event | null
    onSave: (updatedEvent: Event) => void
}

export function EventSettingsModal({
    isOpen,
    onOpenChange,
    event,
    onSave
}: EventSettingsModalProps) {
    const [eventName, setEventName] = useState('')
    const [description, setDescription] = useState('')
    const [format, setFormat] = useState('offline')
    const [venue, setVenue] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [registrationOpen, setRegistrationOpen] = useState(true)
    const [maxTeams, setMaxTeams] = useState(50)
    const [maxTeamSize, setMaxTeamSize] = useState(5)

    useEffect(() => {
        if (event) {
            setEventName(event.event_name)
            setDescription(event.description)
            setFormat(event.format)
            setVenue(event.venue)
            setStartDate(event.start_date.split('T')[0]) // Преобразуем в формат YYYY-MM-DD
            setEndDate(event.end_date.split('T')[0]) // Преобразуем в формат YYYY-MM-DD
            setRegistrationOpen(event.registration_open)
            setMaxTeams(event.max_teams || 50)
            setMaxTeamSize(event.max_team_size || 5)
        }
    }, [event])

    const handleSave = () => {
        const updatedEvent = {
            ...event,
            event_name: eventName,
            description,
            format,
            venue,
            start_date: startDate + 'T00:00:00Z',
            end_date: endDate + 'T23:59:59Z',
            registration_open: registrationOpen,
            max_teams: maxTeams,
            max_team_size: maxTeamSize
        } as Event;
        
        onSave(updatedEvent)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">
                        Настройки мероприятия
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="event-name" className="text-base">Название мероприятия</Label>
                        <Input
                            id="event-name"
                            placeholder="Введите название мероприятия"
                            className="text-base"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="event-description" className="text-base">Описание мероприятия</Label>
                        <Textarea
                            id="event-description"
                            placeholder="Введите описание мероприятия"
                            className="min-h-[100px] text-base"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="event-format" className="text-base">Формат мероприятия</Label>
                            <Select value={format} onValueChange={(value: string) => setFormat(value)}>
                                <SelectTrigger className="text-base">
                                    <SelectValue placeholder="Выбрать формат" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="online">Онлайн</SelectItem>
                                    <SelectItem value="offline">Оффлайн</SelectItem>
                                    <SelectItem value="hybrid">Гибридный</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="event-venue" className="text-base">Место проведения</Label>
                            <Input
                                id="event-venue"
                                placeholder="Введите место проведения"
                                className="text-base"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="start-date" className="text-base">Дата начала</Label>
                            <Input
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="end-date" className="text-base">Дата окончания</Label>
                            <Input
                                id="end-date"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="text-base"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="max-teams" className="text-base">Максимальное количество команд</Label>
                            <Input
                                id="max-teams"
                                type="number"
                                min="1"
                                max="1000"
                                value={maxTeams}
                                onChange={(e) => setMaxTeams(parseInt(e.target.value) || 1)}
                                className="text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="max-team-size" className="text-base">Максимальный размер команды</Label>
                            <Input
                                id="max-team-size"
                                type="number"
                                min="1"
                                max="20"
                                value={maxTeamSize}
                                onChange={(e) => setMaxTeamSize(parseInt(e.target.value) || 1)}
                                className="text-base"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base font-medium">Регистрация открыта</Label>
                                <p className="text-sm text-muted-foreground">Разрешить участникам регистрироваться на мероприятие</p>
                            </div>
                            <Checkbox
                                checked={registrationOpen}
                                onCheckedChange={(checked) => setRegistrationOpen(!!checked)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between pt-4">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="text-base"
                        >
                            Отмена
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="text-base bg-blue-600 hover:bg-blue-700"
                            disabled={!eventName || !startDate || !endDate}
                        >
                            Сохранить изменения
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}