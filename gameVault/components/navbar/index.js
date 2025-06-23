import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  Animated,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';
import GameVaultAPI from '../../backend/index.js';
import styles from './styles';

const NavBar = ({ showSearchBar = false, onSearchChange }) => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const searchAnim = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef(null);
  const searchTimeout = useRef(null);

  // Função para lidar com mudanças no texto de pesquisa
  const handleSearchChange = useCallback((text) => {
    setSearchQuery(text);
    
    // Debounce para evitar muitas requisições
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    searchTimeout.current = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(text);
      }
    }, 500); // 500ms de delay após a digitação
  }, [onSearchChange]);

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

  useEffect(() => {
    if (showSearchBar) {
      Animated.timing(searchAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start(() => {
        searchInputRef.current?.focus();
      });
    } else {
      Animated.timing(searchAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start();
    }

    // Limpa o timeout quando o componente desmonta
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [showSearchBar]);

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const toggleSearch = () => {
    if (showSearchBar) {
      setSearchQuery('');
      if (onSearchChange) {
        onSearchChange('');
      }
      navigation.goBack();
    } else {
      navigation.navigate('SearchScreen');
    }
  };

  const paddingTop = Platform.OS === 'android' ? 
    (StatusBar.currentHeight || 0) + 15 : 
    15;

  const searchWidth = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  const logoOpacity = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  return (
    <>
      {Platform.OS === 'android' && <StatusBar backgroundColor="#051923" barStyle="light-content" />}
      <View style={[styles.navBar, { paddingTop }]}>
        <View style={[styles.leftContainer, { position: 'relative' }]}>
          <Animated.View style={{ opacity: logoOpacity }}>
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
          </Animated.View>

          {!showSearchBar && user && (
            <Text style={styles.userGreeting}>
              Olá, <Text style={styles.userName}>{user.nome.split(' ')[0]}!</Text>
            </Text>
          )}

          <Animated.View style={[styles.searchContainer, { width: searchWidth }]}>
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Buscar jogos..."
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={handleSearchChange}
              returnKeyType="search"
            />
          </Animated.View>
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={toggleSearch}
          >
            <Ionicons 
              name={showSearchBar ? "close" : "search"} 
              size={24} 
              color="#e0e0e0" 
            />
          </TouchableOpacity>

          {!showSearchBar && (
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
          )}
        </View>
      </View>
    </>
  );
};

export default NavBar;