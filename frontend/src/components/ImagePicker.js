import React, { useState } from "react"; 
import { View, Text, Image, TouchableOpacity, Alert } from "react-native"; 
import * as ImagePicker from "expo-image-picker"; 
import styles from '../assets/stylesheet/styles';

const ImagePickerButton = ({ onImageSelected }) => {
    // Stores the selected image URI 
	const [file, setFile] = useState(null); 

	// Stores any error message 
	const [error, setError] = useState(null); 

	// Function to pick an image from 
	//the device's media library 
	const pickImage = async () => { 
		console.log('Attempting to pick an image');
		const { status } = await ImagePicker. 
			requestMediaLibraryPermissionsAsync(); 

		if (status !== "granted") { 

			// If permission is denied, show an alert 
			Alert.alert( 
				"Permission Denied", 
				`Sorry, we need camera roll permission to upload images.` 
			); 
		} else { 
		    // Launch the image library and get 
			// the selected image 
			const result = 
				await ImagePicker.launchImageLibraryAsync(); 

			if (!result.canceled) { 

				// If an image is selected (not cancelled), 
				// update the file state variable 
				setFile(result.uri); 
	
				// Clear any previous errors 
				setError(null); 
				onImageSelected(result);
			} 
		}
	}; 

    return ( 
        <View>
			{/* Button to choose an image */} 
			<TouchableOpacity style={[styles.button, {marginBottom: 10}]} 
				onPress={pickImage}> 
				<Text style={styles.buttonText}> 
					Choose Image
				</Text> 
			</TouchableOpacity> 
        </View>
	);
};

export default ImagePickerButton;