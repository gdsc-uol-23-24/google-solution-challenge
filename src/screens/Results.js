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
      {/* Render required results */}
      <Text style={styles.resultsTitle}>Drawing Analysis</Text>
      <Text style={[styles.body, {marginBottom: 20}]}>
        Based on the drawing provided, these are your student's scores
        for the pre-writing shapes that most children in the {responseData.age_group} age group
        have typically mastered.
        </Text>
      {responseData.requirements_met.map((requirement, index) => (
        <View key={index} style={[styles.resultItem, {backgroundColor: '#F0F4FD'}]}>
          <Text style={[styles.shapeName]}>
            {/* Convert first letter to uppercase */}
            {requirement.shape_name.charAt(0).toUpperCase() + requirement.shape_name.slice(1)}
          </Text>
          <Text style={[styles.rating]}>Rating: {requirement.rating}/2</Text>
          <Text style={[styles.feedback]}>{requirement.feedback}</Text>

        </View>
      ))}
      {/* Conditionally render extra feedback */}
      {responseData.additional_info && responseData.additional_info.length > 0 && (
        <>
        <Text style={[styles.resultsTitle, {marginTop: 10}]}>Extra Feedback</Text>
        <Text style={[styles.body, {marginBottom: 20}]}>
        Bonus: Here are your student's scores for the pre-writing shapes detected
        in the drawing that are advanced for the {responseData.age_group} age group.
        </Text>
        </>
      )
      }
      {responseData.additional_info && responseData.additional_info.map((additional_info, index) => (
        <View key={index} style={[styles.resultItem, {backgroundColor: '#EEF7E2'}]}>
          <Text style={[styles.shapeName]}>
            {/* Convert first letter to uppercase */}
            {additional_info.shape_name.charAt(0).toUpperCase() + additional_info.shape_name.slice(1)}
          </Text>
          <Text style={[styles.rating]}>Rating: {additional_info.rating}/2</Text>
          <Text style={[styles.feedback]}>{additional_info.feedback}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ResultsScreen;