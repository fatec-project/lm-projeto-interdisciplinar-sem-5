import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#0a2d42',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#284b63',
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
    color: '#e0e0e0',
    marginBottom: 3,
  },
  percentageText: {
    color: '#e0e0e0',
    fontSize: 14,
    opacity: 0.8,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#2a3a4a',
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
  },
  countersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  counterItem: {
    alignItems: 'center',
  },
  counterLabel: {
    color: '#e0e0e0',
    fontSize: 14,
    marginBottom: 4,
  },
  counterValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '48%',
    borderWidth: 2,
  },
  likeButton: {
    backgroundColor: 'transparent',
    borderColor: '#2dc653',
  },
  likeButtonActive: {
    backgroundColor: '#2dc653',
    borderColor: '#2dc653',
  },
  dislikeButton: {
    backgroundColor: 'transparent',
    borderColor: '#ff5a5f',
  },
  dislikeButtonActive: {
    backgroundColor: '#ff5a5f',
    borderColor: '#ff5a5f',
  },
  buttonText: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;