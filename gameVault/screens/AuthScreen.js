import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import Login from '../components/AuthScreen/login';
import Register from '../components/AuthScreen/register';

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <ImageBackground 
      source={require('../assets/auth-banner.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.formWrapper}>
          {isLogin ? (
            <Login 
              navigation={navigation} 
              onSwitchAuth={toggleAuthMode} 
            />
          ) : (
            <Register 
              navigation={navigation} 
              onSwitchAuth={toggleAuthMode} 
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  formWrapper: {
    backgroundColor: 'rgba(10, 45, 66, 0.85)',
    marginHorizontal: 25,
    borderRadius: 15,
    padding: 20,
    paddingBottom: 25,
  },
});

export default AuthScreen;