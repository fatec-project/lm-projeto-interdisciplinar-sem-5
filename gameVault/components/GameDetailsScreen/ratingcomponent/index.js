import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const RatingComponent = ({ approvalPercentage = 75 }) => {
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
    ratingIcon = 'thumbs-up-down';
  } else if (approvalPercentage >= 20) {
    ratingText = 'Ruim';
    ratingColor = '#ff9966'; 
    ratingIcon = 'thumbs-down';
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
    </View>
  );
};

export default RatingComponent;