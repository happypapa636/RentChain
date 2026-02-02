import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { polygonAmoy, hardhat } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected } from 'wagmi/connectors'
import App from './App.tsx'
import './index.css'

const config = createConfig({
    chains: [polygonAmoy, hardhat],
    connectors: [injected()],
    transports: {
        [polygonAmoy.id]: http(),
        [hardhat.id]: http('http://127.0.0.1:8545'),
    },
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>,
)
