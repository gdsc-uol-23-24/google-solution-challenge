import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from '../assets/stylesheet/styles';

const ResultsScreen = ({ route }) => {
  // Retrieve the responseData from the navigation props
  const { responseData } = route.params;

  // Now you can use the responseData in your component
  console.log('Received data in Results screen:', responseData);

  return (
    <ScrollView contentContainerStyle={[styles.resultsContainer]}>
      {/* Display the age group and results */}
      <Text style={[styles.resultsTitle]}>Results for Age Group: {responseData.age_group}</Text>
      {responseData.requirements_met.map((requirement, index) => (
        <View key={index} style={[styles.resultItem]}>
          <Text style={[styles.shapeName]}>{requirement.shape_name}</Text>
          <Text style={[styles.rating]}>Rating: {requirement.rating}</Text>
          <Text style={[styles.feedback]}>{requirement.feedback}</Text>

        </View>
      ))}
      {responseData.additional_info && responseData.additional_info.map((additional_info, index) => (
        <View key={index} style={[styles.resultItem]}>
          <Text style={[styles.shapeName]}>Extra feedback: {additional_info.shape_name}</Text>
          <Text style={[styles.rating]}>Rating: {additional_info.rating}</Text>
          <Text style={[styles.feedback]}>{additional_info.feedback}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ResultsScreen;
