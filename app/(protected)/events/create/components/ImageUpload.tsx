'use client'

import { useState, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
    onImageChange: (file: File | null) => void
}

export function ImageUpload({ onImageChange }: ImageUploadProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Проверяем тип файла
            if (!file.type.match('image/jpeg|image/png|image/webp')) {
                alert('Пожалуйста, выберите файл в формате JPEG, PNG или WebP')
                return
            }

            // Проверяем размер файла (максимум 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Размер файла не должен превышать 5MB')
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string)
                setFileName(file.name)
                onImageChange(file)
            }
            reader.readAsDataURL(file)
        }
    }, [onImageChange])

    const handleRemoveImage = useCallback(() => {
        setSelectedImage(null)
        setFileName(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
        onImageChange(null)
    }, [onImageChange])

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) {
            // Проверяем тип файла
            if (!file.type.match('image/jpeg|image/png|image/webp')) {
                alert('Пожалуйста, выберите файл в формате JPEG, PNG или WebP')
                return
            }

            // Проверяем размер файла (максимум 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Размер файла не должен превышать 5MB')
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string)
                setFileName(file.name)
                onImageChange(file)
            }
            reader.readAsDataURL(file)
        }
    }, [onImageChange])

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Изображение мероприятия</CardTitle>
            </CardHeader>
            <CardContent>
                <div 
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-colors hover:bg-muted/50"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {selectedImage ? (
                        <div className="relative">
                            <img 
                                src={selectedImage} 
                                alt="Предварительный просмотр" 
                                className="max-h-64 mx-auto rounded-lg object-contain"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 rounded-full"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveImage()
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            <p className="text-sm text-muted-foreground mt-2">{fileName}</p>
                        </div>
                    ) : (
                        <div>
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="text-base text-muted-foreground mb-2">
                                Перетащите изображение сюда или нажмите для выбора
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Поддерживаемые форматы: JPEG, PNG, WebP (до 5 МБ)
                            </p>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                    />
                </div>
            </CardContent>
        </Card>
    )
}