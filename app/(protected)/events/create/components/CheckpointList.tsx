'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { format as formatDate, isSameDay, isValid } from "date-fns"
import { ru } from "date-fns/locale"

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

interface CheckpointListProps {
    stages: Checkpoint[]
    onAddCheckpoint: () => void
    onEditCheckpoint: (id: number) => void
    selectedDate: Date | undefined
}

export function CheckpointList({ stages, onAddCheckpoint, onEditCheckpoint, selectedDate }: CheckpointListProps) {
    const filteredStages = selectedDate
        ? stages.filter(stage => {
            const stageDate = new Date(stage.date)
            return isValid(stageDate) && isSameDay(stageDate, selectedDate)
        })
        : stages

    const formatDateSafe = (date: Date) => {
        const dateObj = new Date(date)
        return isValid(dateObj)
            ? formatDate(dateObj, 'd MMMM yyyy', { locale: ru })
            : 'Неверная дата'
    }

    return (
        <Carousel
            opts={{
                align: "start",
                dragFree: true,
            }}
            className="w-full"
        >
            <CarouselContent className="-ml-4">
                {filteredStages.map((stage) => (
                    <CarouselItem key={stage.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card
                                className="h-[320px] flex-shrink-0 cursor-pointer hover:bg-accent/50 transition-colors snap-start"
                                onClick={() => onEditCheckpoint(stage.id)}
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg line-clamp-1">{stage.title}</CardTitle>
                                        <span className="text-sm text-muted-foreground line-clamp-1">{stage.subtitle}</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            {formatDateSafe(stage.date)}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {stage.startTime} - {stage.endTime}
                                        </p>
                                        <p className="text-sm text-muted-foreground line-clamp-8">
                                            {stage.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
                <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                        <Card
                            className="h-[320px] flex-shrink-0 cursor-pointer hover:bg-accent/50 transition-colors border-dashed snap-start flex items-center justify-center"
                            onClick={onAddCheckpoint}
                        >
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    Добавить чекпоинт
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
    )
}