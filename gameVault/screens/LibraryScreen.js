jsx
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameVaultAPI from '../backend/index.js';
//import { useUser } from '../context/UserContext';

const LibraryScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchLibrary = async () => {
      if (!user) return;
      
      try {
        const biblioteca = await GameVaultAPI.biblioteca.listar(user.id);
        
        // Simulação de busca dos jogos - substitua pela sua lógica real
        const jogosDaBiblioteca = biblioteca.map(item => ({
          id: item.jogoId,
          name: `Jogo ${item.jogoId}`,
          cover: { url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.jpg' }
        }));
        
        setGames(jogosDaBiblioteca);
      } catch (error) {
        console.error('Erro ao carregar biblioteca:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [user]);

  const renderGameItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.gameItem}
      onPress={() => navigation.navigate('GameDetails', { game: item })}
    >
      <Image
        source={{ uri: item.cover.url }}
        style={styles.gameImage}
      />
      <Text style={styles.gameTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Minha Biblioteca</Text>
        
        {games.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Sua biblioteca está vazia</Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => navigation.navigate('Store')}
              >
              <Text style={styles.browseButtonText}>Explorar Loja</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
          data={games}
          renderItem={renderGameItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 10,
  },
  gameItem: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  gameImage: {
    width: 150,
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  gameTitle: {
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
  },
  browseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LibraryScreen;