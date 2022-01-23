// import React from 'react';
import React, {useState , useContext} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TaskPage from './TaskPage';
import CategoriesScreen from "./CategoriesScreen";
import ThemeScreen from './ThemeScreen';

import themeContext from '../config/themeContext';

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(themeContext);

  return (
    <Tab.Navigator
      initialRouteName='Main'
      
      tabBarOptions={{
        activeTintColor: theme.fontColor,
        activeBackgroundColor: theme.hudColor,
        inactiveBackgroundColor: theme.hudColor,
        labelStyle: {
          fontSize: 14,
          paddingBottom: 7,
          color: theme.fontColor,
        },
        style: {
          height: 67 + insets.bottom,
          paddingTop: 0.5,
        },
      }}
    >
      <Tab.Screen
        name='Task'
        component={TaskPage}
        options={{
          tabBarLabel: 'Task',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Categories'
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="category" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='ThemeScreen'
        component={ThemeScreen}
        options={{
          tabBarLabel: 'Theme',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="theme-light-dark" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
};

export default MainScreen;