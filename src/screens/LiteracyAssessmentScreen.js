import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import styles from '../assets/stylesheet/styles';
import ImagePickerButton from '../components/ImagePicker';
import { Picker } from '@react-native-picker/picker';

const LiteracyAssessmentScreen = ({ navigation }) => {
  // Navigate back to home
  const navigateToHome = () => {
    navigation.replace('Home');
  };

  // States for age and uploaded image
  const [selectedAge, setSelectedAge] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);

  // Handle image selection from ImagePicker
  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
    console.log('Selected Image Data:', imageData);
  };

  // Function to generate results
  const generateResults = () => {
    // Check that both age and image fields are populated
    if (!selectedAge || !uploadedImage) {
      Alert.alert("Please select age and upload an image.");
      return;
    }
    
    // Assign backend endpoint
    const backendUrl = '/api/process_data';

    // Construct the data to send to backend
    const dataToSend = {
      age: selectedAge,
      image: uploadedImage,
    };

    // Make a POST request to the backend
    fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Backend response:', data);
        // Navigate to Results screen to display data
        navigation.navigate('Results', { responseData: data });
      })
      .catch(error => {
        console.error('Error sending data to backend:', error);
        Alert.alert('Error occurred while generating results');
      });
  };

  // Assessment steps to display in FlatList
  const steps = [
    {
      title: 'Select age range',
      content: (
        <>
          <Text style={styles.h2}>
            Step 1
          </Text>
          <Text style={styles.body}>
            Enter your student's age range.</Text>
          <Picker
            selectedValue={selectedAge}
            onValueChange={(itemValue, itemIndex) => setSelectedAge(itemValue)}
          >
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
        </>
      ),
    },
    {
      title: 'Display image to copy',
      content: (
        <>
          <Text style={styles.h2}>Step 2</Text>
          <Text style={styles.body}>
            Provide your student with a pencil, a blank white sheet of paper, and a flat surface to work on.
            Ask them to copy the picture below to the best of their abilities.
          </Text>
        </>
      ),
    },
    {
      title: 'Upload image',
      content: (
        <>
          <Text style={styles.h2}>Step 3</Text>
          <Text style={styles.body}>
            Upload a clear picture of your student's final drawing.
          </Text>
          <ImagePickerButton onImageSelected={handleImageUpload}/>
        </>
      ),
    },
    {
      title: 'Submit details',
      content: (
        <>
          <Text style={[styles.h2, {marginTop: -30}]}>Step 4</Text>
          <Text style={styles.body}>
            You're ready to submit! Discover your student's
            potential for writing literacy.
          </Text>
          <TouchableOpacity
            style={[styles.button]}
            onPress={generateResults}>
            <Text style={styles.buttonText}>⟳ Generate results</Text>
          </TouchableOpacity>
        </>
      ),
    }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.stepContainer}>
      {item.content}
    </View>
  );

  return (
    <View style={styles.content}>
      {/* Go back to home */}
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'darkgrey'}]}
        onPress={navigateToHome}>
         <Text style={styles.buttonText}>← Not ready? Go back</Text>
      </TouchableOpacity>
      {/* Render assessment steps with FlatList */}
      <FlatList
        data={steps}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default LiteracyAssessmentScreen;