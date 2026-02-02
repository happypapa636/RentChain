import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, User, Coins, Calendar, Shield, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react"
import { AIContractExplainer } from "@/components/AIContractExplainer"

export function LeaseDetails() {
    const { id } = useParams()

    // Mock data for demo
    const lease = {
        address: id || "0x...",
        landlord: "0x1234...5678",
        tenant: "0xabcd...efgh",
        rent: "0.5",
        deposit: "1.0",
        duration: "12",
        startDate: "Jan 1, 2024",
        endDate: "Dec 31, 2024",
        state: "Active",
        ipfsHash: "QmMockHash123456",
        totalPaid: "2.0",
        nextPaymentDue: "Feb 1, 2024"
    }

    return (
        <div className="container py-10 animate-fade-in">
            <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold">Lease Agreement</h1>
                        <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {lease.state}
                        </span>
                    </div>
                    <p className="text-muted-foreground font-mono text-sm">{lease.address}</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View on Explorer
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-violet-500" />
                                Contract Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <InfoItem icon={<User />} label="Landlord" value={lease.landlord} />
                                <InfoItem icon={<User />} label="Tenant" value={lease.tenant} />
                                <InfoItem icon={<Coins />} label="Monthly Rent" value={`${lease.rent} MATIC`} />
                                <InfoItem icon={<Shield />} label="Security Deposit" value={`${lease.deposit} MATIC`} />
                                <InfoItem icon={<Calendar />} label="Start Date" value={lease.startDate} />
                                <InfoItem icon={<Calendar />} label="End Date" value={lease.endDate} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Analysis */}
                    <AIContractExplainer contractAddress={lease.address} />
                </div>

                {/* Side Panel */}
                <div className="space-y-6">
                    <Card className="border-2 border-violet-200 dark:border-violet-900">
                        <CardHeader>
                            <CardTitle className="text-lg">Payment Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Total Paid</span>
                                <span className="font-bold text-lg">{lease.totalPaid} MATIC</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Next Due</span>
                                <span className="font-medium">{lease.nextPaymentDue}</span>
                            </div>
                            <Button className="w-full gradient-bg hover:opacity-90">
                                <Coins className="w-4 h-4 mr-2" />
                                Pay Rent ({lease.rent} MATIC)
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                Request Maintenance
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                View Payment History
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                                Dispute Claim
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-muted text-violet-500">
                {icon}
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium font-mono text-sm">{value}</p>
            </div>
        </div>
    )
}
