import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../assets/stylesheet/styles';
import ImagePickerButton from '../components/ImagePicker';

const LiteracyAssessmentScreen = ({ navigation }) => {
  const navigateToHome = () => {
    // Navigate to the Home screen
    navigation.replace('Home');
  };

  return (
    <View style={styles.content}>
      <View style={styles.section}>

        {/* 'Back to home' button */}
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
            <Text style={styles.buttonText}>← Back to home</Text>
        </TouchableOpacity>

        {/* Step 1 */}
        <Text style={styles.h2}>Literacy Assessment</Text>
        <Text style={styles.body}>
            - Ask your student to draw the picture below.
            [picture pending]
        </Text>

        {/* Step 2 */}
        <Text style={styles.body}>
          - Take a picture of their drawing and upload it.
        </Text>
        <ImagePickerButton />
        
      </View>
    </View>
  );
};

export default LiteracyAssessmentScreen;