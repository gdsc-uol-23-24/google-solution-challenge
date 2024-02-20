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

        {/* Step 1: Select age range */}
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

        {/* Step 2. Display image to copy */}
        <Text style={styles.h2}>
          Step 2
        </Text>
        <Text style={styles.body}>
            Provide your student with a pencil,
            a blank white sheet of paper, and a
            flat surface to work on. Ask them to
            copy the picture below to the best of
            their abilities.{'\n'}
            [PICTURE HERE]
        </Text>

        {/* Step 3. Upload image */}
        <Text style={styles.h2}>
          Step 3
        </Text>
        <Text style={styles.body}>
          Upload a clear picture of your student's final drawing.
        </Text>
        <ImagePickerButton />

        {/* Step 4. Submit */}
        
      </View>
    </View>
  );
};

export default LiteracyAssessmentScreen;