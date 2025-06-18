import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ImageBackground, 
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import GameListCard from '../components/gamelistcard';

const SectionScreen = ({ navigation, route }) => {
  const { title, color, image, gameIds } = route.params;
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const BACKEND_URL = "https://test-five-beta-98.vercel.app/game/";
        const promises = gameIds.map(id =>
          fetch(`${BACKEND_URL}${id}`).then(res => res.json())
        );

        const results = await Promise.allSettled(promises);

        const validGames = results
          .filter(result => result.status === 'fulfilled' && result.value && result.value.cover)
          .map(result => ({
            id: result.value.id,
            name: result.value.name,
            cover: result.value.cover
          }));

        setGames(validGames);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [gameIds]);

  return (
    <ImageBackground
      source={image}
      style={styles.backgroundImage}
      blurRadius={4}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.3)']}
        style={styles.gradientOverlay}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.header, { paddingTop: 40 }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </View>

        <ScrollView style={styles.container}>
          <View style={styles.content}>
            {loading ? (
              <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={color} />
                <Text style={[styles.loadingText, { color }]}>Carregando jogos...</Text>
              </View>
            ) : error ? (
              <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : (
              games.map(game => (
                <GameListCard key={game.id} game={game} backgroundColor="rgba(10, 45, 66, 0.7)" />
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 60, // Espaço para o header
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginLeft: 10,
    marginRight: 50, // Espaço para evitar que o texto vá até a borda
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    minHeight: 200,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    margin: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default SectionScreen;