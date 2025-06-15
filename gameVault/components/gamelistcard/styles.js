import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#284b63',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    height: 120,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  coverContainer: {
    width: 100,
    height: '100%',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverFold: {
    position: 'absolute',
    right: -10,
    top: 0,
    width: 0,
    height: 0,
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 60,
    borderTopColor: '#284b63',
    borderBottomWidth: 60,
    borderBottomColor: '#284b63',
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  gameName: {
    color: '#e0e0e0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  discountBadge: {
    backgroundColor: '#2dc653',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  originalPrice: {
    color: '#a0a0a0',
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  finalPrice: {
    color: '#e0e0e0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});