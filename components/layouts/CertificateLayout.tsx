import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"

interface CertificateLayoutProps {
  children: ReactNode
  pageTitle: string
}

export default function CertificateLayout({
  children,
  pageTitle,
}: CertificateLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-foreground">
              {pageTitle}
            </h1>
          </div>
        </div>
        <div className="border-t border-border px-6 py-2 text-sm text-muted-foreground">
          Home <ChevronRight className="inline h-4 w-4" /> Events{" "}
          <ChevronRight className="inline h-4 w-4" /> Tech Summit 2024{" "}
          <ChevronRight className="inline h-4 w-4" /> Certificates
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto p-6">{children}</div>
    </div>
  )
}