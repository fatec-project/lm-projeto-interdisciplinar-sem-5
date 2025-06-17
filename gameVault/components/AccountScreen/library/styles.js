import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#051923',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameItem: {
    flex: 1,
    margin: 8,
    maxWidth: '48%',
    backgroundColor: '#0a2d42',
    borderRadius: 10,
    overflow: 'hidden', // Para garantir que a imagem respeite o borderRadius
    borderWidth: 1,
    borderColor: '#284b63',
  },
  gameImage: {
    width: '100%',
    aspectRatio: 3/4, // Proporção comum para capas de jogos
    borderRadius: 8,
  },
  gameTitle: {
    color: '#e0e0e0',
    padding: 8, // Adicionado padding apenas ao texto
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: '#0a2d42', // Fundo para o texto
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#e0e0e0',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#2dc653',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;