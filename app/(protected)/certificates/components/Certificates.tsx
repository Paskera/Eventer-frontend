import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

interface Certificate {
    id: number;
    title: string;
    description: string;
    date: string;
    type: string;
}

interface CertificatesProps {
    certificates: Certificate[];
}

const typeLabel: Record<string, string> = {
    participation: 'Участие',
    completion: 'Курс',
    achievement: 'Достижение',
}

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {certificates.map((cert) => (
                <Card 
                    key={cert.id} 
                    className="relative h-full overflow-hidden border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)] group"
                >
                    <CardContent className="p-5 flex flex-col gap-4 h-full">
                        {/* Preview */}
                        <div className="relative aspect-[16/10] w-full rounded-lg border border-white/10 bg-gradient-to-br from-indigo-900/30 via-slate-800/40 to-emerald-800/30 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
                            <div className="relative text-sm text-white/70 font-medium">Превью сертификата</div>
                        </div>
                        
                        {/* Info */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base font-bold text-foreground truncate group-hover:text-emerald-400 transition-colors" title={cert.title}>
                                    {cert.title}
                                </h3>
                                <p className="text-xs text-foreground/70 font-medium truncate mt-1" title={cert.date}>
                                    {cert.date}
                                </p>
                            </div>
                            <Badge 
                                variant="secondary" 
                                className="shrink-0 bg-white/90 text-slate-900 font-semibold border-0"
                            >
                                {typeLabel[cert.type] ?? cert.type}
                            </Badge>
                        </div>
                        
                        <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
                            {cert.description}
                        </p>
                        
                        {/* Actions */}
                        <div className="flex justify-end mt-auto pt-2">
                            <Button
                                className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={() => window.open('#', '_blank')}
                            >
                                <Download className="h-4 w-4" />
                                Скачать
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Certificates; 