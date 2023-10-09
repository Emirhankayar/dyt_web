
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
          <Route path="/iletisim" element={<ContactPage />} /> 
          <Route path="/tavsiyeler" element={<PostsPage />} /> 
          <Route path="/tarifler" element={<RecipePage />} /> 
          <Route path="/tavsiyeler/:postTitle" element={<PostDetail />} /> {/* Post detail route */}
          <Route path="/tarifler/:postTitle" element={<RecipeDetail />} /> {/* Post detail route */}
          <Route path="/404" element={<Error />} /> {/* Post detail route */}
          <Route path="/gizlilikpolitikasi" element={<Error />} /> {/* Post detail route */}

        </Routes>
        <Footer />
      </Suspense>
    </Router>
    </>
  );
}
