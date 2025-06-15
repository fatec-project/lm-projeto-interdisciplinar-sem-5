import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useUser } from '../../../context/UserContext';
import GameVaultAPI from '../../../backend/index.js';

const RatingComponent = ({ gameId }) => {
  const { user } = useUser();
  const [approvalPercentage, setApprovalPercentage] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
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
          setApprovalPercentage(0);
          setLikes(0);
          setDislikes(0);
          return;
        }

        const likesCount = ratings.filter(r => r.gostou === true).length;
        const dislikesCount = ratings.filter(r => r.gostou === false).length;
        const total = likesCount + dislikesCount;

        const newPercentage = Math.round((likesCount / total) * 100);

        setApprovalPercentage(newPercentage);
        setLikes(likesCount);
        setDislikes(dislikesCount);
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

  const total = likes + dislikes;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Avaliação dos Jogadores</Text>

      <View style={styles.ratingContainer}>
        <Ionicons
          name={
            approvalPercentage >= 60
              ? 'thumbs-up'
              : approvalPercentage > 0
              ? 'thumbs-down'
              : 'help-circle'
          }
          size={40}
          color={
            approvalPercentage >= 60
              ? '#2dc653'
              : approvalPercentage > 0
              ? '#ff5a5f'
              : '#e0e0e0'
          }
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.ratingText}>
            {total === 0
              ? 'Nenhuma avaliação ainda'
              : `${approvalPercentage}% de aprovação`}
          </Text>
          <Text style={styles.percentageText}>
            {total} {total === 1 ? 'avaliação' : 'avaliações'}
          </Text>
        </View>
      </View>

      {/* Barra de Aprovação */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${total > 0 ? (likes / total) * 100 : 0}%`,
              backgroundColor: '#2dc653',
            },
          ]}
        />
        <View
          style={[
            styles.progressBar,
            {
              width: `${total > 0 ? (dislikes / total) * 100 : 0}%`,
              backgroundColor: '#ff5a5f',
            },
          ]}
        />
      </View>

      {/* Legenda */}
      <View style={styles.legendContainer}>
        <Text style={{ color: '#2dc653' }}>👍 {likes}</Text>
        <Text style={{ color: '#ff5a5f' }}>👎 {dislikes}</Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.rateButton,
            styles.likeButton,
            userRating === true && styles.activeButton,
          ]}
          onPress={() => handleRate(true)}
          disabled={loading}
        >
          <Ionicons name="thumbs-up" size={20} color="#fff" />
          <Text style={styles.buttonText}>Gostei</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.rateButton,
            styles.dislikeButton,
            userRating === false && styles.activeButton,
          ]}
          onPress={() => handleRate(false)}
          disabled={loading}
        >
          <Ionicons name="thumbs-down" size={20} color="#fff" />
          <Text style={styles.buttonText}>Não Gostei</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RatingComponent;
