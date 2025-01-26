import React, { useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, TextInput } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

const movies = [
  { id: 1, title: "Inception", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
  { id: 2, title: "The Dark Knight", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
  { id: 3, title: "Interstellar", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
  { id: 4, title: "Pulp Fiction", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
]

const sessions = [
  { id: 1, title: "Stranger Things", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
  { id: 2, title: "Breaking Bad", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
  { id: 3, title: "The Crown", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
  { id: 4, title: "Game of Thrones", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
]

const categories = ["All", "Action", "Comedy", "Drama", "Sci-Fi"]

export default function LandingPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("All")

  const renderContent = (items:any, title:any) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {items.map((item:any) => (
          <TouchableOpacity key={item.id} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemTitleContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchBar} placeholder="Search movies and series" placeholderTextColor="#999" />
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="options-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.featuredContent}>
        <Image
          source={{ uri: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" }}
          style={styles.featuredImage}
        />
        <View style={styles.featuredOverlay}>
          <Text style={styles.featuredTitle}>Featured: The Mandalorian</Text>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={24} color="#000" />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, activeCategory === category && styles.activeCategoryButton]}
            onPress={() => setActiveCategory(category)}
          >
            <Text style={[styles.categoryButtonText, activeCategory === category && styles.activeCategoryButtonText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {renderContent(movies, "🎬 Popular Movies")}
      {renderContent(sessions, "📺 Trending Sesions")}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    paddingHorizontal: 15,
    color: "#fff",
    marginRight: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
  },
  featuredContent: {
    height: 250,
    marginBottom: 20,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    padding: 20,
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  playButtonText: {
    color: "#000",
    fontWeight: "bold",
    marginLeft: 5,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: 10,
  },
  categoryButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  activeCategoryButton: {
    backgroundColor: "#fff",
  },
  activeCategoryButtonText: {
    color: "#000",
  },
  section: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
  },
  horizontalScroll: {
    paddingRight: 20,
  },
  itemCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 15,
    width: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  itemImage: {
    width: "100%",
    height: 200,
  },
  itemTitleContainer: {
    padding: 10,
    height: 60,
    justifyContent: "center",
  },
  itemTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
})

