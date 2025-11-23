'use client'
import HackathonBoard from "@/app/(protected)/events/all/components/hackathon-board"
import { RoleGuard } from "@/components/role-guard"

export default function EventsPage() {
    return (
        // <RoleGuard>
            <HackathonBoard />
        // </RoleGuard>
    )
} 