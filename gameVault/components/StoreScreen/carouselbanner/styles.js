import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginBottom: 20,
  },
  imageContainer: {
    width: width,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
});

export default styles;