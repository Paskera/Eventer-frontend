"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { apiEventJudges } from "@/app/api/http/event-judges/event_judges";
import { apiStages, Stages } from "@/app/api/http/stages/stages";
import { apiStageCriteria, StageCriteria } from "@/app/api/http/stage-criteria/stage_criteria";
import { apiEventTeams, Team } from "@/app/api/http/EventTeams/event_teams";
import { apiScores, DetailedStageScore, StageScoreCreate } from "@/app/api/http/scores/scores";
import { apiEvents } from "@/app/api/http/event/events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Gavel, Trophy, Users, CheckCircle, Star, ChevronRight, ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function JudgingPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const eventId = Number(params.id);

  // ── Данные ──────────────────────────────────────────────────────────────
  const { data: event } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => apiEvents.getEventDetail(eventId),
  });

  const { data: judges, isPending: isJudgesLoading } = useQuery({
    queryKey: ["event_judges_detailed", eventId],
    queryFn: () => apiEventJudges.getDetailedEventJudges(eventId),
  });

  const { data: stages, isPending: isStagesLoading } = useQuery({
    queryKey: ["stages", eventId],
    queryFn: () => apiStages.getAllStages(eventId),
  });

  const { data: teamsData, isPending: isTeamsLoading } = useQuery({
    queryKey: ["eventTeams", eventId],
    queryFn: () => apiEventTeams.getEventTeams(eventId),
  });

  // ── Проверка: является ли текущий пользователь судьёй ──────────────────
  const isJudge = judges?.some((j) => j.judge.email === session?.user?.email);
  const currentJudge = judges?.find((j) => j.judge.email === session?.user?.email);

  // ── Уже выставленные оценки судьёй ──────────────────────────────────────
  const { data: myScores } = useQuery({
    queryKey: ["my_judge_scores", eventId],
    queryFn: () => apiScores.getDetailedScoresByEvent(eventId),
    enabled: !!isJudge,
  });

  // Фильтруем только оценки текущего судьи
  const myOwnScores = myScores?.filter((s) => s.judge_id === currentJudge?.judge.id) || [];

  // ── Локальное состояние форм ─────────────────────────────────────────────
  // { [stageId_teamId_criteriaId]: { score: number; comment: string } }
  const [formState, setFormState] = useState<Record<string, { score: string; comment: string }>>({});

  // ── Мутация выставления оценки ───────────────────────────────────────────
  const submitScoreMutation = useMutation({
    mutationFn: (data: StageScoreCreate) => apiScores.createScore(data),
    onSuccess: () => {
      toast.success("Оценка сохранена");
      queryClient.invalidateQueries({ queryKey: ["my_judge_scores", eventId] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.detail || "Ошибка при сохранении оценки";
      toast.error(msg);
    },
  });

  const getKey = (stageId: number, teamId: number, criteriaId: number) =>
    `${stageId}_${teamId}_${criteriaId}`;

  const isScored = (stageId: number, teamId: number, criteriaId: number) =>
    myOwnScores.some(
      (s) => s.stage_id === stageId && s.team_id === teamId && s.stage_criteria_id === criteriaId
    );

  const getExistingScore = (stageId: number, teamId: number, criteriaId: number) =>
    myOwnScores.find(
      (s) => s.stage_id === stageId && s.team_id === teamId && s.stage_criteria_id === criteriaId
    );

  const handleSubmitScore = (stageId: number, teamId: number, criteria: StageCriteria) => {
    const key = getKey(stageId, teamId, criteria.id);
    const val = formState[key];
    if (!val?.score) {
      toast.error("Введите балл");
      return;
    }
    const score = parseFloat(val.score);
    if (isNaN(score) || score < 0 || score > criteria.max_score) {
      toast.error(`Балл должен быть от 0 до ${criteria.max_score}`);
      return;
    }
    submitScoreMutation.mutate({
      stage_criteria_id: criteria.id,
      team_id: teamId,
      score,
      comment: val.comment || null,
    });
  };

  // ── Загрузка ─────────────────────────────────────────────────────────────
  if (isJudgesLoading || isStagesLoading || isTeamsLoading) {
    return (
      <div className="p-6 space-y-4 max-w-4xl mx-auto">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  // ── Не судья ─────────────────────────────────────────────────────────────
  if (!isJudge) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
          <Gavel className="w-10 h-10 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Доступ запрещён
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md">
          Вы не являетесь судьёй этого мероприятия.
        </p>
        <Button variant="outline" onClick={() => router.push(`/events/${eventId}`)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Вернуться к мероприятию
        </Button>
      </div>
    );
  }

  const teams = teamsData?.teams || [];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Шапка */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/events/${eventId}`)}
          className="shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
            <Gavel className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Панель судьи
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {event?.event_name || "Мероприятие"}
            </p>
          </div>
        </div>
      </div>

      {/* Прогресс */}
      <Card className="border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <CardContent className="p-4 flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{myOwnScores.length}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Оценок выставлено</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{teams.length}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Команд</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stages?.length || 0}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Этапов</div>
          </div>
        </CardContent>
      </Card>

      {/* Этапы */}
      {stages && stages.length > 0 ? (
        <Accordion type="multiple" defaultValue={[`stage-${stages[0].id}`]} className="space-y-4">
          {stages.map((stage) => (
            <StageJudgingPanel
              key={stage.id}
              stage={stage}
              teams={teams}
              myOwnScores={myOwnScores}
              formState={formState}
              setFormState={setFormState}
              isScored={isScored}
              getExistingScore={getExistingScore}
              getKey={getKey}
              handleSubmitScore={handleSubmitScore}
              isPending={submitScoreMutation.isPending}
            />
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-16 text-slate-500 dark:text-slate-400">
          У мероприятия пока нет этапов
        </div>
      )}
    </div>
  );
}

// ── Компонент одного этапа ────────────────────────────────────────────────
function StageJudgingPanel({
  stage,
  teams,
  myOwnScores,
  formState,
  setFormState,
  isScored,
  getExistingScore,
  getKey,
  handleSubmitScore,
  isPending,
}: {
  stage: Stages;
  teams: Team[];
  myOwnScores: DetailedStageScore[];
  formState: Record<string, { score: string; comment: string }>;
  setFormState: React.Dispatch<React.SetStateAction<Record<string, { score: string; comment: string }>>>;
  isScored: (stageId: number, teamId: number, criteriaId: number) => boolean;
  getExistingScore: (stageId: number, teamId: number, criteriaId: number) => DetailedStageScore | undefined;
  getKey: (stageId: number, teamId: number, criteriaId: number) => string;
  handleSubmitScore: (stageId: number, teamId: number, criteria: StageCriteria) => void;
  isPending: boolean;
}) {
  const { data: criteria } = useQuery({
    queryKey: ["stage_criteria", stage.id],
    queryFn: () => apiStageCriteria.getStageCriteriaByStage(stage.id),
  });

  const scoredCount = myOwnScores.filter((s) => s.stage_id === stage.id).length;
  const totalPossible = (criteria?.length || 0) * teams.length;

  return (
    <AccordionItem
      value={`stage-${stage.id}`}
      className="border border-gray-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900"
    >
      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50 dark:hover:bg-neutral-800/50">
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-lg text-left">{stage.stage_name}</span>
          </div>
          <div className="flex items-center gap-2">
            {scoredCount > 0 && (
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                {scoredCount} / {totalPossible} оценок
              </Badge>
            )}
            <Badge variant="outline" className="text-slate-500">
              {criteria?.length || 0} критериев
            </Badge>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-0">
        {!criteria || criteria.length === 0 ? (
          <div className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
            У этого этапа нет критериев оценки
          </div>
        ) : teams.length === 0 ? (
          <div className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
            Нет одобренных команд в этом мероприятии
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-neutral-800">
            {teams.filter(t => t.status === 'approved').map((team) => (
              <TeamScoringBlock
                key={team.id}
                team={team}
                stageId={stage.id}
                criteria={criteria}
                formState={formState}
                setFormState={setFormState}
                isScored={isScored}
                getExistingScore={getExistingScore}
                getKey={getKey}
                handleSubmitScore={handleSubmitScore}
                isPending={isPending}
              />
            ))}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

// ── Блок оценивания одной команды ─────────────────────────────────────────
function TeamScoringBlock({
  team,
  stageId,
  criteria,
  formState,
  setFormState,
  isScored,
  getExistingScore,
  getKey,
  handleSubmitScore,
  isPending,
}: {
  team: Team;
  stageId: number;
  criteria: StageCriteria[];
  formState: Record<string, { score: string; comment: string }>;
  setFormState: React.Dispatch<React.SetStateAction<Record<string, { score: string; comment: string }>>>;
  isScored: (stageId: number, teamId: number, criteriaId: number) => boolean;
  getExistingScore: (stageId: number, teamId: number, criteriaId: number) => DetailedStageScore | undefined;
  getKey: (stageId: number, teamId: number, criteriaId: number) => string;
  handleSubmitScore: (stageId: number, teamId: number, criteria: StageCriteria) => void;
  isPending: boolean;
}) {
  const allScored = criteria.every((c) => isScored(stageId, team.id, c.id));

  return (
    <div className="px-6 py-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-slate-100">{team.name}</span>
        </div>
        {allScored && (
          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 gap-1">
            <CheckCircle className="w-3 h-3" />
            Оценено
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {criteria.map((criterion) => {
          const key = getKey(stageId, team.id, criterion.id);
          const scored = isScored(stageId, team.id, criterion.id);
          const existing = getExistingScore(stageId, team.id, criterion.id);
          const val = formState[key] || { score: "", comment: "" };

          return (
            <div
              key={criterion.id}
              className={`rounded-lg p-4 border transition-colors ${
                scored
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800/50 dark:bg-emerald-900/10"
                  : "border-gray-200 bg-slate-50 dark:border-neutral-700 dark:bg-neutral-800/50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {criterion.criteria_name}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-neutral-900 px-2 py-0.5 rounded border border-gray-200 dark:border-neutral-700">
                  Макс: {criterion.max_score}
                </span>
              </div>

              {scored ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                    <Star className="w-4 h-4" />
                    {existing?.score} / {criterion.max_score}
                  </div>
                  {existing?.comment && (
                    <p className="text-sm text-slate-500 italic">«{existing.comment}»</p>
                  )}
                </div>
              ) : (
                <div className="flex gap-3 items-end">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500">Балл</label>
                    <Input
                      type="number"
                      min={0}
                      max={criterion.max_score}
                      step={0.1}
                      placeholder={`0 – ${criterion.max_score}`}
                      className="w-28 h-9"
                      value={val.score}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          [key]: { ...val, score: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-xs text-slate-500">Комментарий (необязательно)</label>
                    <Textarea
                      placeholder="Комментарий к оценке..."
                      className="h-9 resize-none text-sm"
                      value={val.comment}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          [key]: { ...val, comment: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <Button
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-600 text-white h-9 px-4 shrink-0"
                    disabled={isPending || !val.score}
                    onClick={() => handleSubmitScore(stageId, team.id, criterion)}
                  >
                    Сохранить
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
