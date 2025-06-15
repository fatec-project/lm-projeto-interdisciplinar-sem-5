import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Platform, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../components/navbar';
import Carousel from '../components/StoreScreen/carouselbanner';
import SectionContainer from '../components/StoreScreen/sectioncontainer';
import GameCarousel from '../components/StoreScreen/gamecarousel';
import GameListCard from '../components/gamelistcard';

const StoreScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const bannerGames = [
    { id: 338067, source: require('../assets/Banner1.png') },
    { id: 347668, source: require('../assets/Banner2.png') },
    { id: 171233, source: require('../assets/Banner3.png') },
    { id: 325594, source: require('../assets/Banner4.png') }
  ];

  const sections = {
    newReleases: {
      title: "Novos Lançamentos",
      color: "#2dc653",
      image: require('../assets/new-releases-bg.png'),
      ids: [338067, 331204, 325591, 337024]
    },
    rpgs: {
      title: "Jogos de RPG",
      color: "#faa307",
      image: require('../assets/rpg-bg.png'),
      ids: [171233, 1877, 267306, 2155]
    },
  };

  const trendIds = [251833, 31551, 305152, 325594, 284716, 132181]; 

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const BACKEND_URL = "https://igdb-test-production.up.railway.app/game/";
        const promises = trendIds.map(id => 
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
  }, []);

  const navigateToSection = (section) => {
    navigation.navigate('SectionScreen', { 
      title: section.title,
      color: section.color,
      image: section.image,
      gameIds: section.ids
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar navigation={navigation}/>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Carousel artworks={bannerGames} />

        <SectionContainer 
          title={sections.newReleases.title} 
          containerColor={sections.newReleases.color}
          onPress={() => navigateToSection(sections.newReleases)}>
            <GameCarousel gameIds={sections.newReleases.ids} />
        </SectionContainer>

        <SectionContainer 
          title={sections.rpgs.title} 
          containerColor={sections.rpgs.color}
          onPress={() => navigateToSection(sections.rpgs)}>
            <GameCarousel gameIds={sections.rpgs.ids} />
        </SectionContainer>

        <Text style={styles.sectionTitle}>Recomendados</Text>

        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : (
          games.map(game => (
            <GameListCard key={game.id} game={game} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#051923',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'android' ? 20 : 16,
  },
  sectionHeader: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#e0e0e0',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  loadingText: {
    color: '#e0e0e0',
    textAlign: 'center',
    marginVertical: 20,
  },
});


export default StoreScreen;