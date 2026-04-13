"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { UsersIcon, CheckIcon, Share2, MapPinIcon, CalendarIcon } from "lucide-react"
import { formatEventDate } from "./utils"

interface EventSidebarProps {
   event: any;
   team: any;
   onRegisterClick: () => void;
}

export const EventSidebar = ({ event, team, onRegisterClick }: EventSidebarProps) => {
   const [copied, setCopied] = useState(false)

   const handleShare = () => {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
   }

   const isEventClosed = event.event_status?.toLowerCase() === 'closed' || event.event_status?.toLowerCase() === 'завершен';

   return (
      <div className="w-full lg:w-1/3 space-y-6">
         {/* Registration CTA Card */}
         <Card className="border-border shadow-sm overflow-hidden bg-white dark:bg-neutral-900 rounded-md relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
            <CardContent className="p-6 md:p-8 text-center">
               <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">Участие в событии</h3>
                  <div className="w-full flex flex-col">
                     {isEventClosed ? (
                        <div className="w-full py-4 px-6 bg-slate-100 dark:bg-slate-800/50 rounded-md font-bold text-slate-500 dark:text-slate-400 text-center flex justify-center items-center gap-2 border border-slate-200/50 dark:border-slate-700/50 shadow-sm cursor-default">
                           Событие завершено
                        </div>
                     ) : team ? (
                        <div className="w-full py-4 px-6 bg-green-50 dark:bg-green-500/10 rounded-md font-bold text-green-700 dark:text-green-400 text-center flex justify-center items-center gap-2 border border-green-200 dark:border-green-500/30 shadow-sm cursor-default">
                           <CheckIcon className="w-5 h-5" /> Вы зарегистрированы
                        </div>
                     ) : (
                        <>
                           <button
                              onClick={onRegisterClick}
                              className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 active:scale-[0.98] rounded-md font-bold text-white transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 group-hover:scale-[1.01]"
                           >
                              Принять участие <UsersIcon className="w-5 h-5" />
                           </button>
                           <p className="text-[13px] text-muted-foreground mt-1 text-center">
                              Регистрация открыта до: <span className="font-semibold text-foreground">{formatEventDate(event.start_date)}</span>
                           </p>
                        </>
                     )}
                  </div>

                  <div className="w-full">
                     <button
                        onClick={handleShare}
                        className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-md transition-all flex items-center justify-center gap-2 border border-slate-200/50 dark:border-neutral-700/50"
                     >
                        {!copied && <Share2 className="w-4 h-4 opacity-70" />}
                        <span>
                           {copied ? "✓ Ссылка скопирована!" : "Поделиться событием"}
                        </span>
                     </button>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Meta Information Card */}
         <Card className="border-border shadow-sm bg-card rounded-md">
            <CardContent className="p-5 flex flex-col gap-5">
               {/* Location Line */}
               <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-blue-100 dark:bg-blue-950/50 flex flex-shrink-0 items-center justify-center border border-blue-200/50 dark:border-blue-900/50 text-blue-600 dark:text-blue-400">
                     <MapPinIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col flex-1 leading-tight justify-center">
                     <span className="text-[13px] uppercase tracking-wider font-bold text-muted-foreground">Место проведения</span>
                     <span className="text-[14px] font-bold text-foreground mt-0.5 leading-snug">
                        {event.venue || ((event.format === 'online' || event.format === 'онлайн') ? 'Онлайн-платформа' : 'Не указано')}
                     </span>
                  </div>
               </div>

               {/* Date Line */}
               <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-orange-100 dark:bg-orange-950/50 flex flex-shrink-0 items-center justify-center border border-orange-200/50 dark:border-orange-900/50 text-orange-600 dark:text-orange-400">
                     <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col flex-1 leading-tight justify-center">
                     <span className="text-[14px] font-bold text-foreground leading-snug">
                        {formatEventDate(event.start_date)}
                     </span>
                     <span className="text-[14px] font-bold text-foreground leading-snug">
                        {formatEventDate(event.end_date)}
                     </span>
                     <span className="text-[13px] text-muted-foreground mt-0.5">
                        по Московскому времени
                     </span>
                  </div>
               </div>

               {/* Target Audience / Limit Line */}
               <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-purple-100 dark:bg-purple-950/50 flex flex-shrink-0 items-center justify-center border border-purple-200/50 dark:border-purple-900/50 text-purple-600 dark:text-purple-400">
                     <UsersIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col flex-1 leading-tight justify-center">
                     <span className="text-[13px] uppercase tracking-wider font-bold text-muted-foreground">Лимит участников</span>
                     <span className="text-[14px] font-bold text-foreground mt-0.5 leading-snug">
                        {event.users_count || 0} человек
                     </span>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
