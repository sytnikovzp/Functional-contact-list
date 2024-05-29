import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import store from './store';
import App from './App.jsx';
import './index.css';

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: '#DBD9DB',
  //     light: '#D6C8E1',
  //     dark: '#82A285',
  //   },
  // },
  // typography: {
    // fontSize: 25,
  // },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
