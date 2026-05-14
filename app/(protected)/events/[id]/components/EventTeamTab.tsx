"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { UsersIcon, ShieldAlert, LinkIcon, CopyIcon, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiEventTeams } from "@/app/api/http/EventTeams/event_teams"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

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

             <ul className="space-y-3">
               {team.members.map((u: any, idx: number) => {
                  const displayName = [u.firstname, u.lastname].filter(Boolean).join(' ') || `Участник ${idx + 1}`;
                  const isLeader = u.role === 'LEADER';
                  
                  return (
                    <li key={idx} className="flex items-center justify-between p-3.5 bg-card border border-border shadow-sm rounded-md transition-all hover:border-border/80">
                      <div className="flex items-center gap-3.5">
                         <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center text-[15px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                           {displayName[0]?.toUpperCase()}
                         </div>
                         <div>
                            <span className="text-[15px] font-semibold text-foreground flex items-center gap-2">
                               {displayName}
                            </span>
                            <span className="text-[13px] text-muted-foreground pr-2 block mt-0.5">
                               Роль: {isLeader ? 'Капитан' : 'Участник'}
                            </span>
                         </div>
                      </div>
                      {isLeader && (
                         <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1.5 rounded-md border border-yellow-200 dark:border-yellow-700/50">
                           <ShieldAlert className="w-3.5 h-3.5" />
                           Капитан
                         </div>
                      )}
                    </li>
                  );
               })}
             </ul>
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
                                       className={`flex-1 h-10 text-[13px] shadow-sm transition-all ${
                                         copiedLink 
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
                                        <RefreshCcw className={`w-4 h-4 ${RegenerateTokenMutation.isPending ? 'animate-spin' : ''}`} />
                                     </Button>
                                  </div>
                               </div>
                            </div>
                            
                            <div className="p-3 bg-blue-50/30 dark:bg-blue-500/5 rounded-md border border-blue-100/50 dark:border-blue-500/20">
                               <p className="text-[12px] text-blue-700/80 dark:text-blue-400/80 leading-normal">
                                  <span className="font-bold text-blue-800 dark:text-blue-300">Совет:</span> Обновите ссылку, если вы уже набрали команду, чтобы никто лишний не смог вступить.
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
    </div>
  )
}
