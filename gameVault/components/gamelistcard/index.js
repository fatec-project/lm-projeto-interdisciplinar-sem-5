import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const GameListCard = ({ game, isCartItem = false, onRemove }) => {
  const navigation = useNavigation();

  if (!game || !game.cover || !game.cover.url) {
    console.warn('Jogo inválido recebido no GameListCard:', game);
    return null;
  }

  // Construir URL da imagem de forma segura
  const getCoverUrl = () => {
    try {
      let url = game.cover.url;
      if (!url.startsWith('http')) {
        url = `https:${url}`;
      }
      return url.replace('t_thumb', 't_cover_big');
    } catch (error) {
      console.error('Erro ao processar URL da capa:', error);
      return 'https://via.placeholder.com/264x352?text=No+Cover';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('GameDetails', { game })}
      activeOpacity={0.7}
    >
      <View style={styles.coverContainer}>
        <Image
          source={{ uri: getCoverUrl() }}
          style={styles.coverImage}
          resizeMode="cover"
          onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
        />
        <View style={styles.coverFold} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.gameName} numberOfLines={2} ellipsizeMode="tail">
          {game.name || 'Nome não disponível'}
        </Text>
        
        {isCartItem ? (
          <View style={styles.cartPriceContainer}>
            <Text style={styles.finalPrice}>R$ 129,90</Text>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={(e) => {
                e.stopPropagation();
                onRemove?.();
              }}
            >
              <Ionicons name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.priceContainer}>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-30%</Text>
            </View>
            <Text style={styles.originalPrice}>R$ 167,70</Text>
            <Text style={styles.finalPrice}>R$ 129,90</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default GameListCard;