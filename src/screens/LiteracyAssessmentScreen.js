import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import styles from '../assets/stylesheet/styles';
import ImagePickerButton from '../components/ImagePicker';

const LiteracyAssessmentScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [age, setAge] = useState('4-5');  // Hardcoded age for testing

  const navigateToHome = () => {
    // Navigate to the Home screen
    navigation.replace('Home');
  };

  const handleImageSelected = (selectedImage) => {
    // Handle the selected image
    setImage(selectedImage);
  };

  const handleSubmit = () => {
    // Send data to the Flask API
    fetch('http://127.0.0.1:5000/api/process_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: 'C:/Users/Hp/Desktop/error.jpg',  // Hardcoded image path for testing
        age: age,
      }),
    })
      .then(response => response.json())
      .then(result => {
        // Handle the result from the Flask API as needed
        Alert.alert('API Response', JSON.stringify(result));
      })
      .catch(error => {
        console.error('API Error:', error);
        Alert.alert('API Error', 'An error occurred while contacting the API.');
      });
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
        <ImagePickerButton onImageSelected={handleImageSelected} />

        {/* Step 3 */}
        <Text style={styles.body}>
          - Enter the student's age:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
        />

        {/* Submit button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default LiteracyAssessmentScreen;
