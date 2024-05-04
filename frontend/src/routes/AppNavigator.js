import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ResourceScreen1 from '../screens/ResourceScreen1';
import ResourceScreen2 from '../screens/ResourceScreen2';
import LiteracyAssessmentScreen from '../screens/LiteracyAssessmentScreen';
import Results from '../screens/Results';
import AppHeader from '../components/AppHeader';

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
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: '#A4BBF4',
            },
            headerTitle: () => <AppHeader title={route.name} />,
          })}
        />
        <Stack.Screen
          name='Literacy Assessment'
          component={HomeScreen}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: '#A4BBF4',
            },
            headerTitle: () => <AppHeader title={route.name} />,
          })}
        />
        <Stack.Screen
          name='Resource 1'
          component={ResourceScreen1}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: '#A4BBF4',
            },
            headerTitle: () => <AppHeader title={route.name} />,
          })}
        />
        <Stack.Screen
          name='Resource 2'
          component={ResourceScreen2}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: '#A4BBF4',
            },
            headerTitle: () => <AppHeader title={route.name} />,
          })}
        />
        <Stack.Screen
          name='Results'
          component={Results}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: '#A4BBF4',
            },
            headerTitle: () => <AppHeader title={route.name} />,
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;