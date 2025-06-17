import React, { useEffect, useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  ActivityIndicator,
  NetInfo
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../components/navbar';
import Carousel from '../components/StoreScreen/carouselbanner';
import SectionContainer from '../components/StoreScreen/sectioncontainer';
import GameCarousel from '../components/StoreScreen/gamecarousel';
import GameListCard from '../components/gamelistcard';
import FloatingAccountButton from '../components/floatingaccountbutton';

const StoreScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

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
    sega: {
      title: "Promoção SEGA!",
      color: "#023e8a",
      image: require('../assets/Banner4.png'),
      ids: [150010, 217623, 114283, 120278]
    },
  };

  const bannerGames = [
    { id: 338067, source: require('../assets/Banner1.png') },
    { id: 347668, source: require('../assets/Banner2.png') },
    { id: 171233, source: require('../assets/Banner3.png') },
    { section: 'sega', source: require('../assets/Banner4.png') }
  ];

  const trendIds = [251833, 31551, 305152, 325594, 284716, 132181];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const BACKEND_URL = "https://test-five-beta-98.vercel.app/game/";
        const promises = trendIds.map(id =>
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
  }, []);

  const navigateToSection = (section) => {
    navigation.navigate('Section', { 
      title: section.title,
      color: section.color,
      image: section.image,
      gameIds: section.ids
    });
  };

  const handleBannerPress = (item) => {
    if (item.id) {
      navigation.navigate('GameDetails', { game: { id: item.id } });
    } else if (item.section && sections[item.section]) {
      navigateToSection(sections[item.section]);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setGames([]);
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        const fetchGames = async () => {
        };
        fetchGames();
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar />
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Carousel
          artworks={bannerGames} 
          onItemPress={handleBannerPress}
        />

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

        {!isConnected ? (
          <View style={styles.connectionContainer}>
            <Text style={styles.errorText}>Sem conexão com a internet</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={handleRetry}
            >
              <Text style={styles.retryText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : loading ? (
          <ActivityIndicator size="large" color="#2dc653" style={styles.loading} />
        ) : games.length === 0 ? (
          <Text style={styles.errorText}>Nenhum jogo encontrado</Text>
        ) : (
          games.map(game => (
            <GameListCard key={game.id} game={game} />
          ))
        )}
      </ScrollView>
      <FloatingAccountButton />
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
    paddingBottom: 80,
  },
  sectionTitle: {
    color: '#e0e0e0',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  loading: {
    marginVertical: 40,
  },
  errorText: {
    color: '#e0e0e0',
    textAlign: 'center',
    marginVertical: 20,
  },
  connectionContainer: {
    alignItems: 'center',
    padding: 20,
  },
  retryButton: {
    backgroundColor: '#2dc653',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StoreScreen;