import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../assets/stylesheet/styles';

const AppHeader = ({ title }) => (
  <View style={styles.headerItems}>
    {/* Header logo */}
    <Image
      source={require('../assets/images/literadraw-logo-small.png')}
      style={styles.headerLogo}
    />
    {/* Header title */}
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

export default AppHeader;