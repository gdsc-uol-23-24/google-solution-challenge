import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import styles from '../assets/stylesheet/styles';

const ResultsScreen = ({ route }) => {
    // Retrieve the responseData from the navigation props
    const { responseData } = route.params;
    console.log('Received data in Results screen:', responseData);

    // Shape images
    const c = "circle";
    const s = "square";
    const t = "triangle";

    return (
        <ScrollView contentContainerStyle={[styles.resultsContainer]}>
            {/* Render required results */}
            <Text style={styles.resultsTitle}>Literacy Report</Text>
            <Text style={[styles.info, { marginBottom: 20, textAlign: 'left' }]}>
                Based on the drawing provided, these are your student's scores
                for the pre-writing shapes that most children in the {responseData.age_group} age group
                have typically mastered.
            </Text>
            {responseData.requirements_met.map((requirement, index) => (
                <View key={index} style={[styles.resultItem, { backgroundColor: '#F0F4FD' }]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {requirement.shape_name == "circle" ? (
                            <Image
                            source={require('../assets/images/sampleCircle.png')}
                            style={{width: 90, height: 90, marginLeft: 5, marginRight: 10}}
                            />
                        ) : requirement.shape_name == "square" ? (
                            <Image
                            source={require('../assets/images/sampleSquare.png')}
                            style={{width: 90, height: 90, marginLeft: 5, marginRight: 10}}
                            />
                        ) : requirement.shape_name == "triangle" ? (
                            <Image
                            source={require('../assets/images/sampleTriangle.png')}
                            style={{width: 90, height: 90, marginLeft: 5, marginRight: 10}}
                            />
                        ) : (
                            <Text>Unknown shape</Text>
                        )
                    }
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.shapeName]}>
                                {/* Convert first letter to uppercase */}
                                {requirement.shape_name.charAt(0).toUpperCase() + requirement.shape_name.slice(1)}
                            </Text>
                            <Text style={[styles.rating]}>Rating: {requirement.rating}/2</Text>
                            <Text style={[styles.rating, {fontSize: 16, marginTop: 5, marginBottom: 10}]}>
                                {requirement.feedback[0]}
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={[styles.feedback]}>{requirement.feedback[1]}</Text>
                    </View>
                </View>
            ))}
            {/* Conditionally render extra feedback */}
            {responseData.additional_info && responseData.additional_info.length > 0 && (
                <>
                    <Text style={[styles.resultsTitle, { marginTop: 10 }]}>Extra Feedback</Text>
                    <Text style={[styles.body, { marginBottom: 20 }]}>
                        Bonus: Here are your student's scores for the pre-writing shapes detected
                        in the drawing that are advanced for the {responseData.age_group} age group.
                    </Text>
                </>
            )
            }
            {responseData.additional_info && responseData.additional_info.map((additional_info, index) => (
                <View key={index} style={[styles.resultItem, { backgroundColor: '#EEF7E2' }]}>
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