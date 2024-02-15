import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';

const SplashScreen = ({ navigation }) => {
    const navigateToHome = () => {
        // Navigate to the home screen
        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/allwrite.png')} style={styles.image} />
            <Text style={styles.h1}>Welcome to AllWrite.</Text>
            <Text style={styles.h2}>Literacy assessment for children, made easy through art.</Text>
            <Button onPress={navigateToHome} text='Get started'/>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150, 
    height: 150, 
    resizeMode: 'contain',
    marginBottom: -30,
  },
  h1: {
    fontSize: 36,
    fontWeight: 'bold',
    // fontFamily: 'ProductSans-Bold',
    textAlign: 'center'
  },
  h2: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default SplashScreen;