import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PurchaseContainer from '../components/GameDetailsScreen/purchasecontainer';
import ScreenshotCarousel from '../components/GameDetailsScreen/screenshotcarousel';
import RatingComponent from '../components/GameDetailsScreen/ratingcomponent';
import GameVaultAPI from '../backend/index.js';
import { useUser } from '../context/UserContext';

const { width } = Dimensions.get('window');

const GameDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useUser();
  const { game } = route.params;
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [isInLibrary, setIsInLibrary] = useState(false);

  useEffect(() => {
    if (!game?.id) return;

    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://test-five-beta-98.vercel.app/game/${game.id}`);
        const data = await response.json();

        setGameDetails(data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        setLoading(false);
      }
    };

    const checkGameStatus = async () => {
      if (!user.id) return;
      
      try {
        // Executa ambas verificações em paralelo
        const [biblioteca, carrinho] = await Promise.all([
          GameVaultAPI.biblioteca.listar(user.id),
          GameVaultAPI.carrinho.listar(user.id)
        ]);

        setIsInLibrary(biblioteca.some(item => item.jogoId === game.id));
        setIsInCart(carrinho.some(item => item.jogoId === game.id));
      } catch (error) {
        console.error('Erro ao verificar status do jogo:', error);
      }
    };

    fetchGameDetails();
    checkGameStatus();
  }, [game.id, user.id]);

  if (loading || !gameDetails) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#051923' }}>
        <ActivityIndicator size="large" color="#2dc653" />
      </View>
    );
  }

  const artworkUrl = gameDetails.artworks?.length > 0 
    ? `https:${gameDetails.artworks[0].url.replace('t_thumb', 't_1080p')}`
    : null;

  const coverUrl = gameDetails.cover?.url 
    ? `https:${gameDetails.cover.url.replace('t_thumb', 't_cover_big')}`
    : null;

  const handleAddToCart = async () => {
    if (!user) {
      Alert.alert('Atenção', 'Você precisa estar logado para adicionar itens ao carrinho');
      return;
    }

    if (isInLibrary) {
      Alert.alert('Atenção', 'Você já possui este jogo na sua biblioteca');
      return;
    }

    if (isInCart) {
      Alert.alert('Atenção', 'Este jogo já está no seu carrinho');
      return;
    }

    try {
      await GameVaultAPI.carrinho.adicionar(user.id, game.id);
      setIsInCart(true);
      Alert.alert('Sucesso', 'Jogo adicionado ao carrinho com sucesso!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Erro', error.message || 'Não foi possível adicionar o jogo ao carrinho');
    }
  };

  const canRateGame = isInLibrary && user.id;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {artworkUrl && (
          <View style={styles.artworkContainer}>
            <ImageBackground
              source={{ uri: artworkUrl }}
              style={styles.artworkBackground}
              blurRadius={10}
            >
              <LinearGradient
                colors={['rgba(5, 25, 35, 0.9)', 'rgba(5, 25, 35, 0.5)', 'transparent']}
                style={styles.gradient}
              />
            </ImageBackground>
          </View>
        )}
        
        {coverUrl && (
          <View style={styles.coverContainer}>
            <Image
              source={{ uri: coverUrl }}
              style={styles.coverImage}
            />
          </View>
        )}
        
        <View style={styles.content}>
          <Text style={styles.title}>{gameDetails.name}</Text>

          <PurchaseContainer
            originalPrice="R$ 199,90"
            discount="-30%"
            finalPrice="R$ 139,90"
            onAddToCart={handleAddToCart}
            disabled={isInCart || isInLibrary}
          />
          
          {gameDetails.screenshots?.length > 0 && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Screenshots</Text>
              <ScreenshotCarousel screenshots={gameDetails.screenshots} />
            </View>
          )}
          
          {gameDetails.summary && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Sobre o Jogo</Text>
              <Text style={styles.description}>{gameDetails.summary}</Text>
            </View>
          )}
        </View>

        <RatingComponent 
          gameId={game.id} 
          canRate={canRateGame}
        />

      </ScrollView>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#051923',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  artworkContainer: {
    height: 250,
    width: '100%',
  },
  artworkBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  coverContainer: {
    position: 'absolute',
    top: 180,
    left: 20,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  coverImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  content: {
    marginTop: 60,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e0e0e0',
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#e0e0e0',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    color: '#e0e0e0',
    fontSize: 16,
    lineHeight: 24,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameDetailsScreen;