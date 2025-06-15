import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';

const AccountScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useUser();

  const handleLogout = async () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>Nome: {user.nome}</Text>
          <Text style={styles.userText}>Email: {user.email}</Text>
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogout}
        >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  userInfo: {
    marginBottom: 20,
  },
  userText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
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