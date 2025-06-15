import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import styles from './styles';

const NavBar = () => {
  const { user } = useUser();
  const paddingTop = Platform.OS === 'android' ? 
    (StatusBar.currentHeight || 0) + 15 : 
    15;

  return (
    <>
      {Platform.OS === 'android' && <StatusBar backgroundColor="#051923" barStyle="light-content" />}
      <View style={[styles.navBar, { paddingTop }]}>
        <Text style={styles.title}>Game Vault</Text>
        <View style={styles.iconsContainer}>
          {user && (
            <Text style={styles.userName}>{user.nome}</Text>
          )}
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