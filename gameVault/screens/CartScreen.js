import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import GameVaultAPI from '../backend/index.js';
import { useUser } from '../context/UserContext';

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
        const carrinho = await GameVaultAPI.carrinho.listar(user.id);
        const BACKEND_URL = "https://igdb-test-production.up.railway.app/game/";

        const promises = carrinho.map(item =>
          fetch(`${BACKEND_URL}${item.jogoId}`).then(res => res.json())
        );

        const jogos = await Promise.all(promises);
        const jogosValidos = jogos.filter(game => game && game.cover);

        const jogosDoCarrinho = jogosValidos.map(game => ({
          id: game.id,
          name: game.name,
          cover: { url: `https:${game.cover.url}` },
          price: game.price || 129.90 // Se não houver preço na API, usa um padrão
        }));

        setCartItems(jogosDoCarrinho);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
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
      // Adicionar todos os jogos do carrinho à biblioteca
      for (const item of cartItems) {
        await GameVaultAPI.biblioteca.adicionar(user.id, item.id);
      }
      
      // Limpar o carrinho
      await GameVaultAPI.carrinho.limpar(user.id);
      
      Alert.alert(
        'Compra Finalizada',
        `Pagamento via ${paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito'} realizado com sucesso!`,
        [
          { 
            text: 'OK', 
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      Alert.alert('Erro', 'Não foi possível finalizar a compra');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.cover.url }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Ionicons name="trash" size={20} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando carrinho...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('StoreMain')}
          >
            <Text style={styles.browseButtonText}>Explorar Loja</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
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
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.paymentButton,
                  paymentMethod === 'credit' && styles.paymentButtonSelected
                ]}
                onPress={() => setPaymentMethod('credit')}
              >
                <Text style={styles.paymentButtonText}>Crédito</Text>
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
              <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 20,
  },
  browseButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
  },
  browseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 80,
    borderRadius: 4,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 8,
  },
  removeButton: {
    padding: 8,
  },
  paymentContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  paymentButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#333',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  paymentButtonSelected: {
    backgroundColor: '#6200ee',
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;