"use client";

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog"
import { Archive, AlertTriangle } from "lucide-react"

interface ArchiveConfirmationModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    eventName: string
}

export function ArchiveConfirmationModal({
    isOpen,
    onOpenChange,
    onConfirm,
    eventName
}: ArchiveConfirmationModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center flex items-center gap-2 justify-center">
                        <Archive className="w-5 h-5 text-amber-50" />
                        Подтверждение архивации
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center pt-2">
                    <div className="flex justify-center mb-4">
                        <div className="bg-amber-500/20 p-3 rounded-full">
                            <AlertTriangle className="w-8 h-8 text-amber-500" />
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Вы собираетесь заархивировать мероприятие <span className="font-semibold">"{eventName}"</span>.
                        После архивации мероприятие будет недоступно для участников, а все данные будут переведены в режим только для чтения.
                    </p>
                </DialogDescription>
                <AlertDialogHeader className="pt-4 text-left text-sm text-muted-foreground space-y-2">
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5">•</div>
                        <div>Участники больше не смогут регистрироваться</div>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5">•</div>
                        <div>Изменения в этапах и настройках будут заблокированы</div>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5">•</div>
                        <div>Статистика останется доступной для просмотра</div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex gap-3 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1 text-base"
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                        className="flex-1 text-base bg-amber-600 hover:bg-amber-700"
                    >
                        Архивировать
                    </Button>
                </AlertDialogFooter>
            </DialogContent>
        </Dialog>
    )
}