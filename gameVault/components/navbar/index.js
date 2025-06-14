import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const NavBar = () => {
  const paddingTop = Platform.OS === 'android' ? 
    (StatusBar.currentHeight || 0) + 15 : 
    15;

  return (
    <>
      {Platform.OS === 'android' && <StatusBar backgroundColor="#051923" barStyle="light-content" />}
      <View style={[styles.navBar, { paddingTop }]}>
        <Text style={styles.title}>Game Vault</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="#e0e0e0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart" size={24} color="#e0e0e0" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default NavBar;