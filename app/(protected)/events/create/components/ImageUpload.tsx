'use client';

import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
}

export function ImageUpload({ onImageChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: File[]) => {
    const file = files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Файл слишком большой", {
          description: "Максимальный размер изображения: 5 МБ."
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Неверный тип файла", {
          description: "Пожалуйста, выберите изображение (PNG, JPG)."
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
      toast.success("Изображение загружено", {
        description: `Файл ${file.name} готов к загрузке.`
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    maxFiles: 1,
  });

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info("Изображение удалено");
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">
        Обложка мероприятия
      </label>
      
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Превью обложки"
            className="w-full h-auto aspect-video object-cover rounded-lg border border-border"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 rounded-lg">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
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
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-all duration-200 hover:border-primary/70 hover:bg-primary/5",
            isDragActive && "border-primary bg-primary/10"
          )}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-muted p-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-foreground">
                Перетащите обложку сюда или нажмите для выбора
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, до 5 МБ
              </p>
            </div>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
        className="hidden"
      />
    </div>
  );
}