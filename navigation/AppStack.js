import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TaskPage from '../screens/TaskPage';
import HomeScreen from '../screens/HomeScreen';
import GetTaskData from '../firestore/GetTaskData';
import EditTask from '../firestore/EditTask.js';
import MainScreen from '../screens/MainScreen';
import CategorieScreen from '../screens/CategorieScreen';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Task"
        component={TaskPage}
        // options={{
        //   title: 'TODO LIST CATEGORIES',
        //   headerStyle: {
        //     backgroundColor: '#25ced1',
        //     shadowColor: 'white',
        //     elevation: 0,
        //   },
        //   headerTitleStyle: {
        //     color: '#FFFFFF',
        //     fontWeight: 'bold',
        //     fontSize: 22,
        //   },
        //   headerTitleAlign: 'center',
        // }}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="GetTaskData"
        component={GetTaskData}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Home Page"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="CategorieS"
        component={CategorieScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTask}
        options={{ header: () => null }}
      />

    </Stack.Navigator>



  );
}

export default AppStack;



