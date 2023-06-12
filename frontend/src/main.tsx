import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './styles/main.scss'
import { HashRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <SnackbarProvider autoHideDuration={4000}>
        <App />
      </SnackbarProvider>
    </HashRouter>
  </React.StrictMode>,
)
