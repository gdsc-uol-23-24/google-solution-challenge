import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheet/styles';

const HomeScreen = ({ navigation }) => {
  const navigateToAssessment = () => {
    // Navigate to the Assessment screen
    navigation.replace('Literacy Assessment');
  };
  return (
    <View style={styles.content}>

      {/* Literacy assessment section */}
      <View style={styles.section}>
        <Text style={styles.h2}>Literacy assessment</Text>
        <Text style={styles.body}>
          Discover your student's potential for writing literacy —
          no prior knowledge of the alphabet required.
        </Text>
        <TouchableOpacity style={styles.button} onPress={navigateToAssessment}>
          <Text style={styles.buttonText}>Begin assessment →</Text>
        </TouchableOpacity>
      </View>

      {/* Resources section
      <View style={styles.section}>
        <Text style={styles.h2}>Resources</Text>
        <Text style={styles.body}>
          TBD
        </Text>
      </View> */}
      
    </View>
  );
};

export default HomeScreen;