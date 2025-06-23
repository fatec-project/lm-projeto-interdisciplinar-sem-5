import React, { useState, useEffect, useRef } from 'react';
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

const NavBar = ({ showSearchBar = false }) => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const searchAnim = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef(null);

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
      // Animação para mostrar a barra de pesquisa
      Animated.timing(searchAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start(() => {
        searchInputRef.current?.focus();
      });
    } else {
      // Animação para esconder a barra de pesquisa
      Animated.timing(searchAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start();
    }
  }, [showSearchBar]);

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const toggleSearch = () => {
    if (showSearchBar) {
      setSearchQuery('');
      navigation.goBack();
    } else {
      navigation.navigate('SearchScreen');
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.length > 2) {
      navigation.navigate('SearchScreen', { query: searchQuery });
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
          {/* Logo com animação de fade out */}
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

          {/* Saudação do usuário (somente quando não está pesquisando) */}
          {!showSearchBar && user && (
            <Text style={styles.userGreeting}>
              Olá, <Text style={styles.userName}>{user.nome.split(' ')[0]}!</Text>
            </Text>
          )}

          {/* Barra de pesquisa animada */}
          <Animated.View style={[styles.searchContainer, { width: searchWidth }]}>
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Buscar jogos..."
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchSubmit}
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