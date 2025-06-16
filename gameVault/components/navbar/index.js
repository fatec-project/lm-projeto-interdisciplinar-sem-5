import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
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
        setCartCount(carrinho.length);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    };

    fetchCartCount();
  }, [user]);

  const handleCartPress = () => {
    try {
      console.log('Attempting to navigate to CartScreen');
      navigation.navigate('Cart');
    } catch (error) {
      console.error('Failed to navigate to CartScreen:', error);
      // Alternativa para navegação aninhada:
      // navigation.navigate('StoreMain', { screen: 'CartScreen' });
    }
  };

  return (
    <>
      {Platform.OS === 'android' && <StatusBar backgroundColor="#051923" barStyle="light-content" />}
      <View style={[styles.navBar, { paddingTop }]}>
        <View style={styles.leftContainer}>
          <TouchableOpacity 
            style={styles.logoButton}
            onPress={() => navigation.navigate('StoreMain')}
          >
            <Image 
              source={require('../../assets/key.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          {user && (
            <Text style={styles.userGreeting}>
              Olá, <Text style={styles.userName}>{user.nome.split(' ')[0]}!</Text>
            </Text>
          )}
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('SearchScreen')}
          >
            <Ionicons name="search" size={24} color="#e0e0e0" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={handleCartPress}
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
