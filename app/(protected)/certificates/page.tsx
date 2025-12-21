'use client'

import { useMemo, useState } from 'react'
import Certificates from '@/app/(protected)/certificates/components/Certificates'
import { certificates } from './data'
import { SearchBar } from './components/SearchBar'
import { RoleGuard } from "@/components/role-guard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"

const TABS = [
    { id: 'all', label: 'Все' },
    { id: 'participation', label: 'Участие' },
    { id: 'completion', label: 'Курс' },
    { id: 'achievement', label: 'Достижения' },
]

export default function CertificatesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeType, setActiveType] = useState<string>('all')

    const filteredCertificates = useMemo(() => {
        return certificates.filter(cert => {
            const matchesType = activeType === 'all' || cert.type === activeType
            const query = searchQuery.toLowerCase()
            const matchesQuery = cert.title.toLowerCase().includes(query) || cert.description.toLowerCase().includes(query)
            return matchesType && matchesQuery
        })
    }, [searchQuery, activeType])

    return (
        <RoleGuard>
            <div className="min-h-screen bg-background p-4 sm:p-6 space-y-6">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-900/80 via-slate-900/70 to-emerald-800/70 p-6 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.15),transparent_40%)] blur-2xl" />
                        <div className="relative flex flex-col gap-3">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-white/70">
                                        <Award className="h-4 w-4" />
                                        Сертификаты
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-bold">Ваши достижения и сертификаты</h1>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge className="bg-white/15 border-white/25 text-white">Всего: {certificates.length}</Badge>
                                        <Badge className="bg-white/15 border-white/25 text-white">Найдено: {filteredCertificates.length}</Badge>
                                    </div>
                                </div>
                                <a href="/certificates/create">
                                    <Button className="bg-white/15 hover:bg-white/25 text-white border-white/25">
                                        Создать сертификат
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
                        <div className="flex flex-wrap gap-2">
                            {TABS.map(tab => (
                                <Button
                                    key={tab.id}
                                    variant={activeType === tab.id ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setActiveType(tab.id)}
                                >
                                    {tab.label}
                                </Button>
                            ))}
                        </div>
                        <div className="w-full md:w-[360px]">
                            <SearchBar
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                            />
                        </div>
                    </div>

                    <Certificates certificates={filteredCertificates} />
                </div>
            </div>
        </RoleGuard>
    )
}