import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Button} from 'react-native';
import VisScreen from './visualScreen';
import ListScreen from './listScreen';
import MainScreen from './mainScreen';
import InfoScreen from './infoScreen';

const Stack = createStackNavigator();


function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: { backgroundColor: "#ff8c00" },
          headerTintColor: 'white',
          headerTitleContainerStyle: {icon: 'home', fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
        />
        <Stack.Screen 
          name="List" 
          component={ListScreen} 
        />
        <Stack.Screen 
          name="Info" 
          component={InfoScreen} 
        />
        <Stack.Screen 
          name="Vis" 
          component={VisScreen} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;