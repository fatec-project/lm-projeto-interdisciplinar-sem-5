import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import GameVaultAPI from '../backend/index.js';
import { useUser } from '../context/UserContext';
import GameListCard from '../components/gamelistcard';

const CartScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('pix');

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;

      try {
        const BACKEND_URL = "https://igdb-test-production.up.railway.app/game/";
        const carrinho = await GameVaultAPI.carrinho.listar(user.id);

        if (!carrinho.length) {
          setCartItems([]);
          return;
        }

        const promises = carrinho.map(item =>
          fetch(`${BACKEND_URL}${item.jogoId}`).then(res => res.json())
        );

        const results = await Promise.allSettled(promises);

        const jogosComCapa = results
          .filter(result => result.status === 'fulfilled' && result.value && result.value.cover)
          .map(result => {
            const game = result.value;
            return {
              id: game.id,
              name: game.name,
              cover: {
                url: `https:${game.cover.url.replace('t_thumb', 't_cover_big_2x')}`
              },
              price: game.price || 129.90
            };
          });

        setCartItems(jogosComCapa);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        Alert.alert('Erro', 'Não foi possível carregar o carrinho');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleRemoveItem = async (jogoId) => {
    try {
      await GameVaultAPI.carrinho.remover(user.id, jogoId);
      setCartItems(cartItems.filter(item => item.id !== jogoId));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o item do carrinho');
    }
  };

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        await GameVaultAPI.biblioteca.adicionar(user.id, item.id);
      }

      await GameVaultAPI.carrinho.limpar(user.id);

      Alert.alert(
        'Compra Finalizada',
        `Pagamento via ${paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito'} realizado com sucesso!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      Alert.alert('Erro', 'Não foi possível finalizar a compra');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2dc653" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#e0e0e0" />
          </TouchableOpacity>
          <Ionicons name="cart-outline" size={80} color="#4f5d75" />
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('StoreMain')}
          >
            <Text style={styles.browseButtonText}>Explorar Loja</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#e0e0e0" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Meu Carrinho</Text>
          </View>
          
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.gameCardContainer}>
                <GameListCard 
                  game={item} 
                  isCartItem={true}
                  onRemove={() => handleRemoveItem(item.id)}
                />
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
          
          <View style={styles.paymentContainer}>
            <Text style={styles.sectionTitle}>Método de Pagamento</Text>
            
            <View style={styles.paymentMethods}>
              <TouchableOpacity
                style={[
                  styles.paymentButton,
                  paymentMethod === 'pix' && styles.paymentButtonSelected
                ]}
                onPress={() => setPaymentMethod('pix')}
              >
                <Text style={styles.paymentButtonText}>PIX</Text>
                <Text style={styles.paymentMethodBonus}>10% de desconto</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.paymentButton,
                  paymentMethod === 'credit' && styles.paymentButtonSelected
                ]}
                onPress={() => setPaymentMethod('credit')}
              >
                <Text style={styles.paymentButtonText}>Crédito</Text>
                <Text style={styles.paymentMethodBonus}>3x sem juros</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>R$ {calculateTotal().toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>FINALIZAR COMPRA</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#051923',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#051923',
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 1,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e0e0e0',
    textAlign: 'center',
    flex: 1,
    marginRight: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 15,
    padding: 30,
  },
  emptyText: {
    fontSize: 18,
    color: '#e0e0e0',
    marginVertical: 20,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#2dc653',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gameCardContainer: {
    marginHorizontal: 10,
    marginBottom: 0,
  },
  listContent: {
    paddingBottom: 10,
  },
  paymentContainer: {
    backgroundColor: '#0a2d42',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#284b63',
  },
  sectionTitle: {
    color: '#e0e0e0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#284b63',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#2dc653',
  },
  paymentButtonSelected: {
    backgroundColor: '#2dc653',
    borderColor: '#2dc653',
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentMethodBonus: {
    color: '#e0e0e0',
    fontSize: 12,
    marginTop: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#284b63',
  },
  totalLabel: {
    color: '#e0e0e0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#2dc653',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#2dc653',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default CartScreen;