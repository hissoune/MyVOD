import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, Alert, ActivityIndicator } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { logoutAction } from "../(redux)/authSlice"
import { useSelector } from "react-redux"
import { fetchMovies } from "../(redux)/moviesSlice"
import { RootState } from "../(redux)/store"
import { replaceIp } from "@/hooks/helpers"
import AntDesign from '@expo/vector-icons/AntDesign';


const sessions = [
  { id: 1, title: "Stranger Things", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
  { id: 2, title: "Breaking Bad", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
  { id: 3, title: "The Crown", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
  { id: 4, title: "Game of Thrones", image: "https://i.pinimg.com/736x/7c/bf/f8/7cbff88448f4c039850e5604fd36d08e.jpg" },
]

const categories = ["All", "Action", "Comedy", "Drama", "Sci-Fi"]

export default function LandingPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("All");
  const dispatch = useAppDispatch()
  const { movies, status } = useSelector((state:RootState) => state.movies);
  const latestMovie = movies && movies.length > 0 
  ? [...movies].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())[0] 
  : null;
  
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => dispatch(logoutAction()) }
      ]
    );
  };
  const handlePress = (item:any) => {
    const movieData = encodeURIComponent(JSON.stringify(item));
    router.push(`/details/moviesDetails?movie=${movieData}`);  
  };

const renderContent = (items: any, title: string, name: string) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {name === "movies"
          ? items.map((item: any) => (
              <TouchableOpacity key={item._id} style={styles.itemCard}>
                <Image
                  source={{ uri: replaceIp(item.posterImage, "192.168.8.235") }}
                  style={styles.itemImage}
                />
                <View style={styles.itemTitleContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))
          : items.map((item: any) => (
              <TouchableOpacity key={item.id} style={styles.itemCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.itemImage}
                />
                <View style={styles.itemTitleContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </View>
  );
  

  if (status == 'loading') {
    return <ActivityIndicator color={'white'}/>
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
        <AntDesign name="logout" size={24} color="#fff" />
                  {/* <Text style={styles.itemTitle}>logout</Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.featuredContent}>
  {latestMovie ? (
    <>
      <Image
        source={{ uri: replaceIp(latestMovie.posterImage, '192.168.8.235') }}
        style={styles.featuredImage}
      />
      <View style={styles.featuredOverlay}>
        <Text style={styles.featuredTitle}>{latestMovie.title}</Text>
        <Text style={styles.featuredTitle}>{latestMovie.duration} min</Text>
        <TouchableOpacity style={styles.playButton} onPress={()=>handlePress(latestMovie)}>
          <Ionicons name="play" size={24} color="#000" />

          <Text style={styles.playButtonText}>show details</Text>
        </TouchableOpacity>
      </View>
    </>
  ) : (
    <ActivityIndicator size="large" color="white" />
  )}
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

      {renderContent(movies, "🎬 Popular Movies","movies")}
      {renderContent(sessions, "📺 Trending Sesions","sessions")}
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
    width: 50,
    height: 40,
    borderRadius: 2,
    backgroundColor: "red",
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
    width: 200,
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

