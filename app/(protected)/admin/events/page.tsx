"use client";

import { useQuery } from "@tanstack/react-query";
import { apiEvents } from "@/app/api/http/event/events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminEventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = session?.role === "Admin";

  useEffect(() => {
    if (status === "authenticated" && !isAdmin) {
      router.push("/events");
    }
  }, [status, isAdmin, router]);

  const { data, isLoading } = useQuery({
    queryKey: ["admin_events_moderation"],
    queryFn: () => apiEvents.getAllEvents({ event_status: "on_moderation", page_size: 50 }),
    enabled: isAdmin,
  });

  if (status === "loading" || isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const events = data?.events || [];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Модерация мероприятий</h1>
        <p className="text-muted-foreground mt-2">
          Мероприятия, ожидающие проверки администратором.
        </p>
      </div>

      {events.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <CardContent>
            <Clock className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold">Нет мероприятий на модерации</h3>
            <p className="text-sm text-slate-500 max-w-sm mt-2">
              В данный момент все мероприятия проверены. Новые заявки от организаторов появятся здесь.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden flex flex-col">
              {event.image_url && (
                <div className="h-40 w-full bg-slate-100 overflow-hidden relative">
                  <img 
                    src={event.image_url} 
                    alt={event.event_name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-orange-500 hover:bg-orange-600">На модерации</Badge>
                  </div>
                </div>
              )}
              <CardHeader className={!event.image_url ? "relative" : ""}>
                {!event.image_url && (
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-orange-500 hover:bg-orange-600">На модерации</Badge>
                  </div>
                )}
                <CardTitle className="text-xl line-clamp-1 pr-24" title={event.event_name}>
                  {event.event_name}
                </CardTitle>
                <div className="flex flex-wrap gap-2 text-sm text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(event.start_date).toLocaleDateString('ru-RU')}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.venue}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                  {event.description}
                </p>
                <Link href={`/events/dashboard/${event.id}`}>
                  <Button className="w-full gap-2">
                    Перейти к проверке
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
