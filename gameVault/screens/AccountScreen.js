import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GameVaultAPI from '../backend/index.js';

const AccountScreen = ({ navigation }) => {
  const handleLogout = async () => {
    // Implemente a lógica de logout aqui
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AccountScreen;