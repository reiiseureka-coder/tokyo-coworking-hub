import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import FacilityDetailPage from '@/pages/FacilityDetailPage';
import BusinessPage from '@/pages/BusinessPage';
import ReviewPostPage from '@/pages/ReviewPostPage';
import AdminPage from '@/pages/AdminPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import { AuthProvider } from '@/contexts/AuthContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/facility/:id" element={<FacilityDetailPage />} />
              <Route path="/facility/:id/review" element={<ReviewPostPage />} />
              <Route path="/business" element={<BusinessPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
