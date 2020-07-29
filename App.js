import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import WelcomScreen from './screens/WelcomeScreen'
import {AppTabNavigator} from './components/AppTabNavigator'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {AppDrawNavigator} from './components/AppDrawNavigator'

export default class App extends React.Component {
 render(){
   return(
     <AppContainer/>
   );
 }
}
const SwitchNavigator = createSwitchNavigator({
  WelcomScreen:{screen:WelcomScreen},
  Drawer:{screen:AppDrawNavigator}
})
const AppContainer = createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
