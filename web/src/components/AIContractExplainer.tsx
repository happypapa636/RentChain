import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Loader2, AlertTriangle, CheckCircle, Info, Sparkles } from "lucide-react"

interface AIContractExplainerProps {
    contractAddress: string
}

export function AIContractExplainer({ contractAddress }: AIContractExplainerProps) {
    const [analysis, setAnalysis] = useState<{
        summary: string
        keyTerms: string[]
        risks: { level: string; text: string }[]
        recommendations: string[]
    } | null>(null)
    const [loading, setLoading] = useState(false)

    const analyzeContract = async () => {
        setLoading(true)
        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 2000))

        setAnalysis({
            summary: "This is a standard 12-month rental agreement between the landlord and tenant. The contract includes provisions for monthly rent payments, security deposit handling, and standard termination clauses. The smart contract automatically handles payment tracking and deposit returns.",
            keyTerms: [
                "Monthly rent: 0.5 MATIC due on the 1st of each month",
                "Security deposit: 1.0 MATIC (refundable upon lease termination)",
                "Lease duration: 12 months with automatic renewal option",
                "Termination: 30-day notice required from either party"
            ],
            risks: [
                { level: "low", text: "Standard market-rate terms with no unusual clauses" },
                { level: "medium", text: "Cryptocurrency volatility may affect real value of payments" },
                { level: "low", text: "Smart contract is verified and follows OpenZeppelin standards" }
            ],
            recommendations: [
                "Consider setting up automatic payments to avoid late fees",
                "Keep records of all transactions for tax purposes",
                "Review the contract terms before the renewal date"
            ]
        })
        setLoading(false)
    }

    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-b">
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-500" />
                    AI Contract Analysis
                </CardTitle>
                <CardDescription>
                    Powered by Gemini AI for smart contract understanding
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                {!analysis ? (
                    <div className="text-center py-8">
                        <Brain className="w-16 h-16 mx-auto mb-4 text-violet-500/50" />
                        <p className="text-muted-foreground mb-4">
                            Let AI analyze this contract and explain it in simple terms
                        </p>
                        <Button
                            onClick={analyzeContract}
                            disabled={loading}
                            className="gradient-bg hover:opacity-90"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Brain className="mr-2 w-4 h-4" />
                                    Analyze Contract
                                </>
                            )}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6 animate-fade-in">
                        <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Info className="w-4 h-4 text-blue-500" />
                                Summary
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">{analysis.summary}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                Key Terms
                            </h4>
                            <ul className="space-y-2">
                                {analysis.keyTerms.map((term, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <span className="text-violet-500">•</span>
                                        <span className="text-muted-foreground">{term}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                Risk Assessment
                            </h4>
                            <div className="space-y-2">
                                {analysis.risks.map((risk, i) => (
                                    <div
                                        key={i}
                                        className={`p-3 rounded-lg text-sm ${risk.level === 'low'
                                                ? 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300'
                                                : risk.level === 'medium'
                                                    ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300'
                                                    : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300'
                                            }`}
                                    >
                                        <span className="font-medium uppercase text-xs">{risk.level} Risk: </span>
                                        {risk.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-violet-500" />
                                Recommendations
                            </h4>
                            <ul className="space-y-2">
                                {analysis.recommendations.map((rec, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <span className="text-violet-500">→</span>
                                        <span className="text-muted-foreground">{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button variant="outline" onClick={() => setAnalysis(null)} className="w-full">
                            Re-analyze Contract
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
