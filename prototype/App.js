import "@expo/metro-runtime";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';

import {store} from './src/store';

import Onboard_1 from "./src/screens/Onboard/onboard-1";

import Navigation from "./Navigation";

function App() {

  return (
    // redux setting
    
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <Navigation/>
      </View>
      
  );
}

export default () => {
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
