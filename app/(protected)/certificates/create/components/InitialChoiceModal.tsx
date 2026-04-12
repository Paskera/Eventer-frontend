"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FilePlus, History, Layout } from "lucide-react"

interface InitialChoiceModalProps {
  onChooseOwn: () => void
  onChooseTemplate: () => void
  onChooseLastDocument: () => void
  hasLastDocument: boolean
}

export default function InitialChoiceModal({
  onChooseOwn,
  onChooseTemplate,
  onChooseLastDocument,
  hasLastDocument,
}: InitialChoiceModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <Card className="w-full max-w-4xl shadow-2xl animate-in fade-in zoom-in duration-300">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">Добро пожаловать в конструктор</CardTitle>
          <CardDescription className="text-base">
            Выберите, с чего вы хотите начать работу над документом
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <button
              type="button"
              onClick={onChooseOwn}
              className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-xl border-2 border-muted bg-card hover:border-primary hover:bg-accent/50 transition-all group text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FilePlus className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Создать свой</h3>
                <p className="text-sm text-muted-foreground">
                  Пустой лист A4 — начните с чистого документа
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={onChooseTemplate}
              className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-xl border-2 border-muted bg-card hover:border-primary hover:bg-accent/50 transition-all group text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layout className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Использовать шаблон</h3>
                <p className="text-sm text-muted-foreground">
                  Выберите один из готовых макетов и отредактируйте его
                </p>
              </div>
            </button>

            <button
              type="button"
              disabled={!hasLastDocument}
              onClick={hasLastDocument ? onChooseLastDocument : undefined}
              className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-xl border-2 border-muted bg-card hover:border-primary hover:bg-accent/50 transition-all group text-center disabled:opacity-50 disabled:pointer-events-none disabled:hover:border-muted disabled:hover:bg-card"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <History className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Последний документ</h3>
                <p className="text-sm text-muted-foreground">
                  {hasLastDocument
                    ? "Продолжить черновик из локального хранилища"
                    : "Сохранённых черновиков пока нет"}
                </p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
