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
    color: '#e0e0e0',
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
    flexDirection: 'row',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '48%',
  },
  likeButton: {
    backgroundColor: '#2a3a4a',
  },
  dislikeButton: {
    backgroundColor: '#2a3a4a',
  },
  activeButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default styles;
