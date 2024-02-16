// Entry point to load app

import React from 'react';
import AppNavigator from './src/routes/AppNavigator';
import { useFonts, RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

const App = () => {
  // Load Google fonts
  let [fontsLoaded, fontError] = useFonts({
    RobotoCondensed_700Bold,
    Roboto_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return <AppNavigator />;
};

export default App;