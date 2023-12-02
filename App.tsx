import React from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import { StatusBar } from 'react-native';

const Main = () => (
  <Provider theme={theme}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="dark-content"
      />
    <App />
  </Provider>
);

export default Main;
