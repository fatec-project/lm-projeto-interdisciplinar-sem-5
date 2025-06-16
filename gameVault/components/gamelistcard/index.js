import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const GameListCard = ({ game }) => {
  const navigation = useNavigation();

  if (!game || !game.cover) return null;

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('GameDetails', { game })}
    >
      <View style={styles.coverContainer}>
        <Image
          source={{ uri: `https:${game.cover.url.replace('t_thumb', 't_cover_big')}` }}
          style={styles.coverImage}
        />
        <View style={styles.coverFold} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.gameName} numberOfLines={2}>{game.name}</Text>
        
        <View style={styles.priceContainer}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-30%</Text>
          </View>
          <Text style={styles.originalPrice}>R$ 167,70</Text>
          <Text style={styles.finalPrice}>R$ 129,90</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GameListCard;