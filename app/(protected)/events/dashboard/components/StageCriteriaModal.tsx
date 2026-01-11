"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Copy, CopyCheck } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiStageCriteria, StageCriteria, CreateStageCriteriaRequest, UpdateStageCriteriaRequest } from "@/app/api/http/stage-criteria/stage_criteria"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface StageCriteriaModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    stageId: number
    stageName?: string
    availableStages?: Array<{ id: number; stage_name: string }> // Для копирования критериев
}

export function StageCriteriaModal({
    isOpen,
    onOpenChange,
    stageId,
    stageName,
    availableStages = []
}: StageCriteriaModalProps) {
    const queryClient = useQueryClient()
    const [isEditMode, setIsEditMode] = useState(false)
    const [editingCriteria, setEditingCriteria] = useState<StageCriteria | null>(null)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [criteriaToDelete, setCriteriaToDelete] = useState<number | null>(null)
    const [showCopyDialog, setShowCopyDialog] = useState(false)
    const [selectedSourceStage, setSelectedSourceStage] = useState<number | null>(null)

    // Форма для создания/редактирования
    const [criteriaName, setCriteriaName] = useState('')
    const [description, setDescription] = useState('')
    const [maxScore, setMaxScore] = useState(10)
    const [weight, setWeight] = useState(1)
    const [order, setOrder] = useState(0)

    // Загрузка критериев
    const { data: criteriaList, isLoading } = useQuery({
        queryKey: ['stageCriteria', stageId],
        queryFn: () => apiStageCriteria.getStageCriteriaByStage(stageId),
        enabled: isOpen && stageId > 0,
    })

    // Мутация для создания
    const createMutation = useMutation({
        mutationFn: (data: CreateStageCriteriaRequest) => apiStageCriteria.createStageCriteria(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stageCriteria', stageId] })
            resetForm()
            toast.success('Критерий успешно создан')
        },
        onError: (error: any) => {
            toast.error('Ошибка при создании критерия: ' + (error.response?.data?.detail || error.message))
        }
    })

    // Мутация для обновления
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateStageCriteriaRequest }) =>
            apiStageCriteria.updateStageCriteria(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stageCriteria', stageId] })
            resetForm()
            toast.success('Критерий успешно обновлен')
        },
        onError: (error: any) => {
            toast.error('Ошибка при обновлении критерия: ' + (error.response?.data?.detail || error.message))
        }
    })

    // Мутация для удаления
    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiStageCriteria.deleteStageCriteria(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stageCriteria', stageId] })
            setShowDeleteDialog(false)
            setCriteriaToDelete(null)
            toast.success('Критерий успешно удален')
        },
        onError: (error: any) => {
            toast.error('Ошибка при удалении критерия: ' + (error.response?.data?.detail || error.message))
        }
    })

    // Мутация для копирования критериев
    const copyMutation = useMutation({
        mutationFn: ({ sourceStageId, targetStageId }: { sourceStageId: number; targetStageId: number }) =>
            apiStageCriteria.copyStageCriteria(sourceStageId, targetStageId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stageCriteria', stageId] })
            setShowCopyDialog(false)
            setSelectedSourceStage(null)
            toast.success('Критерии успешно скопированы')
        },
        onError: (error: any) => {
            toast.error('Ошибка при копировании критериев: ' + (error.response?.data?.detail || error.message))
        }
    })

    const resetForm = () => {
        setCriteriaName('')
        setDescription('')
        setMaxScore(10)
        setWeight(1)
        setOrder(0)
        setIsEditMode(false)
        setEditingCriteria(null)
    }

    const handleEdit = (criteria: StageCriteria) => {
        setEditingCriteria(criteria)
        setCriteriaName(criteria.criteria_name)
        setDescription(criteria.description || '')
        setMaxScore(criteria.max_score)
        setWeight(criteria.weight || 1)
        setOrder(criteria.order || 0)
        setIsEditMode(true)
    }

    const handleCancel = () => {
        resetForm()
    }

    const handleSave = () => {
        if (!criteriaName.trim() || maxScore <= 0) {
            toast.error('Заполните все обязательные поля')
            return
        }

        const data = {
            criteria_name: criteriaName.trim(),
            description: description.trim() || undefined,
            max_score: maxScore,
            weight: weight || undefined,
            order: order || undefined,
        }

        if (isEditMode && editingCriteria) {
            updateMutation.mutate({ id: editingCriteria.id, data })
        } else {
            createMutation.mutate({ ...data, stage_id: stageId })
        }
    }

    const handleDelete = (id: number) => {
        setCriteriaToDelete(id)
        setShowDeleteDialog(true)
    }

    const confirmDelete = () => {
        if (criteriaToDelete) {
            deleteMutation.mutate(criteriaToDelete)
        }
    }

    // Сортировка критериев по order
    const sortedCriteria = criteriaList?.sort((a, b) => (a.order || 0) - (b.order || 0)) || []

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Критерии оценивания {stageName && `для этапа "${stageName}"`}
                        </DialogTitle>
                        <DialogDescription>
                            Управление критериями оценивания для данного этапа
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 pt-4">
                        {/* Форма создания/редактирования */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    {isEditMode ? 'Редактировать критерий' : 'Добавить новый критерий'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="criteria-name" className="text-base">
                                            Название критерия <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="criteria-name"
                                            placeholder="Например: Качество кода"
                                            className="text-base"
                                            value={criteriaName}
                                            onChange={(e) => setCriteriaName(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="max-score" className="text-base">
                                            Максимальный балл <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="max-score"
                                            type="number"
                                            min="1"
                                            max="1000"
                                            className="text-base"
                                            value={maxScore}
                                            onChange={(e) => setMaxScore(parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-base">
                                        Описание критерия
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Подробное описание критерия оценивания"
                                        className="min-h-[80px] text-base"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="weight" className="text-base">
                                            Вес критерия
                                        </Label>
                                        <Input
                                            id="weight"
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            className="text-base"
                                            value={weight}
                                            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Используется для расчета итоговой оценки
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="order" className="text-base">
                                            Порядок отображения
                                        </Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            min="0"
                                            className="text-base"
                                            value={order}
                                            onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    {isEditMode && (
                                        <Button
                                            variant="outline"
                                            onClick={handleCancel}
                                            className="text-base"
                                        >
                                            Отмена
                                        </Button>
                                    )}
                                    <Button
                                        onClick={handleSave}
                                        className="text-base"
                                        disabled={!criteriaName.trim() || maxScore <= 0 || createMutation.isPending || updateMutation.isPending}
                                    >
                                        {isEditMode ? 'Сохранить изменения' : 'Добавить критерий'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Кнопка копирования критериев */}
                        {availableStages.length > 0 && (
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium mb-1">Копировать критерии</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Скопировать критерии из другого этапа
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowCopyDialog(true)}
                                            className="text-base"
                                        >
                                            <Copy className="h-4 w-4 mr-2" />
                                            Копировать
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Список критериев */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Список критериев</h3>
                                <Badge variant="secondary">
                                    Всего: {sortedCriteria.length}
                                </Badge>
                            </div>

                            {isLoading ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    Загрузка критериев...
                                </div>
                            ) : sortedCriteria.length === 0 ? (
                                <Card>
                                    <CardContent className="py-8 text-center text-muted-foreground">
                                        <p>Критерии еще не добавлены</p>
                                        <p className="text-sm mt-2">Добавьте первый критерий выше</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="space-y-3">
                                    {sortedCriteria.map((criteria) => (
                                        <Card key={criteria.id} className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <h4 className="font-semibold text-base">
                                                                {criteria.criteria_name}
                                                            </h4>
                                                            <Badge variant="outline">
                                                                Макс. балл: {criteria.max_score}
                                                            </Badge>
                                                            {criteria.weight && criteria.weight !== 1 && (
                                                                <Badge variant="secondary">
                                                                    Вес: {criteria.weight}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        {criteria.description && (
                                                            <p className="text-sm text-muted-foreground">
                                                                {criteria.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleEdit(criteria)}
                                                            className="h-9"
                                                        >
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Редактировать
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDelete(criteria.id)}
                                                            className="h-9 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="text-base"
                        >
                            Закрыть
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Диалог подтверждения удаления */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Подтвердите удаление</AlertDialogTitle>
                        <AlertDialogDescription>
                            Вы уверены, что хотите удалить этот критерий? Это действие нельзя отменить.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {
                            setShowDeleteDialog(false)
                            setCriteriaToDelete(null)
                        }}>
                            Отмена
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Удалить
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Диалог копирования критериев */}
            <Dialog open={showCopyDialog} onOpenChange={setShowCopyDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Копировать критерии из другого этапа</DialogTitle>
                        <DialogDescription>
                            Выберите этап, из которого нужно скопировать критерии оценивания
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="source-stage" className="text-base">
                                Исходный этап
                            </Label>
                            <Select
                                value={selectedSourceStage?.toString() || ''}
                                onValueChange={(value) => setSelectedSourceStage(parseInt(value))}
                            >
                                <SelectTrigger className="text-base">
                                    <SelectValue placeholder="Выберите этап" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableStages
                                        .filter(stage => stage.id !== stageId)
                                        .map((stage) => (
                                            <SelectItem key={stage.id} value={stage.id.toString()}>
                                                {stage.stage_name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowCopyDialog(false)
                                    setSelectedSourceStage(null)
                                }}
                                className="text-base"
                            >
                                Отмена
                            </Button>
                            <Button
                                onClick={() => {
                                    if (selectedSourceStage) {
                                        copyMutation.mutate({
                                            sourceStageId: selectedSourceStage,
                                            targetStageId: stageId
                                        })
                                    }
                                }}
                                disabled={!selectedSourceStage || copyMutation.isPending}
                                className="text-base"
                            >
                                <CopyCheck className="h-4 w-4 mr-2" />
                                Копировать
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
