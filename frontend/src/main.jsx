import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="925915689396-jvee30k7ej3ed4m9qriqp42ensj3tlqh.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>

  </React.StrictMode >,
)
