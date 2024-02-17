// Entry point to load app

import React from 'react';
import AppNavigator from './src/routes/AppNavigator';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';

const App = () => {
  // Load Google fonts
  let [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return <AppNavigator />;
};

export default App;