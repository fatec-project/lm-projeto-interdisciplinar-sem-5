import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import GameVaultAPI from '../../../backend/index.js';
import { useUser } from '../../../context/UserContext';
import styles from './styles';

const LibraryComponent = () => {
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchLibrary = useCallback(async () => {
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
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchLibrary();
    }, [fetchLibrary])
  );

  const renderGameItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.gameItem}
      onPress={() => navigation.navigate('GameDetails', { game: { ...item }})}
    >
      <Image 
        source={{ uri: item.cover.url }} 
        style={styles.gameImage} 
        resizeMode="cover" 
      />
      <Text style={styles.gameTitle} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2dc653" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {games.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Sua biblioteca está vazia</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('StoreMain')}
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
  );
};

export default LibraryComponent;