import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, Shield, Zap, Brain, ArrowRight, CheckCircle } from "lucide-react"

export function LandingPage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
            {/* Hero Section */}
            <section className="relative flex-1 flex flex-col items-center justify-center py-24 text-center md:py-32 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-100/50 via-background to-background dark:from-violet-950/30" />
                <div className="absolute top-1/4 left-1/4 -z-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 -z-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

                <div className="container flex flex-col items-center gap-6 text-center animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
                        <Zap className="w-4 h-4" />
                        Powered by Polygon Blockchain
                    </div>

                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                        <span className="gradient-text">RentChain</span>
                    </h1>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground/80 max-w-3xl">
                        Smart Rental Agreements on Blockchain
                    </h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg lg:text-xl">
                        Transform your lease into a transparent, self-executing smart contract.
                        Automated payments, AI-powered contract analysis, and decentralized trust.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Link to="/dashboard">
                            <Button size="lg" className="h-14 px-8 text-lg gradient-bg hover:opacity-90 animate-pulse-glow">
                                Get Started
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link to="/create">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2">
                                <Home className="mr-2 w-5 h-5" />
                                I'm a Landlord
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            No middlemen
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Instant payments
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            AI-powered
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container py-20 md:py-32">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold mb-4">Why Choose RentChain?</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Experience the future of rental agreements with blockchain technology
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <FeatureCard
                        icon={<Shield className="w-10 h-10 text-violet-500" />}
                        title="Tamper-Proof Contracts"
                        description="Agreements are stored on the Polygon blockchain, ensuring terms cannot be changed without consensus."
                    />
                    <FeatureCard
                        icon={<Zap className="w-10 h-10 text-violet-500" />}
                        title="Automated Payments"
                        description="Rent is collected automatically via smart contracts. No more chasing payments or lost checks."
                    />
                    <FeatureCard
                        icon={<Brain className="w-10 h-10 text-violet-500" />}
                        title="AI Analysis"
                        description="Our AI explains complex legal terms in plain English, highlighting risks for both parties."
                    />
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y bg-muted/30 py-16">
                <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <StatCard value="100%" label="On-Chain" />
                    <StatCard value="0%" label="Disputes" />
                    <StatCard value="< 1s" label="Transactions" />
                    <StatCard value="24/7" label="Available" />
                </div>
            </section>

            {/* CTA Section */}
            <section className="container py-20 text-center">
                <div className="max-w-2xl mx-auto p-8 rounded-2xl gradient-bg text-white">
                    <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="mb-6 text-white/80">
                        Join the future of rental agreements. Connect your wallet and create your first smart lease today.
                    </p>
                    <Link to="/create">
                        <Button size="lg" variant="secondary" className="h-12 px-8">
                            Create Your First Lease
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl border bg-card card-hover">
            <div className="p-4 rounded-xl bg-violet-100 dark:bg-violet-900/30">
                {icon}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}

function StatCard({ value, label }: { value: string, label: string }) {
    return (
        <div>
            <div className="text-4xl font-bold gradient-text">{value}</div>
            <div className="text-muted-foreground">{label}</div>
        </div>
    )
}
