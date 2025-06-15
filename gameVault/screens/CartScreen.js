import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import GameVaultAPI from '../backend/index.js';
import { useUser } from '../context/UserContext';

const CartScreen = ({ navigation }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('pix');

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      
      try {
        const carrinho = await GameVaultAPI.carrinho.listar(user.id);
        // Simulação de busca dos jogos - substitua pela sua lógica real
        const jogosDoCarrinho = carrinho.map(item => ({
          id: item.jogoId,
          name: `Jogo ${item.jogoId}`,
          cover: { url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.jpg' },
          price: 129.90,
          quantity: item.quantidade
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
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleRemoveItem = async (jogoId) => {
    try {
      await GameVaultAPI.carrinho.remover(user.id, jogoId);
      setCartItems(cartItems.filter(item => item.id !== jogoId));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o item do carrinho');
    }
  };

  const handleUpdateQuantity = async (jogoId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await GameVaultAPI.carrinho.remover(user.id, jogoId);
      await GameVaultAPI.carrinho.adicionar(user.id, jogoId, newQuantity);
      
      setCartItems(cartItems.map(item => 
        item.id === jogoId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a quantidade');
    }
  };

  const handleCheckout = () => {
    Alert.alert(
      'Compra Finalizada',
      `Pagamento via ${paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito'} no valor de R$ ${calculateTotal().toFixed(2)}`,
      [
        { 
          text: 'OK', 
          onPress: async () => {
            try {
              await GameVaultAPI.carrinho.limpar(user.id);
              navigation.goBack();
            } catch (error) {
              console.error('Erro ao limpar carrinho:', error);
            }
          }
        }
      ]
    );
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
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Ionicons 
              name="remove-circle" 
              size={24} 
              color={item.quantity <= 1 ? '#ccc' : '#6200ee'} 
            />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
            <Ionicons name="add-circle" size={24} color="#6200ee" />
          </TouchableOpacity>
        </View>
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
            onPress={() => navigation.navigate('Loja')}
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    color: '#fff',
    marginHorizontal: 12,
    fontSize: 16,
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