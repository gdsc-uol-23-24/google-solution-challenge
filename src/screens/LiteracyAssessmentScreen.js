import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../assets/stylesheet/styles';
import ImagePickerButton from '../components/ImagePicker';
import {Picker} from '@react-native-picker/picker';

const LiteracyAssessmentScreen = ({ navigation }) => {
  const navigateToHome = () => {
    // Navigate to the Home screen
    navigation.replace('Home');
  };
  
  // Initialize state for age range input from user
  const [selectedAge, setSelectedAge] = useState();

  return (
    <View style={styles.content}>
      <View style={styles.section}>

        {/* 'Back to home' button */}
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
            <Text style={styles.buttonText}>← Back to home</Text>
        </TouchableOpacity>

        {/* 1. Select age range */}
        <Text style={styles.h2}>
          Step 1
        </Text>
        <Text style={styles.body}>
          Please enter the age of your student below.
        </Text>
        <Picker
          selectedValue={selectedAge}
          onValueChange={(itemValue, itemIndex) =>
          setSelectedAge(itemValue)
        }>
          {/* Age range options from 3-4 to 10-11 */}
          <Picker.Item label="3–4" value="3to4" />
          <Picker.Item label="4–5" value="4to5" />
          <Picker.Item label="5–6" value="5to6" />
          <Picker.Item label="6–7" value="6to7" />
          <Picker.Item label="7–8" value="7to8" />
          <Picker.Item label="8–9" value="8to9" />
          <Picker.Item label="9–10" value="9to10" />
          <Picker.Item label="10–11" value="10to11" />
        </Picker>

        {/* 2. Display image to copy */}
        <Text style={styles.h2}>Literacy Assessment</Text>
        <Text style={styles.body}>
            - Ask your student to draw the picture below.
            [picture pending]
        </Text>

        {/* 3. Upload image */}
        <Text style={styles.body}>
          - Take a picture of their drawing and upload it.
        </Text>
        <ImagePickerButton />

        {/* 4. Submit */}

        
      </View>
    </View>
  );
};

export default LiteracyAssessmentScreen;