"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BasicSettings } from "./components/BasicSettings"
import { ImageUpload } from "./components/ImageUpload"
import { CheckpointList } from "./components/CheckpointList"
import { CheckpointModal } from "./components/CheckpointModal"
import { StatusControl } from "./components/StatusControl"
import { DocumentUpload } from "./components/DocumentUpload"
import { StepControl } from "./components/StepControl"
import { DaySelector } from "./components/DaySelector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { RoleGuard } from "@/components/role-guard"

interface Checkpoint {
    id: number
    title: string
    subtitle: string
    date: Date
    startTime: string
    endTime: string
    description: string
    format: 'online' | 'offline' | 'hybrid'
}

export default function CreateEvent() {
    const [currentStep, setCurrentStep] = useState(1)
    const [currentStatus, setCurrentStatus] = useState("Черновик")
    const [isCheckpointModalOpen, setIsCheckpointModalOpen] = useState(false)
    const [editingCheckpoint, setEditingCheckpoint] = useState<number | null>(null)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([])
    const [eventName, setEventName] = useState('')
    const [description, setDescription] = useState('')
    const [venue, setVenue] = useState('')
    const [format, setFormat] = useState<'online' | 'offline' | 'hybrid'>('offline')
    const [participationType, setParticipationType] = useState<'solo' | 'team'>('team')
    const [usersCount, setUsersCount] = useState(0)
    const [category, setCategory] = useState(1)
    const [eventImage, setEventImage] = useState<File | null>(null)

    const totalSteps = 4

    const handleNext = () => {
        if (currentStep === 1 && (!startDate || !endDate)) {
            toast.error("Пожалуйста, выберите даты начала и окончания мероприятия")
            return
        }
        if (currentStep === 2 && checkpoints.length === 0) {
            toast.error("Добавьте хотя бы один чекпоинт")
            return
        }
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleAddCheckpoint = () => {
        if (!selectedDate) {
            toast.error("Пожалуйста, выберите день для добавления чекпоинта")
            return
        }
        setEditingCheckpoint(null)
        setIsCheckpointModalOpen(true)
    }

    const handleEditCheckpoint = (id: number) => {
        setEditingCheckpoint(id)
        setIsCheckpointModalOpen(true)
    }

    const handleSaveCheckpoint = (checkpoint: {
        name: string
        description: string
        startTime: string
        endTime: string
        stage_type: 'online' | 'offline'
    }) => {
        if (editingCheckpoint) {
            // Редактирование существующего чекпоинта
            setCheckpoints(prev => prev.map(cp =>
                cp.id === editingCheckpoint
                    ? {
                        ...cp,
                        title: checkpoint.name,
                        description: checkpoint.description,
                        startTime: checkpoint.startTime,
                        endTime: checkpoint.endTime,
                        format: checkpoint.stage_type
                      }
                    : cp
            ))
        } else {
            // Создание нового чекпоинта
            const newCheckpoint = {
                id: checkpoints.length > 0
                    ? Math.max(...checkpoints.map(cp => cp.id)) + 1
                    : 1,
                title: checkpoint.name,
                subtitle: '',
                description: checkpoint.description,
                startTime: checkpoint.startTime,
                endTime: checkpoint.endTime,
                format: checkpoint.stage_type,
                date: selectedDate!
            }
            setCheckpoints(prev => [...prev, newCheckpoint])
        }
        setIsCheckpointModalOpen(false)
        setEditingCheckpoint(null)
    }

    const handleFileUpload = (file: File, type: 'regulation' | 'task') => {
        // Здесь будет логика загрузки файла
        console.log('Загрузка файла:', file.name, type)
    }

    const handleSave = async () => {
        // Проверяем обязательные поля
        if (!eventName || !description || !venue || !startDate || !endDate || checkpoints.length === 0) {
            toast.error('Пожалуйста, заполните все обязательные поля и добавьте хотя бы один этап')
            return
        }

        // Подготовка данных для отправки на бэкенд
        const eventData = {
            event_name: eventName,
            description: description,
            users_count: usersCount,
            participation_type: participationType,
            format: format,
            venue: venue,
            start_date: startDate ? startDate.toISOString() : '',
            end_date: endDate ? endDate.toISOString() : '',
            event_status: 'active', // по умолчанию
            organizer_id: 1, // ID текущего пользователя (в реальном приложении нужно брать из сессии)
            category_id: category,
            stages: checkpoints.map((checkpoint, index) => ({
                name: checkpoint.title,
                description: checkpoint.description,
                stage_type: checkpoint.format === 'online' ? 'online' : 'offline',
                start_time: new Date(`${new Date(checkpoint.date).toISOString().split('T')[0]}T${checkpoint.startTime}`).toISOString(),
                end_time: new Date(`${new Date(checkpoint.date).toISOString().split('T')[0]}T${checkpoint.endTime}`).toISOString(),
                order: index + 1,
                event_id: 0 // будет заполнено после создания мероприятия
            }))
        }

        // Создаем FormData для отправки multipart запроса
        const formData = new FormData()
        formData.append('event_payload', JSON.stringify(eventData))

        // Добавляем изображение, если оно было загружено
        if (eventImage) {
            formData.append('file', eventImage)
        }

        try {
            // Отправляем запрос на создание мероприятия
            const response = await fetch('http://localhost:8000/api/v1/events/', {
                method: 'POST',
                body: formData,
                headers: {
                    // В реальном приложении нужно добавить токен аутентификации
                    // 'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const result = await response.json()
                console.log('Мероприятие успешно создано:', result)
                toast.success('Мероприятие успешно создано')
            } else {
                const errorData = await response.json()
                console.error('Ошибка при создании мероприятия:', errorData)
                toast.error(`Ошибка при создании мероприятия: ${errorData.detail || response.statusText}`)
            }
        } catch (error) {
            console.error('Ошибка при создании мероприятия:', error)
            toast.error('Ошибка при создании мероприятия')
        }
    }

    const handleDaySelect = (date: Date) => {
        setSelectedDate(date)
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Базовые настройки</h2>
                        <BasicSettings
                            startDate={startDate}
                            endDate={endDate}
                            onStartDateChange={setStartDate}
                            onEndDateChange={setEndDate}
                            eventName={eventName}
                            onEventNameChange={setEventName}
                            description={description}
                            onDescriptionChange={setDescription}
                            venue={venue}
                            onVenueChange={setVenue}
                            format={format}
                            onFormatChange={setFormat}
                            participationType={participationType}
                            onParticipationTypeChange={setParticipationType}
                            usersCount={usersCount}
                            onUsersCountChange={setUsersCount}
                            category={category}
                            onCategoryChange={setCategory}
                        />
                        <ImageUpload onImageChange={setEventImage} />
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-8">
                        <h2 className="text-xl font-semibold">Этапы мероприятия</h2>
                        <DaySelector
                            startDate={startDate}
                            endDate={endDate}
                            activeDay={selectedDate}
                            onDaySelect={handleDaySelect}
                        />
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Чекпоинты</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CheckpointList
                                    stages={checkpoints}
                                    onAddCheckpoint={handleAddCheckpoint}
                                    onEditCheckpoint={handleEditCheckpoint}
                                    selectedDate={selectedDate}
                                />
                            </CardContent>
                        </Card>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Загрузка документов</h2>
                        <DocumentUpload onFileUpload={handleFileUpload} />
                    </div>
                )
            case 4:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Статус мероприятия</h2>
                        <StatusControl
                            currentStatus={currentStatus}
                            onStatusChange={setCurrentStatus}
                        />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <RoleGuard>
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold">Создание мероприятия</h1>
                    </div>

                    <div className="space-y-8">
                        {renderStep()}

                        <StepControl
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            onNext={handleNext}
                            onBack={handleBack}
                            isLastStep={currentStep === totalSteps}
                            onSave={handleSave}
                        />
                    </div>

                    <CheckpointModal
                        isOpen={isCheckpointModalOpen}
                        onOpenChange={setIsCheckpointModalOpen}
                        checkpointId={editingCheckpoint || undefined}
                        onSave={handleSaveCheckpoint}
                        selectedDate={selectedDate}
                        checkpoints={checkpoints}
                    />
                </div>
            </div>
        </RoleGuard>
    )
}