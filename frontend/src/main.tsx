import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './styles/main.scss'
import { HashRouter } from "react-router-dom";
import { SnackbarKey, SnackbarProvider, closeSnackbar } from 'notistack';
import { Button } from '@mui/material';

const dismissSnackbarAction = (snackbarId: SnackbarKey) => (
  <Button sx={{color: 'white', fontSize: '0.8rem'}} onClick={() => { closeSnackbar(snackbarId) }}>
    Fechar
  </Button>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <SnackbarProvider autoHideDuration={4000} action={dismissSnackbarAction}>
        <App />
      </SnackbarProvider>
    </HashRouter>
  </React.StrictMode>,
)
