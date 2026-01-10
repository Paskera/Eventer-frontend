"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface NotificationModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSave: (notification: {
        title: string
        message: string
        sendToAll: boolean
        targetGroups: string[]
    }) => void
}

export function NotificationModal({
    isOpen,
    onOpenChange,
    onSave
}: NotificationModalProps) {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [sendToAll, setSendToAll] = useState(true)
    const [targetGroups, setTargetGroups] = useState<string[]>([])
    
    const groups = ['Организаторы', 'Участники', 'Команды', 'Спонсоры']

    const handleGroupToggle = (group: string) => {
        if (targetGroups.includes(group)) {
            setTargetGroups(targetGroups.filter(g => g !== group))
        } else {
            setTargetGroups([...targetGroups, group])
        }
    }

    const handleSave = () => {
        onSave({
            title,
            message,
            sendToAll,
            targetGroups
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">
                        Отправить уведомление
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="notification-title" className="text-base">Заголовок уведомления</Label>
                        <Input
                            id="notification-title"
                            placeholder="Введите заголовок уведомления"
                            className="text-base"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notification-message" className="text-base">Текст уведомления</Label>
                        <Textarea
                            id="notification-message"
                            placeholder="Введите текст уведомления"
                            className="min-h-[120px] text-base"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="send-to-all"
                                checked={sendToAll}
                                onCheckedChange={(checked) => setSendToAll(!!checked)}
                            />
                            <Label htmlFor="send-to-all" className="text-base cursor-pointer">
                                Отправить всем участникам
                            </Label>
                        </div>

                        {!sendToAll && (
                            <div className="space-y-3 pl-6 pt-2">
                                <Label className="text-base">Выберите группы получателей</Label>
                                <div className="flex flex-wrap gap-2">
                                    {groups.map((group) => (
                                        <div key={group} className="flex items-center gap-2 cursor-pointer" onClick={() => handleGroupToggle(group)}>
                                            <Checkbox
                                                checked={targetGroups.includes(group)}
                                                onCheckedChange={() => {}}
                                            />
                                            <span>{group}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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
                            disabled={!title || !message}
                        >
                            Отправить уведомление
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}