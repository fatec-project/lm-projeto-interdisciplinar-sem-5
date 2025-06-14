import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a2a3a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 25,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  discountContainer: {
    backgroundColor: '#2dc653',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 15,
  },
  discountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  priceDetails: {
    flexDirection: 'column',
  },
  originalPrice: {
    color: '#a0a0a0',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  finalPrice: {
    color: '#e0e0e0',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#2dc653',
  },
  wishlistButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2dc653',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default styles;