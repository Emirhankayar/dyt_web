
import React, { Suspense } from 'react';
const Navbar = React.lazy(() => import('./components/Navbar'));
const MainPage = React.lazy(() => import('./pages/MainPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const PostsPage = React.lazy(() => import('./pages/PostsPage'));
const RecipePage = React.lazy(() => import('./pages/RecipePage'));
const PostDetail = React.lazy(() => import('./pages/PostDetail'));
const RecipeDetail = React.lazy(() => import('./pages/RecipeDetail'));
const Error = React.lazy(() => import('./pages/Error'));
const Footer = React.lazy(() => import('./components/Footer'));
const ErrorBoundary = React.lazy(() => import('./utils/ErrorBoundary'))

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Spinner from './components/Spinner';

export default function App() {
  return (
    <>
<Router>
  <Suspense fallback={<Spinner />}>
    <Navbar />
    <Routes>
      {/* Wrap each route with ErrorBoundary */}
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <MainPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/iletisim"
        element={
          <ErrorBoundary>
            <ContactPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/tavsiyeler"
        element={
          <ErrorBoundary>
            <PostsPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/tarifler"
        element={
          <ErrorBoundary>
            <RecipePage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/tavsiyeler/:postTitle"
        element={
          <ErrorBoundary>
            <PostDetail />
          </ErrorBoundary>
        }
      />
      <Route
        path="/tarifler/:postTitle"
        element={
          <ErrorBoundary>
            <RecipeDetail />
          </ErrorBoundary>
        }
      />
      <Route
        path="/404"
        element={
          <ErrorBoundary>
            <Error />
          </ErrorBoundary>
        }
      />
    </Routes>
    <Footer />
  </Suspense>
</Router>

    </>
  );
}
