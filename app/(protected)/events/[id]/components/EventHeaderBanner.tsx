"use client"
import Image from "next/image"
import { StatusBadge, FormatBadge } from "./Badges"

interface EventHeaderBannerProps {
  event: any;
}

export const EventHeaderBanner = ({ event }: EventHeaderBannerProps) => {
  return (
    <div className="relative h-[300px] md:h-[400px] w-full rounded-md overflow-hidden shadow-sm group">
      <Image
        src={event.image_url || "/placeholder.svg"}
        alt={event.event_name || "Изображение мероприятия"}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = "/placeholder.svg"
        }}
      />
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 pointer-events-none">
        <div className="flex flex-wrap items-center gap-3 mb-4 pointer-events-auto">
          <StatusBadge status={event.event_status} />
          <FormatBadge format={event.format} />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-md max-w-4xl tracking-tight">
          {event.event_name}
        </h1>
      </div>
    </div>
  )
}
