import { Platform } from 'react-native';

// Configuração do armazenamento
let storage;

if (Platform.OS === 'web') {
  // Implementação para navegador usando localStorage
  storage = {
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
} else {
  // Implementação para mobile usando AsyncStorage
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  
  storage = {
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

console.log(`Usando ${Platform.OS === 'web' ? 'localStorage' : 'AsyncStorage'} para armazenamento`);

export default storage;