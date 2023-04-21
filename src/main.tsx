import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AppContextProvider } from './context/AppContext.tsx'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
)
