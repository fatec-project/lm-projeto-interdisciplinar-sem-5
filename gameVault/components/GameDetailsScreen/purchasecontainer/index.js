import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GameVaultAPI from '../../../backend/index.js';
import styles from './styles';

const PurchaseContainer = ({ originalPrice, discount, finalPrice, onAddToCart, disabled }) => {
  return (
    <View style={styles.container}>
      <View style={styles.priceSection}>
        <View style={styles.discountContainer}>
          <Text style={styles.discountText}>{discount}</Text>
        </View>
        
        <View style={styles.priceDetails}>
          <Text style={styles.originalPrice}>{originalPrice}</Text>
          <Text style={styles.finalPrice}>{finalPrice}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.button, styles.addToCartButton, disabled && styles.disabledButton]}
        onPress={onAddToCart}
        disabled={disabled}
      >
        <Ionicons name="cart" size={20} color="#fff" />
        <Text style={styles.buttonText}>
          {disabled ? 'Indisponível' : 'Adicionar ao Carrinho'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PurchaseContainer;