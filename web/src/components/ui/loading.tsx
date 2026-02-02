import { Loader2 } from 'lucide-react'

export function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-violet-500 mb-4" />
            <p className="text-muted-foreground">{text}</p>
        </div>
    )
}

export function PageLoader() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <span className="text-white font-bold text-xl">RC</span>
                </div>
                <Loader2 className="w-6 h-6 animate-spin text-violet-500 mx-auto" />
            </div>
        </div>
    )
}
