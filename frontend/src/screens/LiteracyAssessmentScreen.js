import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import styles from '../assets/stylesheet/styles';
import ImagePickerButton from '../components/ImagePicker';
import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';

// Assign backend endpoint
const backendUrl = 'http://192.168.100.17:5000/api/process_data';

const LiteracyAssessmentScreen = ({ navigation }) => {
  // Navigate back to home
  const navigateToHome = () => {
    navigation.replace('Home');
  };

  // State for loading
  const [loading, setLoading] = useState(false);

  // States for age and uploaded image
  const [selectedAge, setSelectedAge] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageFileName, setUploadedImageFileName] = useState(null);

  // Handle image selection from ImagePicker
  const handleImageUpload = async (imageData) => {
    try {
      // Ensure that imageData is not null
      if (!imageData) {
        throw new Error('Invalid image data provided.');
      }

      // Extract URI from object
      const uri = imageData.assets[0].uri;
      // Store URI
      const uriParts = uri.split('/');
      const fileName = uriParts[uriParts.length - 1];
      setUploadedImageFileName(fileName);

      // Convert selected image to base64
      const base64Image = await imageToBase64(uri);

      // Update state with the base64 image
      setUploadedImage(base64Image);
      // console.log('Selected Image Data:', base64Image);

    } catch (error) {
      console.error('Error converting image to base64:', error);
    }
  };

  // Function to convert image URI to base64
  const imageToBase64 = async (uri) => {
    try {
      console.log("Image URI:", uri);
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("Converted to Base64!");
      return base64;

    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  };

  // Function to generate results
  const generateResults = () => {
    // Check that both age and image fields are populated
    if (!selectedAge || !uploadedImage) {
      Alert.alert("Missing fields", 
      `Please make sure you have selected an age group and uploaded an image.`
      );
      return;
    }
    // Set loading to true
    setLoading(true);

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
        setLoading(false);
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
            <Picker.Item label="3–4" value="3-4" />
            <Picker.Item label="4–5" value="4-5" />
            <Picker.Item label="5–6" value="5-6" />
            <Picker.Item label="6–7" value="6-7" />
            <Picker.Item label="7–8" value="7-8" />
            <Picker.Item label="8–9" value="8-9" />
            <Picker.Item label="9–10" value="9-10" />
            <Picker.Item label="10–11" value="10-11" />
          </Picker>
        </>
      ),
    },
    {
      title: 'Display image to copy',
      content: (
        <>
          {/* Instructions */}
          <Text style={styles.h2}>Step 2</Text>
          <Text style={styles.body}>
            Provide your student with a pencil, a blank white sheet of paper, and a flat surface to work on.
            Ask them to copy the picture of the house below to the best of their abilities.
          </Text>
          {/* Image to copy */}
          <Image
          source={require('../assets/images/house.png')}
          style={styles.houseImage}
          />
          {/* Image caption */}
          <Text style={styles.info}>
            A scene of a house with a triangular roof,
            a square exterior, and a circular sun in the background.
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
            Upload a clear photo or scan of your student's final drawing.
          </Text>
          <Text style={styles.info}>
            For best results, your photo should be taken with your camera parallel
            to the drawing to avoid distortion or shadows.
          </Text>
          <ImagePickerButton onImageSelected={handleImageUpload} />
          {/* Display "no image" if nothing is selected, else show file name */}
          {uploadedImageFileName ? (
            <Text style={[styles.info, {marginBottom: 30}]}>
              {uploadedImageFileName}
            </Text>
          ) : (
            <Text style={[styles.info, {marginBottom: 30}]}>
              Please upload an image of the drawing.
            </Text>
          )}
        </>
      ),
    },
    {
      title: 'Submit details',
      content: (
        <>
          <Text style={[styles.h2, { marginTop: -30 }]}>Step 4</Text>
          <Text style={styles.body}>
            You're ready to submit! Discover your student's
            potential for writing literacy in accordance with their age group.
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
        style={[styles.button, { backgroundColor: 'darkgrey' }]}
        onPress={navigateToHome}>
        <Text style={styles.buttonText}>← Not ready? Go back</Text>
      </TouchableOpacity>
      {/* Render assessment steps with FlatList */}
      <FlatList
        data={steps}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* Render loading indicator while model runs */}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" />
        </View>
      )} 
  </View>
  );
};

export default LiteracyAssessmentScreen;