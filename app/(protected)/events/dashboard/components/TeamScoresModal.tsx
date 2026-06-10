"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiScores, DetailedStageScore } from "@/app/api/http/scores/scores";
import { apiStageCriteria } from "@/app/api/http/stage-criteria/stage_criteria";
import { apiUsers } from "@/app/api/http/users/users";

interface TeamScoresModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  teamId: number | null;
  stageId: number | null;
  teamName?: string;
  stageName?: string;
  isJudgeOrOrganizer: boolean;
}

export function TeamScoresModal({
  isOpen,
  onOpenChange,
  teamId,
  stageId,
  teamName,
  stageName,
  isJudgeOrOrganizer,
}: TeamScoresModalProps) {
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => apiUsers.getProfile(),
  });

  const [editingScoreId, setEditingScoreId] = useState<number | null>(null);
  const [creatingForCriteriaId, setCreatingForCriteriaId] = useState<number | null>(null);
  const [scoreValue, setScoreValue] = useState<string | number>("");
  const [commentValue, setCommentValue] = useState<string>("");

  // Load scores
  const { data: scores, isLoading: isLoadingScores } = useQuery({
    queryKey: ['teamScores', teamId, stageId],
    queryFn: () => {
      if (!teamId || !stageId) return Promise.resolve([]);
      return apiScores.getDetailedScores(teamId, stageId);
    },
    enabled: isOpen && !!teamId && !!stageId,
  });

  // Load criteria
  const { data: criteriaList, isLoading: isLoadingCriteria } = useQuery({
    queryKey: ['stageCriteria', stageId],
    queryFn: () => {
      if (!stageId) return Promise.resolve([]);
      return apiStageCriteria.getStageCriteriaByStage(stageId);
    },
    enabled: isOpen && !!stageId,
  });

  const createMutation = useMutation({
    mutationFn: (data: { score: number; comment?: string }) => {
      if (!teamId || !creatingForCriteriaId) throw new Error("Missing data");
      return apiScores.createScore({
        team_id: teamId,
        stage_criteria_id: creatingForCriteriaId,
        score: data.score,
        comment: data.comment || null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamScores', teamId, stageId] });
      cancelEdit();
      toast.success("Балл успешно выставлен");
    },
    onError: (error: any) => {
      toast.error('Ошибка при сохранении: ' + (error.response?.data?.detail || error.message));
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: { scoreId: number; score: number; comment?: string }) => {
      return apiScores.updateScore(data.scoreId, {
        score: data.score,
        comment: data.comment || null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamScores', teamId, stageId] });
      cancelEdit();
      toast.success("Балл успешно обновлен");
    },
    onError: (error: any) => {
      toast.error('Ошибка при обновлении: ' + (error.response?.data?.detail || error.message));
    }
  });

  const handleEditScore = (score: DetailedStageScore) => {
    setEditingScoreId(score.id);
    setCreatingForCriteriaId(null);
    setScoreValue(score.score);
    setCommentValue(score.comment || "");
  };

  const handleCreateScore = (criteriaId: number) => {
    setCreatingForCriteriaId(criteriaId);
    setEditingScoreId(null);
    setScoreValue("");
    setCommentValue("");
  };

  const cancelEdit = () => {
    setEditingScoreId(null);
    setCreatingForCriteriaId(null);
    setScoreValue("");
    setCommentValue("");
  };

  const handleSave = () => {
    const numValue = parseFloat(scoreValue as string);
    if (isNaN(numValue)) {
      toast.error("Введите корректный балл");
      return;
    }
    if (editingScoreId) {
      updateMutation.mutate({ scoreId: editingScoreId, score: numValue, comment: commentValue });
    } else if (creatingForCriteriaId) {
      createMutation.mutate({ score: numValue, comment: commentValue });
    }
  };

  const getScoreForCriteria = (criteriaId: number) => {
    return scores?.find(s => s.stage_criteria_id === criteriaId && s.judge_id === profile?.id);
  };

  const allScoresForCriteria = (criteriaId: number) => {
    return scores?.filter(s => s.stage_criteria_id === criteriaId) || [];
  };

  if (!teamId || !stageId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Баллы команды {teamName && `"${teamName}"`}
          </DialogTitle>
          <DialogDescription>
            {stageName && `Этап: ${stageName}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {isLoadingScores || isLoadingCriteria ? (
            <div className="text-center py-8 text-muted-foreground">Загрузка данных...</div>
          ) : criteriaList?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">На этом этапе нет критериев оценивания</div>
          ) : (
            <div className="space-y-4">
              {criteriaList?.map((criteria) => {
                const criteriaScores = allScoresForCriteria(criteria.id);
                const myScore = getScoreForCriteria(criteria.id);
                const isEditingThis = creatingForCriteriaId === criteria.id || (myScore && editingScoreId === myScore.id);

                return (
                  <Card key={criteria.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-gray-50 dark:bg-neutral-900 p-4 border-b">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-lg">{criteria.criteria_name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Макс. балл: {criteria.max_score} {criteria.weight !== 1 ? `| Вес: ${criteria.weight}` : ''}
                            </p>
                          </div>
                          {isJudgeOrOrganizer && !isEditingThis && !myScore && (
                            <Button variant="outline" size="sm" onClick={() => handleCreateScore(criteria.id)}>
                              Оценить
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="p-4 space-y-4">
                        {criteriaScores.length > 0 ? (
                          <div className="space-y-3">
                            {criteriaScores.map(score => (
                              <div key={score.id} className="flex flex-col gap-2 p-3 rounded-lg border bg-white dark:bg-neutral-950">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="font-semibold">
                                      {score.score} / {criteria.max_score}
                                    </Badge>
                                    <span className="text-sm font-medium">
                                      {score.judge.firstname} {score.judge.lastname}
                                    </span>
                                  </div>
                                  {isJudgeOrOrganizer && profile?.id === score.judge_id && !isEditingThis && (
                                    <Button variant="ghost" size="sm" onClick={() => handleEditScore(score)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                                {score.comment && (
                                  <p className="text-sm text-muted-foreground">{score.comment}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground text-center py-2">
                            Пока нет оценок по этому критерию
                          </div>
                        )}

                        {isEditingThis && (
                          <div className="mt-4 p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 dark:border-indigo-900/50 dark:bg-indigo-900/20 space-y-3">
                            <h5 className="font-medium text-sm text-indigo-900 dark:text-indigo-200">
                              {myScore ? "Редактировать вашу оценку" : "Ваша оценка"}
                            </h5>
                            <div className="flex flex-col gap-3">
                              <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Балл (макс {criteria.max_score})</label>
                                <Input
                                  type="number"
                                  min="0"
                                  max={criteria.max_score}
                                  step="0.1"
                                  value={scoreValue}
                                  onChange={e => {
                                    let val = e.target.value;
                                    if (val === "") {
                                      setScoreValue("");
                                      return;
                                    }
                                    const num = parseFloat(val);
                                    if (!isNaN(num)) {
                                      if (num > criteria.max_score) setScoreValue(criteria.max_score);
                                      else if (num < 0) setScoreValue(0);
                                      else setScoreValue(val);
                                    }
                                  }}
                                  className="w-32"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Комментарий (необязательно)</label>
                                <Textarea
                                  value={commentValue}
                                  onChange={e => setCommentValue(e.target.value)}
                                  placeholder="Оставьте комментарий к оценке"
                                  className="resize-none"
                                />
                              </div>
                              <div className="flex gap-2 justify-end mt-2">
                                <Button variant="outline" size="sm" onClick={cancelEdit}>
                                  Отмена
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={handleSave}
                                  disabled={updateMutation.isPending || createMutation.isPending}
                                >
                                  Сохранить
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
