
import React, { Suspense } from 'react';
const Navbar = React.lazy(() => import('./components/Navbar'));
const MainPage = React.lazy(() => import('./pages/MainPage'));
const PostsPage = React.lazy(() => import('./pages/PostsPage'));
const RecipePage = React.lazy(() => import('./pages/RecipePage'));
const PostDetail = React.lazy(() => import('./pages/PostDetail'));

const Footer = React.lazy(() => import('./components/Footer'));
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Spinner from './components/Spinner';

export default function App() {
  return (
    <>
    <Router>
      <Suspense fallback={<Spinner />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} /> 
          <Route path="/tavsiyeler" element={<PostsPage />} /> 
          <Route path="/tarifler" element={<RecipePage />} /> 
          <Route path="/tavsiyeler/:postTitle" element={<PostDetail />} /> {/* Post detail route */}

        </Routes>
        <Footer />
      </Suspense>
    </Router>
    </>
  );
}
