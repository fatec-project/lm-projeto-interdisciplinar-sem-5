import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.3;
const CARD_SPACING = 16;

const GameCarousel = ({ gameIds = [] }) => {
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const BACKEND_URL = "https://test-five-beta-98.vercel.app/game/";
        const promises = gameIds.map(id => 
          fetch(`${BACKEND_URL}${id}`).then(res => res.json())
        );
        const results = await Promise.allSettled(promises);
        setGames(results.filter(game => game && game.cover));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setLoading(false);
      }
    };

    if (gameIds.length > 0) {
      fetchGames();
    }
  }, [gameIds]);

  if (loading || games.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          {loading ? 'Carregando jogos...' : 'Nenhum jogo encontrado'}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ paddingVertical: 10 }}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: CARD_SPACING }}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('GameDetails', { game: { ...item }})}
            style={[styles.cardContainer, { width: CARD_WIDTH, marginRight: CARD_SPACING }]}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: `https:${item.cover.url.replace('t_thumb', 't_cover_big')}` }}
                style={styles.cardImage}
                resizeMode="cover"
              />

              <View style={styles.discountTag}>
                <Text style={styles.discountText}>‑30%</Text>
              </View>

              <View style={styles.priceTag}>
                <Text style={styles.priceText}>R$ 129,90</Text>
              </View>
            </View>

            <Text style={styles.gameName} numberOfLines={2}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default GameCarousel;