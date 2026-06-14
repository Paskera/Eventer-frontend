"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { apiEventJudges } from "@/app/api/http/event-judges/event_judges";
import { apiScores } from "@/app/api/http/scores/scores";
import { apiStages } from "@/app/api/http/stages/stages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsersRound, Trophy, Star, Plus, Mail, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function JudgesDashboardPage() {
  const params = useParams();
  const eventId = Number(params.id);
  const queryClient = useQueryClient();
  const [newJudgeEmail, setNewJudgeEmail] = useState("");
  const [judgeToDelete, setJudgeToDelete] = useState<{ id: number; name: string } | null>(null);

  const { data: judges, isPending: isJudgesPending } = useQuery({
    queryKey: ["event_judges_detailed", eventId],
    queryFn: () => apiEventJudges.getDetailedEventJudges(eventId),
  });

  const { data: scores, isPending: isScoresPending } = useQuery({
    queryKey: ["event_scores_detailed", eventId],
    queryFn: () => apiScores.getDetailedScoresByEvent(eventId),
  });

  const { data: stages } = useQuery({
    queryKey: ["stages", eventId],
    queryFn: () => apiStages.getAllStages(eventId),
  });

  const addJudgeMutation = useMutation({
    mutationFn: (email: string) => apiEventJudges.addJudgeByEmail(eventId, email),
    onSuccess: () => {
      toast.success("Судья успешно добавлен");
      setNewJudgeEmail("");
      queryClient.invalidateQueries({ queryKey: ["event_judges_detailed", eventId] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || "Ошибка при добавлении судьи";
      toast.error(message);
    }
  });

  const removeJudgeMutation = useMutation({
    mutationFn: (judgeId: number) => apiEventJudges.removeJudge(eventId, judgeId),
    onSuccess: () => {
      toast.success("Судья удалён");
      queryClient.invalidateQueries({ queryKey: ["event_judges_detailed", eventId] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || "Ошибка при удалении судьи";
      toast.error(message);
    }
  });

  const handleAddJudge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJudgeEmail.trim()) return;
    addJudgeMutation.mutate(newJudgeEmail.trim());
  };

  if (isJudgesPending || isScoresPending) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  // Сгруппировать оценки по судьям
  const scoresByJudge: Record<number, typeof scores> = {};
  if (scores) {
    scores.forEach((score) => {
      if (!scoresByJudge[score.judge_id]) {
        scoresByJudge[score.judge_id] = [];
      }
      scoresByJudge[score.judge_id]?.push(score);
    });
  }

  return (
    <>
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
          <UsersRound className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Судьи мероприятия
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Список назначенных судей и выставленные ими оценки
          </p>
        </div>
      </div>

      <Card className="border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        <CardHeader className="pb-4 border-b border-gray-100 dark:border-neutral-800">
          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <Plus className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            Добавить судью
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleAddJudge} className="flex gap-4 items-end max-w-2xl">
            <div className="space-y-3 flex-1">
              <label htmlFor="email" className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300">
                Email пользователя
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Введите email будущего судьи..."
                  className="pl-12 h-12 text-base sm:text-lg"
                  value={newJudgeEmail}
                  onChange={(e) => setNewJudgeEmail(e.target.value)}
                  disabled={addJudgeMutation.isPending}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700 text-white h-12 px-8 text-base sm:text-lg"
              disabled={addJudgeMutation.isPending || !newJudgeEmail.trim()}
            >
              {addJudgeMutation.isPending ? "Добавление..." : "Добавить"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {judges && judges.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {judges.map((eventJudge) => {
            const judge = eventJudge.judge;
            const judgeScores = scoresByJudge[judge.id] || [];

            // Группируем оценки судьи по этапам
            const scoresByStage: Record<number, { stage_id: number; stage_name: string; scores: NonNullable<typeof scores> }> = {};
            
            judgeScores.forEach((s) => {
              if (!scoresByStage[s.stage_id]) {
                const stage = stages?.find(st => st.id === s.stage_id);
                scoresByStage[s.stage_id] = { 
                  stage_id: s.stage_id, 
                  stage_name: stage ? stage.stage_name : `Этап #${s.stage_id}`, 
                  scores: [] 
                };
              }
              scoresByStage[s.stage_id]!.scores.push(s);
            });

            return (
              <Card key={eventJudge.id} className="overflow-hidden border-gray-200 dark:border-neutral-800">
                <CardHeader className="bg-slate-50 dark:bg-neutral-900 border-b border-gray-100 dark:border-neutral-800">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-white dark:border-neutral-800 shadow-sm">
                      <AvatarImage src={judge.avatar_url || ""} />
                      <AvatarFallback className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                        {judge.firstname?.[0] || judge.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <CardTitle className="text-lg truncate">
                        {judge.firstname} {judge.lastname}
                      </CardTitle>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {judge.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                          {judgeScores.length}
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Оценок</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        disabled={removeJudgeMutation.isPending}
                        onClick={() => setJudgeToDelete({ id: judge.id, name: `${judge.firstname ?? ''} ${judge.lastname ?? ''}`.trim() || judge.email })}
                        title="Удалить судью"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {judgeScores.length > 0 ? (
                    <Accordion type="multiple" className="w-full">
                      {Object.values(scoresByStage).map((stageGroup) => (
                        <AccordionItem value={`stage-${stageGroup.stage_id}`} key={stageGroup.stage_id} className="border-b-0 border-t border-gray-100 dark:border-neutral-800">
                          <AccordionTrigger className="px-6 hover:no-underline hover:bg-slate-50 dark:hover:bg-neutral-800/50 transition-colors">
                            <div className="flex items-center justify-between w-full pr-4">
                              <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span className="font-semibold text-sm truncate max-w-[200px] text-left">{stageGroup.stage_name}</span>
                              </div>
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                {stageGroup.scores.length}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 pt-2">
                            <div className="space-y-3">
                              {stageGroup.scores.map((score) => (
                                <div key={score.id} className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
                                  <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                      Критерий: {score.criteria?.criteria_name}
                                    </span>
                                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
                                      <Star className="w-3 h-3" />
                                      {score.score} / {score.criteria?.max_score}
                                    </div>
                                  </div>
                                  <div className="text-xs text-slate-500 mb-2">
                                    Команда ID: {score.team_id}
                                  </div>
                                  {score.comment && (
                                    <div className="text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-neutral-950 p-2 rounded border border-gray-100 dark:border-neutral-800 italic">
                                      "{score.comment}"
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                      Этот судья еще не выставил ни одной оценки
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center rounded-2xl border border-dashed border-gray-300 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900">
          <div className="w-20 h-20 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-200 dark:border-neutral-700">
            <UsersRound className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Нет судей
          </h3>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            К этому мероприятию еще не прикреплено ни одного судьи.
          </p>
        </div>
      )}
    </div>

    <AlertDialog open={!!judgeToDelete} onOpenChange={(open) => { if (!open) setJudgeToDelete(null); }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить судью?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы уверены, что хотите удалить <strong>{judgeToDelete?.name}</strong> из судей этого мероприятия?
            Это действие нельзя отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              if (judgeToDelete) {
                removeJudgeMutation.mutate(judgeToDelete.id);
                setJudgeToDelete(null);
              }
            }}
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
