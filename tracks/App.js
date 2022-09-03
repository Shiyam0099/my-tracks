import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider} from './src/context/LocationContext'
import {setNavigator} from './navigationRef';
import BlankScreen from "./src/screens/BlankScreen";

const switchNavigator = createSwitchNavigator({
  Blank: BlankScreen,
  loginFlow: createStackNavigator({
    Signup : SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen
    }),
    Create: TrackCreateScreen,
    Account: AccountScreen
  })
})

const App =  createAppContainer(switchNavigator);

export default ()=>{
  return (
  <LocationProvider>

  <AuthProvider>
    <App ref={(navigator)=>setNavigator(navigator)}/>
  </AuthProvider>

  </LocationProvider>
  )
}
