import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export function NotFound() {
    return (
        <div className="container py-24 text-center">
            <div className="max-w-md mx-auto">
                <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
                <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
                <p className="text-muted-foreground mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button onClick={() => window.history.back()} variant="outline" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </Button>
                    <Link to="/">
                        <Button className="gap-2 gradient-bg hover:opacity-90">
                            <Home className="w-4 h-4" />
                            Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
