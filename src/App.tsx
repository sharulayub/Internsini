import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DetailsPage } from './pages/DetailsPage';
import { AdminPage } from './pages/AdminPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { MainLayout } from './layouts/MainLayout';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/internship/:id" element={<DetailsPage />} />
          <Route path="/internship/:id/apply" element={<ApplicationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;