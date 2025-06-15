import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';

const SectionContainer = ({ 
  title, 
  containerColor = '#284b63', 
  children,
  onPress 
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.mainContainer, { backgroundColor: containerColor }]}>
        <View style={styles.titleOuter}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SectionContainer;