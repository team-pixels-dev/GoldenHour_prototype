import "@expo/metro-runtime";

import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux';

import {store} from './src/store';

import Navigation from "./Navigation";

function App() {

  return (
    // redux setting
    <Navigation/>
  );
}

export default () => {
  return(
    <Provider store={store}>
      <StatusBar style="auto"/>
      <App/>
    </Provider>
  )
}
