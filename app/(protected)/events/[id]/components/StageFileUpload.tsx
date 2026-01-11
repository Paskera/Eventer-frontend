"use client"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiSubmissions, FileRequirement, StageSubmissionFile } from "@/app/api/http/submissions/submissions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Download, FileIcon, Loader2 } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

interface StageFileUploadProps {
  stageId: number
  requirements: FileRequirement[]
}

export function StageFileUpload({ stageId, requirements }: StageFileUploadProps) {
  // const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: submission, isLoading: isLoadingSubmission } = useQuery({
    queryKey: ["submission", stageId],
    queryFn: () => apiSubmissions.getSubmission(stageId),
  })

  const uploadMutation = useMutation({
    mutationFn: ({ requirementId, file }: { requirementId: string; file: File }) =>
      apiSubmissions.uploadFile(stageId, requirementId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission", stageId] })
      alert("Файл успешно загружен")
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || "Не удалось загрузить файл")
    },
  })

  const deleteMutation = useMutation({
    mutationFn: ({ submissionId, fileId }: { submissionId: number; fileId: number }) =>
      apiSubmissions.deleteFile(submissionId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission", stageId] })
      alert("Файл успешно удален")
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || "Не удалось удалить файл")
    },
  })

  const downloadMutation = useMutation({
    mutationFn: (fileId: number) => apiSubmissions.getDownloadLink(fileId),
    onSuccess: (url) => {
      window.open(url, "_blank")
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || "Не удалось скачать файл")
    },
  })

  const handleFileSelect = (requirement: FileRequirement, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Проверка размера файла
    const maxSizeBytes = requirement.max_size_mb * 1024 * 1024
    if (file.size > maxSizeBytes) {
      alert(`Файл слишком большой. Максимальный размер: ${requirement.max_size_mb} МБ`)
      return
    }

    // Проверка расширения файла
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!requirement.mimes.includes(fileExtension)) {
      alert(`Недопустимый формат файла. Разрешенные форматы: ${requirement.mimes.join(", ")}`)
      return
    }

    uploadMutation.mutate({ requirementId: requirement.id, file })
    event.target.value = "" // Сброс input
  }

  const getFileForRequirement = (requirementId: string): StageSubmissionFile | undefined => {
    if (!submission?.files || !Array.isArray(submission.files)) {
      return undefined
    }
    return submission.files.find((f) => f.requirement_id === requirementId)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " Б"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " КБ"
    return (bytes / (1024 * 1024)).toFixed(1) + " МБ"
  }

  if (isLoadingSubmission) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-4 mt-4">
      {requirements.map((requirement) => {
        const uploadedFile = getFileForRequirement(requirement.id)
        const isUploading = uploadMutation.isPending

        return (
          <div
            key={requirement.id}
            className="border border-gray-200 dark:border-neutral-800 rounded-lg p-4 bg-gray-50 dark:bg-neutral-900/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">{requirement.name}</h4>
                  {requirement.is_required && (
                    <Badge variant="destructive" className="text-xs">
                      Обязательно
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    Макс. {requirement.max_size_mb} МБ
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Разрешенные форматы: {requirement.mimes.join(", ")}
                </p>

                {uploadedFile ? (
                  <div className="flex items-center gap-3 mt-3 p-3 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700">
                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                        {uploadedFile.original_filename}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(uploadedFile.file_size)} • Загружено{" "}
                        {new Date(uploadedFile.created_at).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadMutation.mutate(uploadedFile.id)}
                        disabled={downloadMutation.isPending}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {submission && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMutation.mutate({ submissionId: submission.id, fileId: uploadedFile.id })}
                          disabled={deleteMutation.isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    <Input
                      type="file"
                      accept={requirement.mimes.join(",")}
                      onChange={(e) => handleFileSelect(requirement, e)}
                      disabled={isUploading}
                      className="hidden"
                      id={`file-input-${requirement.id}`}
                    />
                    <label htmlFor={`file-input-${requirement.id}`}>
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={isUploading}
                        asChild
                      >
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          {isUploading ? "Загрузка..." : "Выбрать файл"}
                        </span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
