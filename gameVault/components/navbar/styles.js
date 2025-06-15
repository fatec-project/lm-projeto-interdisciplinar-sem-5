import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#051923',
    borderBottomWidth: 1,
    borderBottomColor: '#284b63',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  iconsContainer: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  cartBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#6200ee',
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