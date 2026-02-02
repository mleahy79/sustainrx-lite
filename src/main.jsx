import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AudioFeedbackProvider } from './context/AudioFeedbackContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <AudioFeedbackProvider>
          <App />
        </AudioFeedbackProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)
