import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const OnBoarding = () => {
  const router = useRouter();
  function handleGetStarted() {
    router.push('/screens/SignIn');

  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/landing.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          style={styles.gradient}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            Welcome to Shipmart Shop
          </Text>
          <Text style={styles.subtitle}>Your favorite products, just a tap away.</Text>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <LinearGradient colors={['#63bb41', 'rgb(212, 204, 90)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 300,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: '#d5d1d8',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffef08',
    marginBottom: 30,
    opacity: 0.8,
    textAlign: 'center'
  },
  button: {
    width: '100%',
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: 'bold',
  }
});
