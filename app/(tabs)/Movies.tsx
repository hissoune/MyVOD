import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchMovies } from '../(redux)/moviesSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { replaceIp } from '@/hooks/helpers';
import { RootState } from '../(redux)/store';
import { useRouter } from 'expo-router';

const Movies = () => {
  const dispatch = useAppDispatch();
  const { movies, status } = useSelector((state: RootState) => state.movies);
  const [refreshing, setRefreshing] = useState(false);
const router = useRouter()
  const [visibleMovies, setVisibleMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies.length) {
      setVisibleMovies(movies.slice(0, page * ITEMS_PER_PAGE));
    }
  }, [movies, page]);

  const loadMoreMovies = () => {
    if (visibleMovies.length < movies.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePress = (item:any) => {
    const movieData = encodeURIComponent(JSON.stringify(item));
    router.push(`/details/moviesDetails?movie=${movieData}`);  
  };

  const renderMovieCard = ({ item }: { item: any }) => (
    <TouchableOpacity key={item._id} style={styles.cardContainer} onPress={()=>handlePress(item)}>
      <Image
        source={{ uri: replaceIp(item.posterImage, '192.168.8.254') }}
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
      .then(() => setRefreshing(false)) 
      .catch(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
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
});

export default Movies;
