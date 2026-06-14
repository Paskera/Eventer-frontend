"use client"

import { useState } from "react"
import { Copy, Cpu, Shield, Edit3, Save, X, Calendar, User as UserIcon } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { apiUsers, type TopCategoriesResponse } from "@/app/api/http/users/users"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProfileCard() {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)

  // Fetch full profile data
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => apiUsers.getProfile(),
  })

  const { data: categories, isPending: isCategoriesPending } = useQuery<TopCategoriesResponse>({
    queryKey: ["top-categories"],
    queryFn: () => apiUsers.getTopCategories(),
  })

  // Form State
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    birth_date: "",
    role: ""
  })

  const handleEditClick = () => {
    if (profile) {
      setFormData({
        firstname: profile.firstname || "",
        lastname: profile.lastname || "",
        gender: profile.gender || "",
        birth_date: profile.birth_date || "",
        role: profile.role || "",
      })
    }
    setIsEditing(true)
  }

  const updateProfileMutation = useMutation({
    mutationFn: (data: { id: number; formData: any }) => apiUsers.updateProfile(data.id, data.formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
      toast.success("Профиль обновлен", {
        description: "Ваши данные успешно сохранены.",
      })
      setIsEditing(false)
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail
      toast.error("Ошибка обновления", {
        description: typeof detail === "string" ? detail : "Не удалось сохранить изменения.",
      })
    },
  })

  const handleSave = () => {
    if (profile?.id) {
      updateProfileMutation.mutate({ id: profile.id, formData })
    }
  }

  const handleCopyId = () => {
    if (!session?.user_id) return
    navigator.clipboard.writeText(session.user_id)
    toast.success("ID скопирован")
  }

  if (!session || isProfileLoading) {
    return (
      <Card className="bg-card border-border animate-pulse">
        <CardContent className="p-10 flex flex-col items-center gap-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative overflow-hidden bg-gray-50 dark:bg-neutral-800/50 p-6 sm:p-8 border-b border-gray-200 dark:border-neutral-800">
        <div className="relative flex flex-col sm:flex-row gap-6 sm:items-center">
          <div className="relative group">
            <Avatar className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white dark:border-neutral-900 shadow-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.firstname || session.user?.name || "")}+${encodeURIComponent(profile?.lastname || "")}&background=16A34A&color=fff`}
                alt="Аватар профиля"
              />
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-2 border-2 border-white dark:border-neutral-900 shadow-lg">
              <Shield className="h-4 w-4 text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  {profile ? `${profile.firstname} ${profile.lastname}` : session.user?.name || "Пользователь"}
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Badge variant="outline" className="bg-green-600/10 text-green-600 border-green-600/20 font-bold uppercase tracking-wider text-[10px]">
                    {session.role || "Участник"}
                  </Badge>
                  <span className="text-xs font-medium opacity-60">•</span>
                  <span className="text-xs font-medium">{session.user?.email}</span>
                </div>
              </div>

              {!isEditing ? (
                <Button
                  onClick={handleEditClick}
                  variant="outline"
                  className="gap-2 border-green-600/20 hover:bg-green-600/5 text-green-600 font-bold"
                >
                  <Edit3 className="h-4 w-4" />
                  Редактировать
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="ghost"
                    className="gap-2 text-slate-500 font-bold"
                  >
                    <X className="h-4 w-4" />
                    Отмена
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={updateProfileMutation.isPending}
                    className="gap-2 bg-green-600 hover:bg-green-700 text-white font-bold"
                  >
                    <Save className="h-4 w-4" />
                    {updateProfileMutation.isPending ? "Сохранение..." : "Сохранить"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6 sm:p-8">
        {isEditing ? (
          <div className="grid gap-6 py-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Имя</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    value={formData.firstname}
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                    className="pl-10 focus-visible:ring-green-600"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Фамилия</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    className="pl-10 focus-visible:ring-green-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Дата рождения</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                  <Input
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                    className="pl-10 focus-visible:ring-green-600"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Пол</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(val) => setFormData({ ...formData, gender: val })}
                >
                  <SelectTrigger className="focus:ring-green-600">
                    <SelectValue placeholder="Выберите пол" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Мужской</SelectItem>
                    <SelectItem value="female">Женский</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Display Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Дата рождения</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-green-600" />
                  {profile?.birth_date || "Не указана"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Пол</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {profile?.gender === "male" ? "Мужской" : profile?.gender === "female" ? "Женский" : "Не указан"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">ID Пользователя</p>
                <button onClick={handleCopyId} className="text-sm font-mono text-slate-500 hover:text-green-600 transition-colors flex items-center gap-1">
                  {session.user_id?.substring(0, 8)}... <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="space-y-5 pt-4 border-t border-gray-100 dark:border-neutral-800">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Достижения по категориям</h3>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {isCategoriesPending ? (
                  Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
                ) : categories?.["top-categories"]?.length ? (
                  categories["top-categories"].map((stat, index) => (
                    <div
                      key={index}
                      className="group rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/30 p-5 hover:border-green-600/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/5 cursor-default"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 group-hover:text-green-600 transition-colors">
                        {stat.category.name}
                      </p>
                      <p className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
                        {stat.count}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="sm:col-span-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-neutral-800 p-8 text-center bg-gray-50/50 dark:bg-neutral-800/10">
                    <p className="text-sm font-medium text-muted-foreground">Здесь появятся ваши первые победы</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
