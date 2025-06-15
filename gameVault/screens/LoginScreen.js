import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importando ícone
import GameVaultAPI from '../backend/index.js';

const LoginScreen = ({ navigation }) => {
  const [identificador, setIdentificador] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!identificador || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const usuario = await GameVaultAPI.usuarios.login({ identificador: identificador, senha: senha });
      navigation.replace('Store');
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha no login');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GameVault</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email ou nome de usuário"
        value={identificador}
        onChangeText={setIdentificador}
        autoCapitalize="none"
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={toggleShowPassword}
        >
          <Ionicons 
            name={showPassword ? 'eye' : 'eye-off'} 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Carregando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.link} 
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#222',
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#222',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    color: '#fff',
  },
  eyeButton: {
    padding: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#bb86fc',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;