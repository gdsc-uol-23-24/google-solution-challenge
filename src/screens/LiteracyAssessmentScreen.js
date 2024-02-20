import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Picker, Alert } from 'react-native';
import styles from '../assets/stylesheet/styles';
import ImagePickerButton from '../components/ImagePicker';

const LiteracyAssessmentScreen = ({ navigation }) => {
  const [ageGroup, setAgeGroup] = useState('3-4'); // this will be the default age group
  const [imageUri, setImageUri] = useState(null);

  const navigateToHome = () => {
    navigation.replace('Home');
  };

  // const handleSubmit = () => {
  //   if (!imageUri) {
  //     Alert.alert('Please upload a drawing');
  //     return;
  //   }

  //   // Simulating sending data to the backend
  //   // Replace with your actual backend request after collaborating with hamza
  //   navigation.navigate('Results', { ageGroup: ageGroup, imageUri: imageUri });
  // };

  const handleSubmit = async () => {
    // submitting data to the backend
    // This part depends on hamza's backend API
    const response = await fetch('YOUR_BACKEND_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // your assessment data
      }),
    });
  
    const resultData = await response.json();
  
    // Navigate to the ResultsScreen with the result data
    navigation.navigate('Results', { data: resultData });
  };
  

  return (
    <View style={styles.content}>
      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>← Back to home</Text>
        </TouchableOpacity>

        <Text style={styles.h2}>Literacy Assessment</Text>
        <Text style={styles.body}>
          - Ask your student to draw the picture below.
          [picture pending]
        </Text>

        <Text style={styles.body}>
          - Take a picture of their drawing and upload it.
        </Text>
        <ImagePickerButton onImagePicked={(uri) => setImageUri(uri)} />

        {/* Age selection updated to categories */}
        <Text style={styles.body}>Select Age Group:</Text>
        <Picker
          selectedValue={ageGroup}
          style={{height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) => setAgeGroup(itemValue)}>
          <Picker.Item label="3-4 years" value="3-4" />
          <Picker.Item label="5-6 years" value="5-6" />
          <Picker.Item label="7-11 years" value="7-11" />
        </Picker>

        {/* Submit button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LiteracyAssessmentScreen;
