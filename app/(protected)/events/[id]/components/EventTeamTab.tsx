"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
   UsersIcon,
   ShieldAlert,
   LinkIcon,
   CopyIcon,
   RefreshCw,
   Trash2,
   MoreHorizontal,
   UserMinus,
   ShieldCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiEventTeams } from "@/app/api/http/EventTeams/event_teams"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EventTeamTabProps {
   team: any;
   eventId: number;
   isPending: boolean;
   onRegisterClick: () => void;
}

export const EventTeamTab = ({ team, eventId, isPending, onRegisterClick }: EventTeamTabProps) => {
   const { data: session } = useSession()
   const queryClient = useQueryClient()
   const [copiedLink, setCopiedLink] = useState(false)
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
   const [memberToRemove, setMemberToRemove] = useState<{ id: number, name: string } | null>(null)
   const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

   const RegenerateTokenMutation = useMutation({
      mutationFn: () => apiEventTeams.regenerateInviteToken(eventId, team.team.id),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["team", String(eventId)] })
         toast.success("Ссылка обновлена", {
            description: "Предыдущая ссылка больше не действительна."
         })
      },
      onError: () => {
         toast.error("Ошибка при обновлении ссылки")
      }
   })

   const DeleteTeamMutation = useMutation({
      mutationFn: () => apiEventTeams.deleteEventTeam(eventId, team.team.id),
      onSuccess: () => {
         setIsDeleteModalOpen(false)
         queryClient.invalidateQueries({ queryKey: ["team", String(eventId)] })
         toast.success("Команда расформирована")
      },
      onError: () => {
         toast.error("Ошибка при расформировании команды")
      }
   })

   const RemoveMemberMutation = useMutation({
      mutationFn: (memberId: number) => apiEventTeams.removeMember(eventId, team.team.id, memberId),
      onSuccess: () => {
         setIsRemoveModalOpen(false)
         setMemberToRemove(null)
         queryClient.invalidateQueries({ queryKey: ["team", String(eventId)] })
         toast.success("Участник удален из команды")
      },
      onError: () => {
         toast.error("Ошибка при удалении участника")
      }
   })

   const PromoteMemberMutation = useMutation({
      mutationFn: (memberId: number) => apiEventTeams.promoteToLeader(eventId, team.team.id, memberId),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["team", String(eventId)] })
         toast.success("Лидер команды изменен")
      },
      onError: () => {
         toast.error("Ошибка при смене лидера")
      }
   })

   const inviteUrl = team?.team?.invite_token
      ? `${window.location.origin}/events/${eventId}?open=true&token=${team.team.invite_token}&team_name=${team.team.name}`
      : ""

   const copyInviteLink = () => {
      if (inviteUrl) {
         navigator.clipboard.writeText(inviteUrl)
         setCopiedLink(true)
         setTimeout(() => setCopiedLink(false), 2000)
      }
   }

   if (isPending) {
      return (
         <div className="w-full flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
         </div>
      )
   }

   if (!team) {
      return (
         <Card className="border-dashed border-2 border-border shadow-none bg-background/50 flex flex-col items-center justify-center p-12 py-16 text-center animate-in fade-in duration-500 rounded-md">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4 text-muted-foreground">
               <UsersIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Вы не состоите в команде</h3>
            <p className="text-[15px] text-muted-foreground max-w-md mx-auto mb-6">
               Для участия в мероприятии необходимо создать свою команду или принять приглашение капитана.
            </p>
            <Button onClick={onRegisterClick} className="bg-green-600 hover:bg-green-700 text-white shadow-sm font-semibold h-11 px-6 rounded-md">
               Создать команду
            </Button>
         </Card>
      )
   }

   const currentUserMember = team?.members?.find((m: any) =>
      (m.firstname === session?.user?.name?.split(' ')[0] && m.lastname === session?.user?.name?.split(' ')[1]) ||
      // Fallback if name is combined or structured differently
      m.firstname + " " + m.lastname === session?.user?.name
   )
   const isCurrentUserLeader = currentUserMember?.role === 'LEADER' || currentUserMember?.role === '1'

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <div className="flex flex-col md:flex-row gap-6 md:items-start">
            <div className="flex-1 space-y-6">
               <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                     <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <span className="text-green-600 dark:text-green-500">#</span> {team.team.name}
                     </h2>
                     <p className="text-[14px] text-muted-foreground mt-1">Состав команды</p>
                  </div>
                  <Badge variant="outline" className="shadow-none text-[13px] bg-green-50 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-400">
                     {team.members.length} участник{team.members.length === 1 ? '' : team.members.length < 5 ? 'а' : 'ов'}
                  </Badge>
               </div>

               <div className="space-y-3">
                  {team.members.map((u: any, idx: number) => {
                     const displayName = [u.firstname, u.lastname].filter(Boolean).join(' ') || `Участник ${idx + 1}`;
                     const isLeader = u.role === 'LEADER' || u.role === '1';

                     // Identify if this member is the current user viewing the page
                     const isMe = (u.firstname === session?.user?.name?.split(' ')[0] && u.lastname === session?.user?.name?.split(' ')[1]) ||
                        (u.firstname + " " + u.lastname === session?.user?.name);

                     return (
                        <div key={idx} className="group flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:border-green-500/30 hover:bg-muted/30 transition-all duration-300">
                           <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-sm ${isLeader ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                                 {u.firstname ? u.firstname[0] : '?'}
                              </div>
                              <div>
                                 <div className="flex items-center gap-2">
                                    <p className="font-bold text-foreground">{displayName}</p>
                                    {isLeader && (
                                       <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-none px-1.5 py-0 h-5 text-[10px] font-bold uppercase tracking-wider">
                                          Капитан
                                       </Badge>
                                    )}
                                 </div>
                                 <p className="text-sm text-muted-foreground">{isLeader ? 'Организатор и лидер' : 'Участник команды'}</p>
                              </div>
                           </div>

                           <div className="flex items-center gap-2">
                              {isCurrentUserLeader && !isMe && (
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                       <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <MoreHorizontal className="w-4 h-4" />
                                       </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 rounded-xl border-border shadow-xl">
                                       <DropdownMenuItem
                                          className="gap-2 cursor-pointer focus:bg-green-50 dark:focus:bg-green-500/10 focus:text-green-600"
                                          onClick={() => PromoteMemberMutation.mutate(u.id)}
                                       >
                                          <ShieldCheck className="w-4 h-4" />
                                          Назначить капитаном
                                       </DropdownMenuItem>
                                       <DropdownMenuItem
                                          className="gap-2 cursor-pointer focus:bg-rose-50 dark:focus:bg-rose-500/10 focus:text-rose-600 text-rose-600"
                                          onClick={() => {
                                             setMemberToRemove({ id: u.id, name: displayName })
                                             setIsRemoveModalOpen(true)
                                          }}
                                       >
                                          <UserMinus className="w-4 h-4" />
                                          Удалить участника
                                       </DropdownMenuItem>
                                    </DropdownMenuContent>
                                 </DropdownMenu>
                              )}
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>

            <div className="w-full md:w-1/3 shrink-0">
               <Card className="border-border shadow-sm bg-muted/20 rounded-md">
                  <div className="p-5 md:p-6 space-y-5">
                     <h3 className="font-bold text-foreground text-lg border-b border-border/50 pb-3">Управление</h3>
                     <div className="space-y-4">
                        {isCurrentUserLeader && team.team ? (
                           <div className="space-y-4">
                              <div className="space-y-3">
                                 <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">Пригласительная ссылка</label>

                                 <div className="space-y-2">
                                    <div className="relative group">
                                       <Input
                                          readOnly
                                          value={inviteUrl}
                                          className="pr-10 bg-background/50 border-border text-[13px] h-10 focus-visible:ring-green-500/30"
                                       />
                                       <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                                          <LinkIcon className="w-4 h-4" />
                                       </div>
                                    </div>

                                    <div className="flex gap-2">
                                       <Button
                                          onClick={copyInviteLink}
                                          variant={copiedLink ? "default" : "outline"}
                                          className={`flex-1 h-10 text-[13px] shadow-sm transition-all ${copiedLink
                                             ? 'bg-green-600 text-white hover:bg-green-700 border-green-600'
                                             : 'bg-background hover:bg-muted font-semibold'
                                             }`}
                                       >
                                          {copiedLink ? <CopyIcon className="w-4 h-4 mr-2" /> : <CopyIcon className="w-4 h-4 mr-2" />}
                                          {copiedLink ? 'Скопировано' : 'Копировать'}
                                       </Button>
                                       <Button
                                          variant="outline"
                                          size="icon"
                                          className="h-10 w-10 shrink-0 border-border hover:bg-muted transition-colors"
                                          onClick={() => RegenerateTokenMutation.mutate()}
                                          disabled={RegenerateTokenMutation.isPending}
                                          title="Обновить ссылку"
                                       >
                                          <RefreshCw className={`w-4 h-4 ${RegenerateTokenMutation.isPending ? 'animate-spin' : ''}`} />
                                       </Button>
                                    </div>
                                 </div>

                                 <div className="pt-4 mt-2 border-t border-border/50">
                                    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                                       <DialogTrigger asChild>
                                          <Button
                                             variant="outline"
                                             className="w-full justify-center h-auto min-h-[40px] py-2 px-3 text-[12px] sm:text-[13px] font-semibold rounded-md border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-500 dark:hover:bg-rose-600 dark:hover:text-white transition-all duration-300 shadow-sm group"
                                             disabled={DeleteTeamMutation.isPending}
                                          >
                                             <Trash2 className="w-4 h-4 mr-2 shrink-0 transition-transform group-hover:scale-110" />
                                             <span className="whitespace-normal text-center leading-tight">Расформировать команду</span>
                                          </Button>
                                       </DialogTrigger>
                                       <DialogContent className="sm:max-w-[425px] rounded-xl border-border">
                                          <DialogHeader>
                                             <DialogTitle className="text-xl font-bold text-foreground">Расформировать команду?</DialogTitle>
                                             <DialogDescription className="text-[14px] text-muted-foreground pt-2">
                                                Это действие необратимо. Ваша команда «{team.team.name}» будет удалена, а все участники будут исключены.
                                             </DialogDescription>
                                          </DialogHeader>
                                          <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
                                             <Button
                                                variant="outline"
                                                onClick={() => setIsDeleteModalOpen(false)}
                                                className="rounded-md h-11"
                                             >
                                                Отмена
                                             </Button>
                                             <Button
                                                variant="destructive"
                                                onClick={() => DeleteTeamMutation.mutate()}
                                                disabled={DeleteTeamMutation.isPending}
                                                className="rounded-md h-11 px-6 bg-rose-600 hover:bg-rose-700"
                                             >
                                                {DeleteTeamMutation.isPending ? "Удаление..." : "Да, расформировать"}
                                             </Button>
                                          </DialogFooter>
                                       </DialogContent>
                                    </Dialog>
                                 </div>
                              </div>

                              <div className="p-3 bg-blue-50/30 dark:bg-blue-500/5 rounded-md border border-blue-100/50 dark:border-blue-500/20">
                                 <p className="text-[12px] text-blue-700/80 dark:text-blue-400/80 leading-normal">
                                    <span className="font-bold text-blue-800 dark:text-blue-300">Совет:</span> Обновите ссылку, если кто-то посторонний узнал её, чтобы никто лишний не смог вступить в вашу команду.
                                 </p>
                              </div>
                           </div>
                        ) : (
                           <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <ShieldAlert className="w-4 h-4 text-orange-500" />
                              Только капитан может приглашать новых людей.
                           </div>
                        )}

                     </div>
                  </div>
               </Card>
            </div>
         </div>

         {/* Модальное окно удаления участника */}
         <Dialog open={isRemoveModalOpen} onOpenChange={setIsRemoveModalOpen}>
            <DialogContent className="sm:max-w-[425px] rounded-xl border-border">
               <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-foreground">Исключить участника?</DialogTitle>
                  <DialogDescription className="text-[14px] text-muted-foreground pt-2">
                     Вы уверены, что хотите удалить участника <span className="font-bold text-foreground">«{memberToRemove?.name}»</span> из команды?
                     Он потеряет доступ к управлению и обсуждениям.
                  </DialogDescription>
               </DialogHeader>
               <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
                  <Button
                     variant="outline"
                     onClick={() => {
                        setIsRemoveModalOpen(false)
                        setMemberToRemove(null)
                     }}
                     className="rounded-md h-11"
                  >
                     Отмена
                  </Button>
                  <Button
                     variant="destructive"
                     onClick={() => memberToRemove && RemoveMemberMutation.mutate(memberToRemove.id)}
                     disabled={RemoveMemberMutation.isPending}
                     className="rounded-md h-11 px-6 bg-rose-600 hover:bg-rose-700"
                  >
                     {RemoveMemberMutation.isPending ? "Удаление..." : "Исключить"}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   )
}
