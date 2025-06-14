import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#e0e0e0',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  percentageText: {
    color: '#e0e0e0',
    fontSize: 14,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#2a3a4a',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
});

export default styles;