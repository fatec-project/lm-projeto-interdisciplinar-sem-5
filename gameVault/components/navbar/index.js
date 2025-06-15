import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';
import GameVaultAPI from '../../backend/index.js';
import styles from './styles';

const NavBar = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [cartCount, setCartCount] = useState(0);
  const paddingTop = Platform.OS === 'android' ? 
    (StatusBar.currentHeight || 0) + 15 : 
    15;

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user) return;
      
      try {
        const carrinho = await GameVaultAPI.carrinho.listar(user.id);
        const count = carrinho.reduce((total, item) => total + item.quantidade, 0);
        setCartCount(count);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    };

    fetchCartCount();
  }, [user]);

  return (
    <>
      {Platform.OS === 'android' && <StatusBar backgroundColor="#051923" barStyle="light-content" />}
      <View style={[styles.navBar, { paddingTop }]}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>Game Vault</Text>
          {user && <Text style={styles.userName}>{user.nome}</Text>}
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="#e0e0e0" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('CartScreen')}
          >
            <View style={styles.cartBadge}>
              <Ionicons name="cart" size={24} color="#e0e0e0" />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default NavBar;