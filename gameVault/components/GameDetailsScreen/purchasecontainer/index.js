import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const PurchaseContainer = ({ originalPrice, discount, finalPrice, onAddToCart, onAddToWishlist }) => {
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
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.addToCartButton]}
          onPress={onAddToCart}
        >
          <Ionicons name="cart" size={20} color="#fff" />
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.wishlistButton]}
          onPress={onAddToWishlist}
        >
          <Ionicons name="heart" size={20} color="#2dc653" />
          <Text style={[styles.buttonText, {color: '#2dc653'}]}>Lista de Desejos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PurchaseContainer;