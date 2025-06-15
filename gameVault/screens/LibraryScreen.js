
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameVaultAPI from '../backend/index.js';
import { useUser } from '../context/UserContext';

const LibraryScreen = () => {
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchLibrary = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const biblioteca = await GameVaultAPI.biblioteca.listar(user.id);
      const BACKEND_URL = "https://igdb-test-production.up.railway.app/game/";

      if (!biblioteca.length) {
        setGames([]);
        return;
      }

      const promises = biblioteca.map(item =>
        fetch(`${BACKEND_URL}${item.jogoId}`).then(res => res.json())
      );

      const results = await Promise.allSettled(promises);

      const jogosValidos = results
        .filter(result => result.status === 'fulfilled' && result.value && result.value.cover)
        .map(result => {
          const game = result.value;
          return {
            id: game.id,
            name: game.name,
            cover: {
              url: `https:${game.cover.url.replace('t_thumb', 't_cover_big_2x')}`
            }
          };
        });

      setGames(jogosValidos);
    } catch (error) {
      console.error('Erro ao carregar biblioteca:', error);
      Alert.alert('Erro', 'Não foi possível carregar sua biblioteca');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLibrary();
    }, [user])
  );

  const renderGameItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.gameItem}
      onPress={() => navigation.navigate('GameDetails', { game: { ...item }})}
    >
      <Image source={{ uri: item.cover.url }} style={styles.gameImage} resizeMode="cover" />
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minha Biblioteca</Text>
      {games.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Sua biblioteca está vazia</Text>
          <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('Loja')}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
    padding: 16 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#121212' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 20, 
    marginTop: 10 
  },
  gameItem: { 
    flex: 1, 
    margin: 8, 
    alignItems: 'center' 
  },
  gameImage: { 
    width: 150, 
    height: 200, 
    borderRadius: 8, 
    resizeMode: 'cover' 
  },
  gameTitle: { 
    color: '#fff', 
    marginTop: 8, 
    textAlign: 'center' 
  },
  listContent: { 
    paddingBottom: 20 
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emptyText: { 
    color: '#fff', 
    fontSize: 18, 
    marginBottom: 20 
  },
  browseButton: { 
    backgroundColor: '#6200ee',
    padding: 15, 
    borderRadius: 5 
  },
  browseButtonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
});

export default LibraryScreen;
