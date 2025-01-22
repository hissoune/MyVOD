import React from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { StatusBar } from "expo-status-bar"

const { width, height } = Dimensions.get("window")

export default function LandingPage() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Image source={require("../../assets/images/7c2d20bbb14eac6d2e02a3360632cb4b.jpg")} style={styles.logo} />
        <Text style={styles.title}>Welcome to CinemaWorld</Text>
      </View>

      <View style={styles.featuredMovie}>
        <Image source={require("../../assets/images/7c2d20bbb14eac6d2e02a3360632cb4b.jpg")} style={styles.featuredImage} />
        <View style={styles.overlay}>
          <Text style={styles.featuredTitle}>Featured Movie</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Now Showing</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.movieCard}>
              <Image source={require(`../../assets/images/7c2d20bbb14eac6d2e02a3360632cb4b.jpg`)} style={styles.movieImage} />
              <Text style={styles.movieTitle}>Movie {item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Explore All Movies</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  featuredMovie: {
    width: width,
    height: height * 0.4,
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    padding: 20,
  },
  featuredTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#E50914",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  movieCard: {
    marginRight: 15,
    width: 120,
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  movieTitle: {
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#E50914",
    margin: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  ctaButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})

