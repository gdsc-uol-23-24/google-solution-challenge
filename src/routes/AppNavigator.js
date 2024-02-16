import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LiteracyAssessmentScreen from '../screens/LiteracyAssessmentScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name='Splash'
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'App name',
            headerStyle: {
              backgroundColor: '#3652AD',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              //
            },
          }}
          />
        <Stack.Screen
          name='Assessment'
          component={LiteracyAssessmentScreen}
          options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;