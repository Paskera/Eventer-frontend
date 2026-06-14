"use client";

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Plus, X, FileUp, FileText, Trophy, Upload, Info, ChevronDown, CalendarIcon, Download } from "lucide-react"
import { format as formatDate } from "date-fns"
import { ru } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { apiResources } from "@/app/api/http/stages/resources"

// ─── Types ───────────────────────────────────────────────────────────
export interface Stage {
    id: number
    stage_name: string
    description: string
    start_date: string
    end_date: string
    stage_status: string
    stage_type: string
    stage_format?: string
    max_slots?: number
    content?: string
    max_files?: number
    bracket_type?: string
    settings?: Record<string, any>
    requirements?: any[]
    resources?: any[]
    is_auto_transition?: boolean
    auto_transition_at?: string
    top_n_teams?: number | null
}

export interface ResourceFile {
    title: string
    file: File
}

interface StageModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    stageId?: number
    onSave: (stage: any, resourceFiles?: ResourceFile[]) => void
    onDeleteResource?: (resourceId: number) => Promise<void>
    stageData?: Stage
}

// ─── MIME format options for multi-select ────────────────────────────
const MIME_OPTIONS = [
    { value: '.pdf', label: 'PDF' },
    { value: '.doc', label: 'DOC' },
    { value: '.docx', label: 'DOCX' },
    { value: '.xls', label: 'XLS' },
    { value: '.xlsx', label: 'XLSX' },
    { value: '.ppt', label: 'PPT' },
    { value: '.pptx', label: 'PPTX' },
    { value: '.jpg', label: 'JPG' },
    { value: '.jpeg', label: 'JPEG' },
    { value: '.png', label: 'PNG' },
    { value: '.zip', label: 'ZIP' },
    { value: '.rar', label: 'RAR' },
    { value: '.txt', label: 'TXT' },
    { value: '.csv', label: 'CSV' },
]

// ─── Helpers ─────────────────────────────────────────────────────────
const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} Б`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
}

// ─── Component ───────────────────────────────────────────────────────
export function StageModal({ isOpen, onOpenChange, stageId, onSave, onDeleteResource, stageData }: StageModalProps) {
    // Base fields
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)
    const [startTime, setStartTime] = useState('09:00')
    const [endTime, setEndTime] = useState('18:00')
    const [status, setStatus] = useState('active')
    const [stageType, setStageType] = useState('content')
    const [stageFormat, setStageFormat] = useState('online')
    const [maxSlots, setMaxSlots] = useState(0)

    // Auto-transition
    const [isAutoTransition, setIsAutoTransition] = useState(false)
    const [topNTeams, setTopNTeams] = useState<number | ''>('')

    // Content-specific
    const [content, setContent] = useState('')

    // Submission-specific
    const [requirements, setRequirements] = useState<any[]>([])


    // Resource files (for ALL stage types)
    const [resourceFiles, setResourceFiles] = useState<ResourceFile[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    // ── Reset / populate on open ────────────────────────────────────
    useEffect(() => {
        if (!isOpen) return

        if (stageId && stageData) {
            setName(stageData.stage_name)
            setDescription(stageData.description)
            setStartDate(new Date(stageData.start_date))
            setEndDate(new Date(stageData.end_date))
            const sd = new Date(stageData.start_date)
            const ed = new Date(stageData.end_date)
            setStartTime(`${String(sd.getHours()).padStart(2,'0')}:${String(sd.getMinutes()).padStart(2,'0')}`)
            setEndTime(`${String(ed.getHours()).padStart(2,'0')}:${String(ed.getMinutes()).padStart(2,'0')}`)
            setStatus(stageData.stage_status)
            setStageType(stageData.stage_type || 'content')
            setStageFormat(stageData.stage_format || 'online')
            setMaxSlots(stageData.max_slots || 0)
            
            // Handle nested or flattened configs
            setContent(stageData.content || (stageData as any).content_config?.content || '')
            setRequirements(stageData.requirements || (stageData as any).submission_config?.requirements || [])
            setResourceFiles([])
            setIsAutoTransition(stageData.is_auto_transition || false)
            setTopNTeams(stageData.top_n_teams || '')
        } else {
            setName('');        setDescription('')
            setStartDate(undefined); setEndDate(undefined)
            setStartTime('09:00');   setEndTime('18:00')
            setStatus('active');setStageType('content')
            setStageFormat('online'); setMaxSlots(0)
            setContent('');     setRequirements([])
            setResourceFiles([])
            setIsAutoTransition(false)
            setTopNTeams('')
        }
    }, [stageId, stageData, isOpen])

    // ── File handlers ───────────────────────────────────────────────
    const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        const added: ResourceFile[] = Array.from(files).map(f => ({
            title: f.name.replace(/\.[^/.]+$/, ''),
            file: f,
        }))
        setResourceFiles(prev => [...prev, ...added])
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    // ── Requirement helpers ─────────────────────────────────────────
    const updateReq = (index: number, patch: Record<string, any>) => {
        setRequirements(prev => prev.map((r, i) => i === index ? { ...r, ...patch } : r))
    }
    const removeReq = (index: number) => {
        setRequirements(prev => prev.filter((_, i) => i !== index))
    }
    const addReq = () => {
        setRequirements(prev => [...prev, { name: '', mimes: [], max_size_mb: 10, is_required: true }])
    }

    // ── Save ────────────────────────────────────────────────────────
    const buildDateTime = (date: Date | undefined, time: string): string => {
        if (!date) return ''
        const [h, m] = time.split(':').map(Number)
        const d = new Date(date)
        d.setHours(h || 0, m || 0, 0, 0)
        return d.toISOString()
    }

    const handleSave = () => {
        const base = {
            stage_name: name,
            description,
            start_date: buildDateTime(startDate, startTime),
            end_date: buildDateTime(endDate, endTime),
            stage_status: status,
            stage_type: stageType,
            stage_format: stageFormat,
            max_slots: maxSlots,
            is_auto_transition: isAutoTransition,
            top_n_teams: isAutoTransition && topNTeams !== '' ? Number(topNTeams) : null,
        }

        let payload: any
        if (stageType === 'content') {
            payload = { ...base, content }
        } else if (stageType === 'submission') {
            payload = { ...base, requirements, max_files: Math.max(1, requirements.length) }
        } else if (stageType === 'bracket') {
            payload = { ...base }
        } else {
            payload = base
        }

        onSave(payload, resourceFiles.length > 0 ? resourceFiles : undefined)
    }

    // ── Render ───────────────────────────────────────────────────────
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">
                        {stageId ? `Редактирование этапа "${stageData?.stage_name}"` : 'Новый этап'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pt-4">
                    {/* ── Name ─────────────────────────────────────── */}
                    <div className="space-y-2">
                        <Label className="text-base">Название этапа</Label>
                        <Input
                            placeholder="Введите название этапа"
                            className="text-base"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    {/* ── Status + Type ────────────────────────────── */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-base">Статус</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="text-base"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Активный</SelectItem>
                                    <SelectItem value="waiting">Ожидание</SelectItem>
                                    <SelectItem value="closed">Закрыт</SelectItem>
                                    <SelectItem value="validated">Подтверждён</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-base">Тип этапа</Label>
                            <Select value={stageType} onValueChange={setStageType}>
                                <SelectTrigger className="text-base"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="content">Информационный</SelectItem>
                                    <SelectItem value="submission">Загрузка решений</SelectItem>
                                    <SelectItem value="bracket">Турнирная сетка</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* ── Dates ────────────────────────────────────── */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-base">Дата начала</Label>
                            <div className="flex gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "flex-1 justify-start text-left font-normal",
                                                !startDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {startDate ? formatDate(startDate, "d MMM yyyy", { locale: ru }) : "Дата"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={startDate}
                                            locale={ru}
                                            onSelect={(date) => {
                                                setStartDate(date)
                                                if (date && endDate && date > endDate) setEndDate(undefined)
                                            }}
                                            className="pointer-events-auto"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <Input
                                    type="time"
                                    value={startTime}
                                    onChange={e => setStartTime(e.target.value)}
                                    className="w-24 text-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-base">Дата окончания</Label>
                            <div className="flex gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "flex-1 justify-start text-left font-normal",
                                                !endDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {endDate ? formatDate(endDate, "d MMM yyyy", { locale: ru }) : "Дата"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={endDate}
                                            locale={ru}
                                            onSelect={(date) => setEndDate(date)}
                                            disabled={(date) => startDate ? date < startDate : false}
                                            className="pointer-events-auto"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <Input
                                    type="time"
                                    value={endTime}
                                    onChange={e => setEndTime(e.target.value)}
                                    className="w-24 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Format + Slots ───────────────────────────── */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-base">Формат</Label>
                            <Select value={stageFormat} onValueChange={setStageFormat}>
                                <SelectTrigger className="text-base"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="online">Онлайн</SelectItem>
                                    <SelectItem value="offline">Оффлайн</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-base">Макс. мест (0 = ∞)</Label>
                            <Input
                                type="number" min="0"
                                value={maxSlots}
                                onChange={e => setMaxSlots(parseInt(e.target.value) || 0)}
                                className="text-base"
                            />
                        </div>
                    </div>

                    {/* ── Auto Transition ──────────────────────────── */}
                    <div className="space-y-3 p-4 bg-slate-50 dark:bg-neutral-800/50 rounded-lg border border-slate-200 dark:border-neutral-700">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="autoTransition"
                                checked={isAutoTransition}
                                onChange={e => setIsAutoTransition(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor="autoTransition" className="text-base font-semibold cursor-pointer">
                                Автоматический переход участников
                            </Label>
                        </div>
                        {isAutoTransition && (
                            <div className="pl-6 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                                <Label className="text-sm text-slate-600 dark:text-slate-400">Количество лучших (Top K), которые пройдут дальше</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    placeholder="Например: 10"
                                    value={topNTeams}
                                    onChange={e => setTopNTeams(e.target.value === '' ? '' : parseInt(e.target.value))}
                                    className="max-w-[200px]"
                                />
                            </div>
                        )}
                    </div>

                    {/* ── Description ──────────────────────────────── */}
                    <div className="space-y-2">
                        <Label className="text-base">Описание</Label>
                        <Textarea
                            placeholder="Введите описание этапа"
                            className="min-h-[80px] text-base"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    {/* ════════════════════════════════════════════════
                        TYPE-SPECIFIC CONFIGS
                       ════════════════════════════════════════════════ */}

                    {/* ── CONTENT config ───────────────────────────── */}
                    {stageType === 'content' && (
                        <div className="space-y-2 p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/40">
                            <div className="flex items-center gap-2 mb-1">
                                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <Label className="text-base font-semibold text-blue-800 dark:text-blue-300">
                                    Контент этапа
                                </Label>
                            </div>
                            <Textarea
                                placeholder="Содержимое информационного этапа..."
                                className="min-h-[100px] text-base"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </div>
                    )}

                    {/* ── SUBMISSION config ────────────────────────── */}
                    {stageType === 'submission' && (
                        <div className="space-y-4 p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900/40">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                    <Label className="text-base font-semibold text-amber-800 dark:text-amber-300">
                                        Требуемые документы
                                    </Label>
                                </div>
                                <Button
                                    type="button" variant="outline" size="sm"
                                    className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                                    onClick={addReq}
                                >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Добавить
                                </Button>
                            </div>

                            {requirements.length === 0 ? (
                                <p className="text-sm text-amber-700/70 dark:text-amber-400/60 text-center py-3">
                                    Добавьте документы, которые участники должны будут загрузить.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {requirements.map((req, idx) => (
                                        <div key={idx} className="p-3 bg-white dark:bg-neutral-900 border border-amber-200 dark:border-neutral-700 rounded-md relative space-y-2">
                                            <Button
                                                type="button" variant="ghost" size="sm"
                                                className="absolute top-1.5 right-1.5 h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                                                onClick={() => removeReq(idx)}
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </Button>

                                            <div className="space-y-1 pr-8">
                                                <Label className="text-xs text-slate-500">Название документа</Label>
                                                <Input
                                                    value={req.name}
                                                    onChange={e => updateReq(idx, { name: e.target.value })}
                                                    placeholder="Например: Справка, Паспорт..."
                                                    className="h-8 text-sm"
                                                />
                                            </div>

                                            <div className="flex gap-3">
                                                <div className="space-y-1 flex-1">
                                                    <Label className="text-xs text-slate-500">Форматы файлов</Label>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline" type="button"
                                                                className="w-full h-8 justify-between text-sm font-normal px-3"
                                                            >
                                                                <div className="flex flex-wrap gap-1 flex-1">
                                                                    {req.mimes.length === 0 ? (
                                                                        <span className="text-slate-400">Все форматы</span>
                                                                    ) : (
                                                                        req.mimes.map((m: string) => (
                                                                            <Badge key={m} variant="secondary" className="text-xs px-1.5 py-0">
                                                                                {m}
                                                                            </Badge>
                                                                        ))
                                                                    )}
                                                                </div>
                                                                <ChevronDown className="w-3.5 h-3.5 ml-1 flex-shrink-0 text-slate-400" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-56 p-2" align="start">
                                                            <div className="grid grid-cols-2 gap-1">
                                                                {MIME_OPTIONS.map(opt => (
                                                                    <label
                                                                        key={opt.value}
                                                                        className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-neutral-800 cursor-pointer text-sm"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={req.mimes.includes(opt.value)}
                                                                            onChange={e => {
                                                                                const newMimes = e.target.checked
                                                                                    ? [...req.mimes, opt.value]
                                                                                    : req.mimes.filter((m: string) => m !== opt.value)
                                                                                updateReq(idx, { mimes: newMimes })
                                                                            }}
                                                                            className="rounded border-slate-300"
                                                                        />
                                                                        {opt.label}
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <div className="space-y-1 w-20">
                                                    <Label className="text-xs text-slate-500">Макс. МБ</Label>
                                                    <Input
                                                        type="number"
                                                        value={req.max_size_mb}
                                                        onChange={e => updateReq(idx, { max_size_mb: parseInt(e.target.value) || 10 })}
                                                        className="h-8 text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`req-required-${idx}`}
                                                    checked={req.is_required}
                                                    onChange={e => updateReq(idx, { is_required: e.target.checked })}
                                                    className="rounded border-amber-300"
                                                />
                                                <Label htmlFor={`req-required-${idx}`} className="text-xs cursor-pointer text-slate-600 dark:text-slate-400">
                                                    Обязательный документ
                                                </Label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── BRACKET info ────────────────────────────── */}
                    {stageType === 'bracket' && (
                        <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900/40">
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                <Label className="text-base font-semibold text-purple-800 dark:text-purple-300">
                                    Турнирная сетка
                                </Label>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-purple-700/80 dark:text-purple-400/70">
                                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <p>Тип сетки (Single Elimination, Double Elimination, Round Robin) выбирается при генерации турнира после подтверждения участников.</p>
                            </div>
                        </div>
                    )}

                    {/* ════════════════════════════════════════════════
                        RESOURCES (files — any stage type)
                       ════════════════════════════════════════════════ */}
                    <div className="space-y-3 p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900/40">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <Label className="text-base font-semibold text-emerald-800 dark:text-emerald-300">
                                    Ресурсы этапа
                                </Label>
                            </div>
                            <Button
                                type="button" variant="outline" size="sm"
                                className="border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Plus className="w-3 h-3 mr-1" />
                                Добавить файл
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleFilesSelected}
                            />
                        </div>

                        {/* Existing Resources */}
                        {stageId && stageData?.resources && stageData.resources.length > 0 && (
                            <div className="space-y-2 mb-4">
                                <Label className="text-xs text-slate-500 uppercase font-bold px-1">Уже загружены</Label>
                                {stageData.resources.map((res: any) => (
                                    <div
                                        key={res.id}
                                        className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-md opacity-80"
                                    >
                                        <FileText className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                        <span className="text-sm flex-1 truncate">{res.title}</span>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 w-6 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                                onClick={async () => {
                                                    try {
                                                        const url = await apiResources.getDownloadUrl(stageId!, res.id);
                                                        window.open(url, '_blank');
                                                    } catch (error) {
                                                        console.error("Ошибка скачивания:", error);
                                                    }
                                                }}
                                                title="Скачать"
                                            >
                                                <Download className="w-3 h-3" />
                                            </Button>
                                            <Badge variant="outline" className="text-[10px] h-4">ID: {res.id}</Badge>
                                            {onDeleteResource && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => onDeleteResource(res.id)}
                                                >
                                                    <X className="w-3 h-3" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {resourceFiles.length === 0 && (!stageData?.resources || stageData.resources.length === 0) ? (
                            <p className="text-sm text-emerald-700/70 dark:text-emerald-400/60 text-center py-3">
                                Прикрепите документы для участников: регламенты, шаблоны, положения и т.д.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {resourceFiles.map((rf, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 p-2 bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-700 rounded-md shadow-sm"
                                    >
                                        <FileText className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                        <Input
                                            value={rf.title}
                                            onChange={e => {
                                                setResourceFiles(prev =>
                                                    prev.map((f, i) => i === idx ? { ...f, title: e.target.value } : f)
                                                )
                                            }}
                                            className="h-7 text-sm flex-1"
                                            placeholder="Название ресурса"
                                        />
                                        <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                                            {formatFileSize(rf.file.size)}
                                        </span>
                                        <Button
                                            type="button" variant="ghost" size="sm"
                                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 flex-shrink-0"
                                            onClick={() => setResourceFiles(prev => prev.filter((_, i) => i !== idx))}
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Actions ──────────────────────────────────── */}
                    <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={() => onOpenChange(false)} className="text-base">
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