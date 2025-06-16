import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useUser } from '../../../context/UserContext';
import GameVaultAPI from '../../../backend/index.js';

const RatingComponent = ({ gameId, canRate }) => {
  const { user } = useUser();
  const [totalRatings, setTotalRatings] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likesPercentage, setLikesPercentage] = useState(0);
  const [dislikesPercentage, setDislikesPercentage] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      if (!user?.id || !gameId) return;
      try {
        const rating = await GameVaultAPI.avaliacoes.buscar(user.id, gameId);
        setUserRating(rating?.gostou ?? null);
      } catch (error) {
        console.error('Error fetching user rating:', error);
      }
    };

    fetchRating();
  }, [user?.id, gameId]);

  useEffect(() => {
    const calculateApproval = async () => {
      if (!gameId) return;
      try {
        const ratings = await GameVaultAPI.avaliacoes.listarPorJogo(gameId);
        if (ratings.length === 0) {
          setTotalRatings(0);
          setLikes(0);
          setDislikes(0);
          setLikesPercentage(0);
          setDislikesPercentage(0);
          return;
        }

        const likesCount = ratings.filter(r => r.gostou === true).length;
        const dislikesCount = ratings.filter(r => r.gostou === false).length;
        const total = likesCount + dislikesCount;

        const likesPct = ((likesCount / total) * 100);
        const dislikesPct = ((dislikesCount / total) * 100);

        setTotalRatings(total);
        setLikes(likesCount);
        setDislikes(dislikesCount);
        setLikesPercentage(likesPct);
        setDislikesPercentage(dislikesPct);
      } catch (error) {
        console.error('Error calculating approval:', error);
      }
    };

    calculateApproval();
  }, [gameId, userRating]);

  const handleRate = async (gostou) => {
    if (!user?.id) {
      Alert.alert('Atenção', 'Você precisa estar logado para avaliar jogos');
      return;
    }

    setLoading(true);
    try {
      if (userRating === gostou) {
        await GameVaultAPI.avaliacoes.remover(user.id, gameId);
        setUserRating(null);
      } else {
        await GameVaultAPI.avaliacoes.criar(gameId, user.id, gostou);
        setUserRating(gostou);
      }
    } catch (error) {
      console.error('Error rating game:', error);
      Alert.alert('Erro', error.message || 'Não foi possível avaliar o jogo');
    } finally {
      setLoading(false);
    }
  };

  const getRatingText = () => {
    if (totalRatings === 0) return 'Nenhuma avaliação ainda';
    if (likesPercentage >= 80) return 'Muito bom';
    if (likesPercentage >= 60) return 'Bom';
    if (likesPercentage >= 40) return 'Neutro';
    if (likesPercentage >= 20) return 'Ruim';
    return 'Muito ruim';
  };

  const getIcon = () => {
    if (totalRatings === 0) return 'help-circle';
    if (likesPercentage >= 60) return 'thumbs-up';
    else if (likesPercentage >= 40) return 'help-circle';
    else return 'thumbs-down'
  };

  const getIconColor = () => {
    if (totalRatings === 0) return '#e0e0e0';
    if (likesPercentage >= 60) return '#2dc653';
    else if (likesPercentage >= 40) return '#e0e0e0';
    else return '#ff5a5f'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Avaliação dos Jogadores</Text>

      <View style={styles.ratingContainer}>
        <Ionicons
          name={getIcon()}
          size={40}
          color={getIconColor()}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.ratingText}>{getRatingText()}</Text>
          <Text style={styles.percentageText}>
            {totalRatings} {totalRatings === 1 ? 'avaliação' : 'avaliações'}
          </Text>
        </View>
      </View>

      {/* Barra de Aprovação */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${likesPercentage}%`,
              backgroundColor: '#2dc653',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              borderTopRightRadius: likesPercentage === 100 ? 5 : 0,
              borderBottomRightRadius: likesPercentage === 100 ? 5 : 0,
            },
          ]}
        />
        <View
          style={[
            styles.progressBar,
            {
              width: `${dislikesPercentage}%`,
              backgroundColor: '#ff5a5f',
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              borderTopLeftRadius: dislikesPercentage === 100 ? 5 : 0,
              borderBottomLeftRadius: dislikesPercentage === 100 ? 5 : 0,
            },
          ]}
        />
      </View>

      {/* Contadores */}
      <View style={styles.countersContainer}>
        <View style={styles.counterItem}>
          <Text style={styles.counterLabel}>👍 Gostaram</Text>
          <Text style={[styles.counterValue, { color: '#2dc653' }]}>{likes}</Text>
        </View>
        <View style={styles.counterItem}>
          <Text style={styles.counterLabel}>👎 Não gostaram</Text>
          <Text style={[styles.counterValue, { color: '#ff5a5f' }]}>{dislikes}</Text>
        </View>
      </View>

      {/* Botões */}
      {canRate && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.rateButton,
              userRating === true ? styles.likeButtonActive : styles.likeButton,
              loading && { opacity: 0.5 }
            ]}
            onPress={() => handleRate(true)}
            disabled={loading}
          >
            <Ionicons 
              name="thumbs-up" 
              size={20} 
              color={userRating === true ? '#fff' : '#2dc653'} 
            />
            <Text style={[
              styles.buttonText,
              { color: userRating === true ? '#fff' : '#2dc653' }
            ]}>
              Gostei
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.rateButton,
              userRating === false ? styles.dislikeButtonActive : styles.dislikeButton,
              loading && { opacity: 0.5 }
            ]}
            onPress={() => handleRate(false)}
            disabled={loading}
          >
            <Ionicons 
              name="thumbs-down" 
              size={20} 
              color={userRating === false ? '#fff' : '#ff5a5f'} 
            />
            <Text style={[
              styles.buttonText,
              { color: userRating === false ? '#fff' : '#ff5a5f' }
            ]}>
              Não Gostei
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RatingComponent;