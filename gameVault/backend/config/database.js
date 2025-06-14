import { Platform } from 'react-native';

// Implementação para navegador usando localStorage
const browserDB = {
  async getItem(key) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Erro ao ler do localStorage:', error);
      return null;
    }
  },
  
  async setItem(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Erro ao gravar no localStorage:', error);
      return false;
    }
  },
  
  async removeItem(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error);
      return false;
    }
  },
  
  async clear() {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
      return false;
    }
  }
};

// Implementação para React Native usando AsyncStorage
let mobileDB = null;
if (Platform.OS !== 'web') {
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  
  mobileDB = {
    async getItem(key) {
      try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error('Erro ao ler do AsyncStorage:', error);
        return null;
      }
    },
    
    async setItem(key, value) {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Erro ao gravar no AsyncStorage:', error);
        return false;
      }
    },
    
    async removeItem(key) {
      try {
        await AsyncStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Erro ao remover do AsyncStorage:', error);
        return false;
      }
    },
    
    async clear() {
      try {
        await AsyncStorage.clear();
        return true;
      } catch (error) {
        console.error('Erro ao limpar AsyncStorage:', error);
        return false;
      }
    }
  };
}

// Seleciona a implementação apropriada
const db = Platform.OS === 'web' ? browserDB : mobileDB;

console.log(`Usando ${Platform.OS === 'web' ? 'localStorage' : 'AsyncStorage'} para armazenamento`);

export default db;