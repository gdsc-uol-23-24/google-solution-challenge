import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// Assuming styles.js is imported and contains the base styles
import styles from '../assets/stylesheet/styles';

// const Results = () => {
//   // data for demonstration
//   const resultsData = {
//     age_group: '6-7',
//     requirements_met: [
//       {
//         shape_name: 'circle',
//         rating: '2',
//         feedback: "Amazing! Sun shape is detected. This student meets pre-writing expectations for circles for their age. \n • Circles play a crucial role in forming letters such as 'O/o', 'P/p', 'Q/q' and 'C/c'. Great job on building such a strong foundation for your students' writing skills!",
//       },
//       {
//         shape_name: 'triangle',
//         rating: '2',
//         feedback: "Marvelous! Roof shape is detected. This student meets pre-writing expectations for triangles for their age. \n • Triangles are crucial for letters such as 'A', 'M', 'N', 'V/v', 'W/w', 'X/x', 'Y/y', and 'Z/z'. Fantastic work in laying a solid groundwork for your students' writing abilities!",
//       },
//       {
//         shape_name: 'square',
//         rating: '2',
//         feedback: "Congratulations! House shape is detected. This student meets pre-writing expectations for squares for their age. \n • Squares are the building blocks for letters such as 'E', 'F', 'H', 'I/i', 'L/l', and 'T/t'. Excellent job in creating a strong base for your students' writing capabilities!",
//       },
//     ],
//     additional_info: [],
//   };

const Results = ({ route }) => {
  const { responseData } = route.params;

  return (
    <ScrollView contentContainerStyle={[styles.container. localStyles.resultsContainer]}>
      {/* Display the age group and results */}
      <Text style={[styles.title, localStyles.resultsTitle]}>Results for Age Group: {responseData.age_group}</Text>
      {responseData.requirements_met.map((requirement, index) => (
        <View key={index} style={[styles.resultItem, localStyles.resultItem]}>
          <Text style={[styles.shapeName, localStyles.shapeName]}>{requirement.shape_name}</Text>
          <Text style={[styles.rating, localStyles.rating]}>Rating: {requirement.rating}</Text>
          <Text style={[styles.feedback, localStyles.feedback]}>{requirement.feedback}</Text>
        </View>
      ))}
    </ScrollView>
  );
};


//   return (
//     <ScrollView contentContainerStyle={[styles.container, localStyles.resultsContainer]}>
//   <Text style={[styles.title, localStyles.resultsTitle]}>Results for Age Group: {resultsData.age_group}</Text>
//   {resultsData.requirements_met.map((requirement, index) => (
//     <View key={index} style={[styles.resultItem, localStyles.resultItem]}>
//       <Text style={[styles.shapeName, localStyles.shapeName]}>{requirement.shape_name}</Text>
//       <Text style={[styles.rating, localStyles.rating]}>Rating: {requirement.rating}</Text>
//       <Text style={[styles.feedback, localStyles.feedback]}>{requirement.feedback}</Text>
//     </View>
//   ))}
// </ScrollView>

//   );
// };

// Local styles specific to the Results screen
const localStyles = StyleSheet.create({
  resultsContainer: {
    padding: 20,
    backgroundColor: '#fff', // Assuming a light theme
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  resultItem: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9', // Light background for each item
    borderRadius: 10, // Rounded corners for a modern look
    shadowColor: "#000", // Simple shadow for depth (optional)
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shapeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5, // Space between the shape name and its rating/feedback
  },
  rating: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  feedback: {
    fontSize: 16,
    color: '#444',
  },
});

export default Results;
