import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LiteracyAssessmentScreen from '../screens/LiteracyAssessmentScreen';
import ResultsScreen from '../screens/ResultsScreen'; // Import the ResultsScreen
import AppHeader from '../components/AppHeader';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name='Splash'
          component={SplashScreen}
          options={{ headerShown: false }}
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
          component={LiteracyAssessmentScreen}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: '#A4BBF4',
            },
            headerTitle: () => <AppHeader title={route.name} />,
          })}
        />
        {/* Add the ResultsScreen to the navigator */}
        <Stack.Screen
          name='Results'
          component={ResultsScreen}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: '#A4BBF4',
            },
            headerTitle: () => <AppHeader title="Results" />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
