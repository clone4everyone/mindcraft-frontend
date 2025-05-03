import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" >
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </ClerkProvider>
  </StrictMode>,
)