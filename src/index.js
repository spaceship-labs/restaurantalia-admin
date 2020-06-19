import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import Theme from './theme/theme';
import store from './store';
import history from './history';

import './theme/layout.css';

// containers
import HomeContainer from './containers/home';
import LoginContainer from './containers/login';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/login" component={LoginContainer} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

const rootElement = document.getElementById('app');
ReactDOM.render(<App />, rootElement);
