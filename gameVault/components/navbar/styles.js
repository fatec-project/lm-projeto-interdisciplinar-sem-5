import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#051923',
    borderBottomWidth: 1,
    borderBottomColor: '#284b63',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingTop: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoButton: {
    padding: 2.5,
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  userGreeting: {
    fontSize: 18,
    color: '#e0e0e0',
  },
  userName: {
    fontWeight: 'bold',
    color: '#e0e0e0', 
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  cartBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#ff6b6b', // Vermelho claro
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default styles;