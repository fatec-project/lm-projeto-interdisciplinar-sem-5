import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ImageBackground, 
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GameListCard from '../components/gamelistcard';

const SectionScreen = ({ route }) => {
  const { title, color, image, gameIds } = route.params;
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const BACKEND_URL = "https://igdb-test-production.up.railway.app/game/";
        const promises = gameIds.map(id => 
          fetch(`${BACKEND_URL}${id}`).then(res => res.json())
        );
        const results = await Promise.all(promises);
        setGames(results.filter(game => game && game.cover));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setLoading(false);
      }
    };

    fetchGames();
  }, [gameIds]);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={image}
        style={styles.headerImage}
        blurRadius={2}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)', 'transparent']}
          style={styles.gradient}
        />
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={color} style={styles.loading} />
        ) : (
          games.map(game => (
            <GameListCard key={game.id} game={game} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#051923',
  },
  headerImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  content: {
    padding: 16,
  },
  loading: {
    marginVertical: 40,
  },
});

export default SectionScreen;