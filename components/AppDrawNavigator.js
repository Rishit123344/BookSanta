import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu'
import SettingScreen from '../screens/SettingScreen'

export const AppDrawNavigator = createDrawerNavigator({
    Home:{screen:AppTabNavigator},
Setting:{screen:SettingScreen}
},
{
    contentComponent:CustomSideBarMenu
},{intialRouteName:'Home'})