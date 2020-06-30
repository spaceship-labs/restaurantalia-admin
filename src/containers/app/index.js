import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import Theme from '../../theme/theme';
import store from '../../store';

import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
