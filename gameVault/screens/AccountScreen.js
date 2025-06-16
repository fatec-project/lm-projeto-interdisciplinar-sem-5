import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import NavBar from '../components/navbar';
import LibraryComponent from '../components/AccountScreen/library';
import { useFocusEffect } from '@react-navigation/native';

const AccountScreen = () => {
  const [activeTab, setActiveTab] = useState('library');
  const { user, logout } = useUser();
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível sair da conta');
    } finally {
      setLoading(false);
    }
  }, [logout]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <NavBar />
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'library' && styles.activeTab]}
          onPress={() => setActiveTab('library')}
        >
          <Text style={styles.tabText}>Biblioteca</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'account' && styles.activeTab]}
          onPress={() => setActiveTab('account')}
        >
          <Text style={styles.tabText}>Conta</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2dc653" />
        </View>
      ) : activeTab === 'library' ? (
        <LibraryComponent />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Saindo...' : 'Sair'}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#051923',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: '#0a2d42',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#284b63',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2dc653',
  },
  tabText: {
    color: '#e0e0e0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e0e0e0',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: '#0a2d42',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#284b63',
  },
  userText: {
    color: '#e0e0e0',
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2dc653',
    padding: 15,
    borderRadius: 8,
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