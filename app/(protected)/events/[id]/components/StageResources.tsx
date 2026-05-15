"use client"

import { StageResource } from "@/app/api/http/stages/stages"
import { apiResources } from "@/app/api/http/stages/resources"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, FileIcon, Link as LinkIcon } from "lucide-react"

interface StageResourcesProps {
  stageId: number
  resources: StageResource[]
}

export function StageResources({ stageId, resources }: StageResourcesProps) {
  if (!resources || resources.length === 0) {
    return null
  }

  const handleDownload = async (resource: StageResource) => {
    if (resource.resource_type === "link") {
      // Если это ссылка, открываем в новой вкладке
      window.open(resource.url_path, "_blank")
    } else {
      // Если это файл, скачиваем через API (получаем подписанную ссылку)
      try {
        const downloadUrl = await apiResources.getDownloadUrl(stageId, resource.id);
        window.open(downloadUrl, "_blank");
      } catch (error) {
        console.error("Ошибка при получении ссылки на скачивание:", error);
        alert("Не удалось скачать файл. Попробуйте позже.");
      }
    }
  }

  return (
    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-100 flex items-center justify-center">
          <FileIcon className="h-4 w-4" />
        </div>
        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Ресурсы этапа
        </h4>
        <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
          {resources.length}
        </span>
      </div>
      <div className="space-y-2">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center justify-between gap-3 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                resource.resource_type === "link" 
                  ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}>
                {resource.resource_type === "link" ? (
                  <LinkIcon className="h-5 w-5" />
                ) : (
                  <FileIcon className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {resource.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {resource.resource_type === "link" ? "Внешняя ссылка" : "Файл для скачивания"}
                </p>
              </div>
            </div>
            <Button
              variant={resource.resource_type === "link" ? "default" : "outline"}
              size="sm"
              onClick={() => handleDownload(resource)}
              className="flex-shrink-0"
            >
              {resource.resource_type === "link" ? (
                <>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Открыть
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Скачать
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
