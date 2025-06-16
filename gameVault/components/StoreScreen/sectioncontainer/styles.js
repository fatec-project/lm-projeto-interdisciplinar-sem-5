import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 12,
    marginTop: 30,
    marginHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 16,
    position: 'relative',
    overflow: 'visible',
  },
  titleOuter: {
    position: 'absolute',
    top: -20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e0e0e0', 
    backgroundColor: '#051923',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    marginTop: 10,
    overflow: 'visible',
  },
});

export default styles;