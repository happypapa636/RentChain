import { Link, Outlet, useLocation } from "react-router-dom"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, LayoutDashboard, PlusCircle, Wallet, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

export function Layout() {
    const location = useLocation()
    const account = useAccount()
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleConnect = () => {
        const connector = connectors[0]
        if (connector) connect({ connector })
    }

    const navItems = [
        { path: "/", label: "Home", icon: Home },
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/create", label: "Create Lease", icon: PlusCircle },
    ]

    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">RC</span>
                            </div>
                            <span className="font-bold text-xl hidden sm:inline-block">
                                RentChain
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = location.pathname === item.path
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                            isActive
                                                ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        {account.status === 'connected' ? (
                            <div className="flex items-center gap-2">
                                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
                                </div>
                                <Button
                                    onClick={() => disconnect()}
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <Button onClick={handleConnect} className="gradient-bg hover:opacity-90">
                                <Wallet className="mr-2 w-4 h-4" />
                                Connect
                            </Button>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t bg-background p-4 animate-slide-in">
                        <nav className="flex flex-col space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = location.pathname === item.path
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                            isActive
                                                ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        )}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                )}
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="border-t py-8 mt-16">
                <div className="container text-center text-sm text-muted-foreground">
                    <p>© 2024 RentChain. Built on Polygon.</p>
                </div>
            </footer>
        </div>
    )
}
