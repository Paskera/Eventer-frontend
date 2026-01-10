"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format as formatDate, isValid } from "date-fns"
import { ru } from "date-fns/locale"

interface Stage {
    id: number
    stage_name: string
    description: string
    start_date: string
    end_date: string
    stage_status: string
}

interface StageModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    stageId?: number
    onSave: (stage: {
        stage_name: string
        description: string
        start_date: string
        end_date: string
        stage_status: string
    }) => void
    stageData?: Stage
}

export function StageModal({
    isOpen,
    onOpenChange,
    stageId,
    onSave,
    stageData
}: StageModalProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [status, setStatus] = useState('upcoming')

    useEffect(() => {
        if (!isOpen) return;

        if (stageId && stageData) {
            setName(stageData.stage_name);
            setDescription(stageData.description);
            setStartDate(stageData.start_date.split('T')[0]); // Преобразуем в формат YYYY-MM-DD
            setEndDate(stageData.end_date.split('T')[0]); // Преобразуем в формат YYYY-MM-DD
            setStatus(stageData.stage_status);
        } else {
            setName('')
            setDescription('')
            setStartDate('')
            setEndDate('')
            setStatus('upcoming')
        }
    }, [stageId, stageData, isOpen])

    const handleSave = () => {
        onSave({
            stage_name: name,
            description,
            start_date: startDate + 'T00:00Z',
            end_date: endDate + 'T23:59:59Z',
            stage_status: status
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">
                        {stageId ? `Редактирование этапа "${stageData?.stage_name}"` : 'Новый этап'}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="stage-name" className="text-base">Название этапа</Label>
                        <Input
                            id="stage-name"
                            placeholder="Введите название этапа"
                            className="text-base"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stage-status" className="text-base">Статус этапа</Label>
                        <Select value={status} onValueChange={(value: string) => setStatus(value)}>
                            <SelectTrigger className="text-base">
                                <SelectValue placeholder="Выбрать статус" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="upcoming">Предстоящий</SelectItem>
                                <SelectItem value="active">Активный</SelectItem>
                                <SelectItem value="completed">Завершен</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-base">Описание</Label>
                        <Textarea
                            id="description"
                            placeholder="Введите описание этапа"
                            className="min-h-[100px] text-base"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
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
                            className="text-base"
                            disabled={!name || !startDate || !endDate}
                        >
                            {stageId ? 'Сохранить' : 'Создать'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}