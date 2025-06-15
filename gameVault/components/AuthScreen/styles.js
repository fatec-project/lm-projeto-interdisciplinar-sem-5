import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2dc653',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#7a8fa6',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 42,
    borderColor: '#284b63',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(5, 25, 35, 0.6)',
    color: '#fff',
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#284b63',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: 'rgba(5, 25, 35, 0.6)',
  },
  passwordInput: {
    flex: 1,
    height: 42,
    paddingHorizontal: 12,
    color: '#fff',
    fontSize: 14,
  },
  eyeButton: {
    padding: 8,
  },
  button: {
    backgroundColor: '#2dc653',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  link: {
    alignItems: 'center',
  },
  linkText: {
    color: '#7a8fa6',
    fontSize: 13,
  },
  linkHighlight: {
    color: '#00b4d8',
    fontWeight: 'bold',
  },
});

export default styles;