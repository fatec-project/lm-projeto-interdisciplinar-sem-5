import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import GameVaultAPI from '../../../backend/index.js';
import { useUser } from '../../../context/UserContext';
import styles from '../styles';

const Register = ({ onSwitchAuth }) => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const usuario = await GameVaultAPI.usuarios.criar({ nome: nome, email: email, senha: senha });
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      
      // Faz login automaticamente após o cadastro
      login(usuario);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha no cadastro');
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
      <Text style={styles.subtitle}>Crie sua conta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#7a8fa6"
        value={nome}
        onChangeText={setNome}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#7a8fa6"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
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
        onPress={handleCadastro}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'CARREGANDO...' : 'CADASTRAR'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.link} 
        onPress={onSwitchAuth}
      >
        <Text style={styles.linkText}>Já tem uma conta? <Text style={styles.linkHighlight}>Faça login</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;