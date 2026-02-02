import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { CreateLease } from './pages/CreateLease'
import { LeaseDetails } from './pages/LeaseDetails'
import { NotFound } from './pages/NotFound'
import { ErrorBoundary } from './components/ErrorBoundary'

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create" element={<CreateLease />} />
                        <Route path="/lease/:id" element={<LeaseDetails />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    )
}

export default App
