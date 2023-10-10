
import React, { Suspense } from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import customTheme from './themes/customTheme'
const Navbar = React.lazy(() => import('./components/Navbar'));
const MainPage = React.lazy(() => import('./pages/MainPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const PostsPage = React.lazy(() => import('./pages/PostsPage'));
const RecipePage = React.lazy(() => import('./pages/RecipePage'));
const PostDetail = React.lazy(() => import('./pages/PostDetail'));
const RecipeDetail = React.lazy(() => import('./pages/RecipeDetail'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));
const Footer = React.lazy(() => import('./components/Footer'));

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Spinner from './components/Spinner';

export default function App() {
  return (
    <>
    <ThemeProvider value={customTheme}>
    <Router>
      <Suspense fallback={<Spinner />}>
        <Navbar />


        <Routes>

          <Route path="/" element={<MainPage />} /> 
          <Route path="/iletisim" element={<ContactPage />} /> 
          
          <Route path="/tavsiyeler" element={<PostsPage />} /> 
          <Route path="/tarifler" element={<RecipePage />} /> 
          
          <Route path="/tavsiyeler/:postTitle" element={<PostDetail />} />
          <Route path="/tarifler/:postTitle" element={<RecipeDetail />} /> 

          <Route path='/*' element={<PageNotFound />} />

        </Routes>

        <Footer />
      </Suspense>

    </Router>
    </ThemeProvider>
    </>
  );
}
