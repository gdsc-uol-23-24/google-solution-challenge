import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheet/styles';

const SplashScreen = ({ navigation }) => {
  const navigateToHome = () => {
    // Navigate to the Home screen
    navigation.replace('Home');
  };

  const splashImages = [
    require('../assets/images/literadraw-splash-1.png'),
    require('../assets/images/literadraw-splash-2.png'),
    require('../assets/images/literadraw-splash-3.png'),
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through images at 600ms intervals
      setCurrentImage((prevImage) => (prevImage + 1) % splashImages.length);
    }, 600);

    // Clear interval
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={splashImages[currentImage]} style={styles.splashLogo} />
      <Text style={styles.h1}>Welcome to LiteraDraw!</Text>
      <Text style={[styles.body, {textAlign: 'center'}]}>Literacy assessment for children, made easy through art.</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Get started →</Text>
        </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;