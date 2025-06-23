import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator,
  Text
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GameListCard from '../components/gamelistcard';
import NavBar from '../components/navbar';

const SearchScreen = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const route = useRoute();
  const navigation = useNavigation();

  // Função de pesquisa com debounce
  const handleSearch = useCallback(async (query) => {
    if (query.length < 3) {
      setGames([]);
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://test-five-beta-98.vercel.app/search?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Erro ao buscar jogos');
      }
      
      const data = await response.json();
      setGames(data);
    } catch (err) {
      console.error('Erro ao buscar jogos:', err);
      setError(err.message);
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualiza a pesquisa quando o texto muda
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    handleSearch(query);
  }, [handleSearch]);

  // Pesquisa inicial ao abrir a tela
  useEffect(() => {
    const initialQuery = route.params?.query || '';
    if (initialQuery) {
      setSearchQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [route.params?.query]);

  return (
    <View style={styles.container}>
      <NavBar 
        showSearchBar={true} 
        onSearchChange={handleSearchChange}
      />
      
      {loading ? (
        <ActivityIndicator size="large" color="#e63946" style={{ marginTop: 30 }} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : games.length === 0 && searchQuery.length >= 3 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum jogo encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <GameListCard 
              game={item} 
              onPress={() => navigation.navigate('GameDetails', { game: item })}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#051923',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#e63946',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16,
  },
});

export default SearchScreen;