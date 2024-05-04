import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from '../assets/stylesheet/styles';

const HomeScreen = ({ navigation }) => {
  const navigateToAssessment = () => {
    // Navigate to the Assessment screen
    navigation.replace('Literacy Assessment');
  };

  // Resources list
  const resources = [
    {
      id: 1,
      content: (
        <>
        <Image
          source={require('../assets/images/resource1.png')}
          style={styles.resourceImage}
        />
        <Text style={styles.h3}>
          Improving Literacy Through Art: The Battelle Developmental Inventory
        </Text>
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
        <Image
          source={require('../assets/images/resource2.png')}
          style={styles.resourceImage}
        />
        <Text style={styles.h3}>
          Literacy Disparity Report 2024: United Nations Statistics
        </Text>
        </>
      ),
    }
  ];

  // Function to render each resource
  const renderItem = ({ item }) => (
    <View style={styles.resourceContainer}>
      {item.content}
    </View>
  );
  
  return (
    <View style={styles.content}>

      {/* Literacy assessment section */}
      <View style={styles.section}>
        <Text style={styles.h2}>Literacy assessment</Text>
        <Text style={styles.body}>
          Discover your student's potential for writing literacy —
          no prior knowledge of the alphabet required.
        </Text>
        <TouchableOpacity style={styles.button} onPress={navigateToAssessment}>
          <Text style={styles.buttonText}>Begin assessment →</Text>
        </TouchableOpacity>
      </View>

      {/* Resources section */}
      <View style={styles.section}>
        <Text style={styles.h2}>Resources</Text>
        <FlatList
          data={resources}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      
    </View>
  );
};

export default HomeScreen;