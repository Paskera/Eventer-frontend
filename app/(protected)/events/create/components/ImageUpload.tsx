'use client'

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
}

export function ImageUpload({ onImageChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Файл слишком большой. Максимальный размер: 5 МБ");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Пожалуйста, выберите изображение");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
      toast.success("Изображение загружено");
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">
        Обложка мероприятия
      </label>
      
      {preview ? (
        <Card className="relative overflow-hidden group">
          <div className="aspect-video relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClick}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Заменить
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Удалить
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card
          className="border-2 border-dashed border-border hover:border-primary/50 transition-all duration-200 cursor-pointer group"
          onClick={handleClick}
        >
          <div className="aspect-video flex flex-col items-center justify-center gap-3 p-6">
            <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors duration-200">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-foreground">
                Загрузите обложку мероприятия
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG до 5 МБ
              </p>
            </div>
            <Button variant="secondary" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Выбрать файл
            </Button>
          </div>
        </Card>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}