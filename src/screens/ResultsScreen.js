import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// data structure
const dummyData = {
  score: 85,
  feedback: 'Great job! You have a good grasp of basic shapes and lines.',
  recommendations: [
    'Practice drawing triangles and circles to improve symmetry.',
    'Work on steadier hand movements for straight lines.'
  ]
};

const ResultsScreen = ({ route }) => {
  // Assuming 'data' is passed as a parameter to this screen
  const { data } = route.params || dummyData; // Fallback to dummy data for demonstration

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Assessment Results</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.score}>Score: {data.score}%</Text>
        <Text style={styles.feedback}>{data.feedback}</Text>
        <Text style={styles.recommendationsTitle}>Recommendations:</Text>
        {data.recommendations.map((recommendation, index) => (
          <Text key={index} style={styles.recommendationItem}>
            - {recommendation}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  resultContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green'
  },
  feedback: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  recommendationItem: {
    fontSize: 16,
    marginTop: 5
  }
});

export default ResultsScreen;
