import { Badge } from "@/components/ui/badge"

export const StatusBadge = ({ status }: { status: string }) => {
    const lower = status?.toLowerCase() || '';
    
    let displayStatus = status;
    if (lower === 'active' || lower === 'активный') displayStatus = 'Активно';
    else if (lower === 'upcoming' || lower === 'предстоящий' || lower === 'скоро') displayStatus = 'Скоро';
    else if (lower === 'completed' || lower === 'closed' || lower === 'завершен' || lower === 'завершено') displayStatus = 'Завершено';

    if (lower === 'active' || lower === 'активный') {
      return <Badge className="text-[13px] leading-none h-[28px] px-3 py-0 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-500/20 dark:text-green-400 border border-green-200 dark:border-green-500/30 shadow-none font-medium rounded-md">{displayStatus}</Badge>
    }
    if (lower === 'upcoming' || lower === 'предстоящий' || lower === 'скоро') {
      return <Badge className="text-[13px] leading-none h-[28px] px-3 py-0 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 shadow-none font-medium rounded-md">{displayStatus}</Badge>
    }
    if (lower === 'completed' || lower === 'closed' || lower === 'завершен' || lower === 'завершено') {
      return <Badge className="text-[13px] leading-none h-[28px] px-3 py-0 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-none font-medium rounded-md">{displayStatus}</Badge>
    }
    return <Badge variant="secondary" className="text-[13px] leading-none h-[28px] px-3 py-0 shadow-none font-medium rounded-md">{displayStatus}</Badge>
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
