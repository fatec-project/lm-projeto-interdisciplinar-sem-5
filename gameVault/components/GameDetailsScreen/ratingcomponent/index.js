// components/GameDetailsScreen/ratingcomponent/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useUser } from '../../../context/UserContext';
import GameVaultAPI from '../../../backend/index.js';

const RatingComponent = ({ gameId }) => {
  const { user } = useUser();
  const [approvalPercentage, setApprovalPercentage] = useState(0);
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
          return;
        }

        const likes = ratings.filter(r => r.gostou).length;
        const newPercentage = Math.round((likes / ratings.length) * 100);
        setApprovalPercentage(newPercentage);
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
        // Remove a avaliação se clicar no mesmo botão novamente
        await GameVaultAPI.avaliacoes.remover(user.id, gameId);
        setUserRating(null);
      } else {
        // Adiciona/atualiza a avaliação
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

  let ratingText = '';
  let ratingColor = '';
  let ratingIcon = '';

  if (approvalPercentage >= 80) {
    ratingText = 'Muito bom';
    ratingColor = '#2dc653'; 
    ratingIcon = 'thumbs-up';
  } else if (approvalPercentage >= 60) {
    ratingText = 'Bom';
    ratingColor = '#7dd181'; 
    ratingIcon = 'thumbs-up';
  } else if (approvalPercentage >= 40) {
    ratingText = 'Neutro';
    ratingColor = '#ffcc00'; 
    //ratingIcon = 'thumbs-up-down';
  } else if (approvalPercentage >= 20) {
    ratingText = 'Ruim';
    ratingColor = '#ff9966'; 
    ratingIcon = 'thumbs-down';
  } else if (approvalPercentage === 0) {
    ratingText = 'Nenhuma avaliação ainda';
    ratingColor = '#ff9966';
    //ratingIcon = ''
  } else {
    ratingText = 'Muito ruim';
    ratingColor = '#ff5a5f'; 
    ratingIcon = 'thumbs-down';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Avaliação dos Jogadores</Text>
      
      <View style={styles.ratingContainer}>
        <Ionicons name={ratingIcon} size={40} color={ratingColor} style={styles.icon} />
        
        <View style={styles.textContainer}>
          <Text style={[styles.ratingText, { color: ratingColor }]}>{ratingText}</Text>
          <Text style={styles.percentageText}>{approvalPercentage}% de aprovação</Text>
        </View>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${approvalPercentage}%`,
              backgroundColor: ratingColor
            }
          ]}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[
            styles.rateButton, 
            styles.likeButton,
            userRating === true && styles.activeButton
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
            userRating === false && styles.activeButton
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