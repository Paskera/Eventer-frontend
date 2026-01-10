"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusIcon, UsersIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import CreateTeamForm from "./components/create-team-form"
import TeamsList from "./components/teams-list"

export default function TeamsPage() {
    const [activeTab, setActiveTab] = useState("teams")
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">Команды</h1>
                <p className="text-muted-foreground">Управляйте своими командами и участвуйте в мероприятиях</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="w-full sm:w-auto">
                        <TabsList className="inline-flex bg-gray-100 dark:bg-neutral-800 p-1 rounded-lg border border-gray-200 dark:border-neutral-700">
                            <TabsTrigger
                                value="teams"
                                className="flex items-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:font-bold data-[state=active]:shadow-none dark:data-[state=active]:bg-neutral-900 dark:data-[state=active]:text-slate-100 data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground"
                            >
                                <UsersIcon className="w-4 h-4" />
                                <span className="truncate">Мои команды</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="create"
                                className="flex items-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:font-bold data-[state=active]:shadow-none dark:data-[state=active]:bg-neutral-900 dark:data-[state=active]:text-slate-100 data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground"
                            >
                                <PlusIcon className="w-4 h-4" />
                                <span className="truncate">Создать команду</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    {activeTab === "teams" && (
                        <div className="relative w-full sm:w-80">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Поиск команд..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    )}
                </div>

                <TabsContent value="teams" className="space-y-6">
                    <TeamsList searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="create" className="space-y-6">
                    <CreateTeamForm onTeamCreated={() => setActiveTab("teams")} />
                </TabsContent>
            </Tabs>
        </div>
    )
} 