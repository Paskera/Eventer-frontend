import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Archive } from "lucide-react"

export const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'active':
            return <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border-none"><CheckCircle2 className="w-3 h-3 mr-1" />Опубликовано</Badge>
        case 'waiting':
            return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 border-none"><Clock className="w-3 h-3 mr-1" />Черновик</Badge>
        case 'closed':
            return <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-none"><CheckCircle2 className="w-3 h-3 mr-1" />Завершено</Badge>
        case 'archived':
            return <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-none"><Archive className="w-3 h-3 mr-1" />В архиве</Badge>
        case 'on_moderation':
            return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 border-none"><Clock className="w-3 h-3 mr-1" />На модерации</Badge>
        case 'rejected':
            return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 border-none"><Clock className="w-3 h-3 mr-1" />Отклонено</Badge>
        default:
            return <Badge variant="secondary" className="border-none">{status}</Badge>
    }
}

export const FormatBadge = ({ format }: { format: string }) => {
    const lower = format?.toLowerCase() || '';
    
    let displayFormat = format;
    if (lower === 'online' || lower === 'онлайн') displayFormat = 'Онлайн';
    else if (lower === 'offline' || lower === 'офлайн') displayFormat = 'Офлайн';
    else if (lower === 'hybrid' || lower === 'гибрид') displayFormat = 'Гибрид';

    if (lower === 'online' || lower === 'онлайн') {
      return <Badge variant="outline" className="text-[13px] leading-none h-[28px] px-3 py-0 border-blue-300 text-blue-700 bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:bg-blue-900/30 shadow-none font-medium rounded-md">{displayFormat}</Badge>
    }
    if (lower === 'offline' || lower === 'офлайн') {
      return <Badge variant="outline" className="text-[13px] leading-none h-[28px] px-3 py-0 border-purple-300 text-purple-700 bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:bg-purple-900/30 shadow-none font-medium rounded-md">{displayFormat}</Badge>
    }
    if (lower === 'hybrid' || lower === 'гибрид') {
      return <Badge variant="outline" className="text-[13px] leading-none h-[28px] px-3 py-0 border-orange-300 text-orange-700 bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:bg-orange-900/30 shadow-none font-medium rounded-md">{displayFormat}</Badge>
    }
    return <Badge variant="outline" className="text-[13px] leading-none h-[28px] px-3 py-0 shadow-none font-medium rounded-md">{displayFormat}</Badge>
}
