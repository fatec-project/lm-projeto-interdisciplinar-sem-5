import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GameVaultAPI from '../../../backend/index.js';
import { useUser } from '../../../context/UserContext.js';
import styles from '../styles.js';

const Login = ({ onSwitchAuth }) => {
  const [identificador, setIdentificador] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();

  const handleLogin = async () => {
    if (!identificador || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const usuario = await GameVaultAPI.usuarios.login({ identificador: identificador, senha: senha });
      login(usuario);
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
      <Text style={styles.logoText}>GAME VAULT</Text>
      <Text style={styles.subtitle}>Entre na sua conta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email ou nome de usuário"
        placeholderTextColor="#7a8fa6"
        value={identificador}
        onChangeText={setIdentificador}
        autoCapitalize="none"
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor="#7a8fa6"
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
            size={20} 
            color="#7a8fa6" 
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'CARREGANDO...' : 'ENTRAR'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.link} 
        onPress={onSwitchAuth}
      >
        <Text style={styles.linkText}>Não tem uma conta? <Text style={styles.linkHighlight}>Cadastre-se</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;