import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAccount } from "wagmi"
import { Plus, FileText, Wallet, TrendingUp, Clock, AlertCircle } from "lucide-react"

export function Dashboard() {
    const { address, isConnected } = useAccount()

    if (!isConnected) {
        return (
            <div className="container py-24 text-center">
                <div className="max-w-md mx-auto">
                    <div className="p-6 rounded-full bg-violet-100 dark:bg-violet-900/30 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                        <Wallet className="w-12 h-12 text-violet-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                    <p className="text-muted-foreground mb-6">
                        Please connect your wallet to view your dashboard and manage your rental agreements.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-10 animate-fade-in">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back, {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                </div>
                <Link to="/create">
                    <Button className="gradient-bg hover:opacity-90">
                        <Plus className="mr-2 w-4 h-4" />
                        Create New Lease
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4 mb-8">
                <StatsCard
                    icon={<FileText className="w-5 h-5" />}
                    title="Active Leases"
                    value="0"
                    description="Currently active"
                />
                <StatsCard
                    icon={<TrendingUp className="w-5 h-5" />}
                    title="Total Rent Collected"
                    value="0 MATIC"
                    description="All time"
                />
                <StatsCard
                    icon={<Clock className="w-5 h-5" />}
                    title="Pending Payments"
                    value="0"
                    description="Awaiting payment"
                />
                <StatsCard
                    icon={<AlertCircle className="w-5 h-5" />}
                    title="Disputes"
                    value="0"
                    description="Open cases"
                />
            </div>

            {/* Main Content */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="card-hover">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-violet-500" />
                            My Leases (Landlord)
                        </CardTitle>
                        <CardDescription>Properties you are renting out</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-8 text-muted-foreground">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p>No leases created yet</p>
                            <Link to="/create">
                                <Button variant="link" className="mt-2">Create your first lease</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card className="card-hover">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-violet-500" />
                            My Rentals (Tenant)
                        </CardTitle>
                        <CardDescription>Properties you are renting</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-8 text-muted-foreground">
                            <Wallet className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p>No active rentals</p>
                            <p className="text-sm mt-2">Sign a lease to get started</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest transactions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <Clock className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>No recent activity</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function StatsCard({ icon, title, value, description }: {
    icon: React.ReactNode,
    title: string,
    value: string,
    description: string
}) {
    return (
        <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="text-violet-500">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}
