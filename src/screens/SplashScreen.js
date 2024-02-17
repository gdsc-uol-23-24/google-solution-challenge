import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheet/styles';

const SplashScreen = ({ navigation }) => {
  const navigateToHome = () => {
    // Navigate to the Home screen
    navigation.replace('Home');
  };
  
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/allwrite.png')} style={styles.logoLarge} />
      <Text style={styles.h1}>Welcome to AllWrite.</Text>
      <Text style={styles.body}>Literacy assessment for children, made easy through art.</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Get started →</Text>
        </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;