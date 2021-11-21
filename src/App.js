import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core';
import Switcher from './helpers/Switcher';
import GlobalProvider from './context/GlobalProvider';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#ff8f00',
      light: '#ffc046',
      dark: '#c56000',
    },
    primary: {
      main: '#006064',
      light: '#428e92',
      dark: '#00363a',
    },
    background: 'rgb(255,228,175)',
  },
})

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <GlobalProvider>
        <BrowserRouter>
          <Switcher />
        </BrowserRouter>
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default App;
