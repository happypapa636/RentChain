import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { CreateLease } from './pages/CreateLease'
import { LeaseDetails } from './pages/LeaseDetails'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/create" element={<CreateLease />} />
                    <Route path="/lease/:id" element={<LeaseDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
