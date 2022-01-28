import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/store';
import React from 'react';

AppRegistry.registerComponent(appName, () => ReduxApp);

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
