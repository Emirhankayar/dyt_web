import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react';
import customTheme from './themes/customTheme'

ReactDOM.createRoot(document.getElementById('root')).render(
<ThemeProvider value={customTheme}>

    <App />
</ThemeProvider>

)
