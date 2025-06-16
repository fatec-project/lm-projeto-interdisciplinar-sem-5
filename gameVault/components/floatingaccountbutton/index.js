import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const FloatingAccountButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('Account')}
    >
      <Ionicons name="person" size={24} color="#e0e0e0" />
    </TouchableOpacity>
  );
};

export default FloatingAccountButton;