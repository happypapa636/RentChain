import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRentChainFactory } from "@/hooks/useRentChain"
import { Loader2, CheckCircle, FileText, Coins, Calendar, ScrollText, ArrowLeft } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { useAccount } from "wagmi"

export function CreateLease() {
    const navigate = useNavigate()
    const { isConnected } = useAccount()
    const { createLease, isPending, isConfirming, isConfirmed, hash, error } = useRentChainFactory()

    const [formData, setFormData] = useState({
        rent: "",
        deposit: "",
        duration: "12",
        terms: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const ipfsHash = "QmMockHash" + Date.now()
        createLease(formData.rent, formData.deposit, Number(formData.duration), ipfsHash)
    }

    if (!isConnected) {
        return (
            <div className="container py-24 text-center">
                <p className="text-xl">Please connect your wallet to create a lease.</p>
            </div>
        )
    }

    if (isConfirmed) {
        return (
            <div className="container py-20 max-w-md text-center animate-fade-in">
                <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                    <CardHeader>
                        <div className="mx-auto p-4 rounded-full bg-green-100 dark:bg-green-900/30 w-20 h-20 flex items-center justify-center mb-4">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <CardTitle className="text-green-600 text-2xl">Lease Created!</CardTitle>
                        <CardDescription>Your smart contract has been deployed</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 bg-muted rounded-lg text-sm font-mono break-all">
                            Tx: {hash?.slice(0, 20)}...
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => navigate('/dashboard')} className="flex-1 gradient-bg">
                                Go to Dashboard
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container py-10 max-w-2xl animate-fade-in">
            <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
            </Link>

            <Card className="border-2">
                <CardHeader className="border-b bg-muted/30">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-900/30">
                            <ScrollText className="w-6 h-6 text-violet-500" />
                        </div>
                        <div>
                            <CardTitle>Create Rental Agreement</CardTitle>
                            <CardDescription>Deploy a smart contract for your lease</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Coins className="w-4 h-4 text-violet-500" />
                                    Monthly Rent (MATIC)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    className="flex h-12 w-full rounded-lg border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background focus:border-violet-500 focus:outline-none transition-colors"
                                    placeholder="0.00"
                                    value={formData.rent}
                                    onChange={e => setFormData({ ...formData, rent: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Coins className="w-4 h-4 text-violet-500" />
                                    Security Deposit (MATIC)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    className="flex h-12 w-full rounded-lg border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background focus:border-violet-500 focus:outline-none transition-colors"
                                    placeholder="0.00"
                                    value={formData.deposit}
                                    onChange={e => setFormData({ ...formData, deposit: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-violet-500" />
                                Lease Duration (Months)
                            </label>
                            <select
                                required
                                className="flex h-12 w-full rounded-lg border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background focus:border-violet-500 focus:outline-none transition-colors"
                                value={formData.duration}
                                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                            >
                                <option value="6">6 Months</option>
                                <option value="12">12 Months</option>
                                <option value="24">24 Months</option>
                                <option value="36">36 Months</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <FileText className="w-4 h-4 text-violet-500" />
                                Contract Terms
                            </label>
                            <textarea
                                required
                                rows={5}
                                className="flex w-full rounded-lg border-2 border-input bg-background px-4 py-3 text-sm ring-offset-background focus:border-violet-500 focus:outline-none transition-colors resize-none"
                                placeholder="Enter the full terms and conditions of your rental agreement..."
                                value={formData.terms}
                                onChange={e => setFormData({ ...formData, terms: e.target.value })}
                            />
                            <p className="text-xs text-muted-foreground">
                                This will be stored on IPFS and linked to your smart contract
                            </p>
                        </div>

                        {error && (
                            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 text-red-600 text-sm">
                                Error: {(error as any).shortMessage || error.message}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-14 text-lg gradient-bg hover:opacity-90"
                            disabled={isPending || isConfirming}
                        >
                            {isPending || isConfirming ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    {isConfirming ? "Confirming Transaction..." : "Waiting for Wallet..."}
                                </>
                            ) : (
                                <>
                                    <ScrollText className="mr-2 w-5 h-5" />
                                    Create & Deploy Contract
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
