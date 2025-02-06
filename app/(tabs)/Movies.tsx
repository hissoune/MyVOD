import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, RefreshControl, TextInput, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchMovies } from '../(redux)/moviesSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { replaceIp } from '@/hooks/helpers';
import { RootState } from '../(redux)/store';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Movies = () => {
  const dispatch = useAppDispatch();
  const { movies, status } = useSelector((state: RootState) => state.movies);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const [visibleMovies, setVisibleMovies] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Action", "Comedy", "Drama", "Sci-Fi"];
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const filterMovies = (movies: any[]) => {
    if (searchQuery) {
      return movies.filter((movie: any) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    }else {
      return movies
    }
    
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredMovies = filterMovies(movies);
    setVisibleMovies(filteredMovies.slice(0, page * ITEMS_PER_PAGE));
  };

  const loadMoreMovies = () => {
    if (visibleMovies.length < movies.length) {
      const nextPageMovies = filterMovies(movies.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE));
      setPage((prevPage) => prevPage + 1);
      setVisibleMovies((prevMovies) => [...prevMovies, ...nextPageMovies]);
    }
  };

  const handlePress = (item: any) => {
    const movieData = encodeURIComponent(JSON.stringify(item));
    router.push(`/details/moviesDetails?movie=${movieData}`);
  };

  const renderMovieCard = ({ item }: { item: any }) => (
    <TouchableOpacity key={item._id} style={styles.cardContainer} onPress={() => handlePress(item)}>
      <Image
        source={{ uri: replaceIp(item.posterImage, `${process.env.EXPO_PUBLIC_REPLACE}`) }}
        style={styles.movieImage}
      />
      <View style={styles.movieInfoContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (visibleMovies.length < movies.length) {
      return (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreMovies}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <Text style={styles.endText}>You have reached the end of the list.</Text>
      );
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchMovies())
      .then(() => {
        setRefreshing(false);
        handleSearch(searchQuery); 
      })
      .catch(() => setRefreshing(false));
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    const filteredMovies = filterMovies(movies);
    setVisibleMovies(filteredMovies.slice(0, page * ITEMS_PER_PAGE)); 
  }, [movies]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="search" size={24} color="#fff" />
        <TextInput 
          style={styles.searchBar} 
          placeholder="Search movies and series" 
          placeholderTextColor="#999" 
          value={searchQuery}
          onChangeText={handleSearch} 
        />
      </View>

     <View>
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
     </View>

      {status === 'loading' && visibleMovies.length === 0 ? (
        <Text style={styles.loadingText}>Loading Movies...</Text>
      ) : (
        <FlatList
          data={visibleMovies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
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
    marginLeft: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    overflow: 'hidden',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  movieInfoContainer: {
    padding: 10,
    alignItems: 'center',
  },
  movieTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  loadMoreButton: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  endText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 15,
  },
  itemTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  iconButton: {
    width: 50,
    height: 40,
    borderRadius: 2,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    flexDirection: "row",   
    alignItems: "center",  
    marginTop: 20,  
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
    fontWeight:"bold",
    fontSize: 14,
  },

  activeCategoryButton: {
    backgroundColor: "#fff",  
    borderColor: "#fff",
  },

  activeCategoryButtonText: {
    color: "#000",      
    fontWeight: "bold",
  },
});

export default Movies;
