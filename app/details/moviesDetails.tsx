import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { replaceIp } from '@/hooks/helpers';
import { AirbnbRating } from 'react-native-ratings';
import { useSelector } from 'react-redux';
import { RootState } from '../(redux)/store';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addFavorite } from '../(redux)/authSlice';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { rateMmovie, updateMovie } from '../(redux)/moviesSlice';
import { addcomment, getAllComments } from '../(redux)/commentsSlice';
import CommentItem from '@/components/CommentItem';
import { Ionicons } from "@expo/vector-icons"; 

const MoviesDetails = () => {
  const { movieData } = useLocalSearchParams();
  const movieObject = movieData ? JSON.parse(decodeURIComponent(movieData as string)) : null;
const router = useRouter()
const dispatch = useAppDispatch()


const {movie}=useSelector((state:RootState)=>state.movies)
const {user}=useSelector((state:RootState)=>state.auth)
const {comments}=useSelector((state:RootState)=>state.comments)
const [userRating, setUserRating] = useState(0);
const [visibleComments, setVisibleComments] = useState<any[]>([]);
const [loadedCount, setLoadedCount] = useState(10);
useEffect(()=>{
  if(!movie || movie._id != movieObject._id){
    dispatch(updateMovie(movieObject))
    dispatch(getAllComments(movieObject._id))
}
},[dispatch,movieObject,comments])

useEffect(()=>{
  
  const ret =movie?.ratings.filter((rate:any) => rate.userId === user?._id)[0]?.rating|| 0;

  setUserRating(ret)  

},[movie, user ]); 

useEffect(() => {
  if (comments) {
    setVisibleComments(comments.slice(0, 10)); 
  }
}, [comments]);

const loadMoreComments = () => {
  const nextComments = comments.slice(0, loadedCount + 3);
  setVisibleComments(nextComments);
  setLoadedCount(prev => prev + 3);
};

  const [content, setContent] = useState('');
 

  const addComment = (movieId:string,content:string) => {
    if (content.trim()) {
      dispatch(addcomment({movieId,content}))
      setContent('');
    }
  };

  if (!movie) {
    return <Text>Loading...</Text>;
  }

 

 
  const addToFavorite = async (movieId:string)=>{
    
       await dispatch(addFavorite(movieId))
  }
  const submitRating = async (movieId:string,rating:number) => {

    if (rating > 0) {
      try {
      await dispatch(rateMmovie({movieId,rating}))
        alert("Rating submitted successfully!");
      } catch (error) {
        alert("Failed to submit rating");
      }
    } else {
      alert("Please select a rating");
    }
  };
  const handlePress = (item:any) => {
    const movieData = encodeURIComponent(JSON.stringify(item));
    router.push(`/details/watchMovie?movie=${movieData}`);  
  };
  const handlePressReservation = (item:any) => {
    const movieData = encodeURIComponent(JSON.stringify(item));
    router.push(`/details/reserveSeate?movie=${movieData}`);  
  };
  const handlePressPayment =(item:any)=>{
    const movieData = encodeURIComponent(JSON.stringify(item));

    router.push(`/details/payment?movieData=${movieData}`);
  }
  return (
   
 <ScrollView  contentContainerStyle={styles.container}>
      <Image source={{ uri: replaceIp(movie.posterImage,  `${process.env.EXPO_PUBLIC_REPLACE}`) }} style={styles.posterImage} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.description}>{movie.description}</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.releaseDate}>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</Text>
          <Text style={styles.genre}>Genres: {movie.genre.join(', ')}</Text>
          <Text style={styles.duration}>Duration: {movie.averageRating} minutes</Text>
        </View>

        <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Average Rating:</Text>
        <AirbnbRating
            count={5}
            defaultRating={movie.averageRating }
            size={30}
            isDisabled={true} 
            showRating={false}
            starContainerStyle={styles.starContainer}
        />
        </View>

        <View style={styles.userRatingContainer}>
        <Text style={styles.ratingLabel}>Your Rating:</Text>
        <AirbnbRating
            count={5}
            size={30}
            defaultRating={userRating}
            showRating={true}
            onFinishRating={(rating)=>setUserRating(rating)}
        />
        <TouchableOpacity style={styles.submitRatingButton} onPress={()=>submitRating(movie._id,userRating)}>
            <Text style={styles.submitRatingText}>Submit Rating</Text>
        </TouchableOpacity>
        </View>

        {user?.favorites?.includes(movie._id)?(
            <TouchableOpacity style={styles.favoriteButton} onPress={()=>addToFavorite(movie._id)}>
           <MaterialIcons name="favorite" size={32} color="red" />
        </TouchableOpacity>
        ):(
            <TouchableOpacity style={styles.favoriteButton} onPress={()=>addToFavorite(movie._id)}>
          <MaterialIcons name="favorite-border" size={32} color="white" />
             </TouchableOpacity>
        )

        }
        

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.watchButton} onPress={()=>handlePress(movie)}>
            <Text style={styles.buttonText}>Watch Movie</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reserveButton} onPress={()=>{handlePressReservation(movie)}}>
            <Text style={styles.buttonText}>Reserve Seat</Text>
          </TouchableOpacity>
          
        </View>

        <View style={styles.container}>
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => handlePressPayment(movie)}
      >
        <Ionicons name="card-outline" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Subscribe Now</Text>
      </TouchableOpacity>
    </View>
          

          <View style={styles.commentsSection}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            placeholderTextColor="#bbb"
            value={content}
            onChangeText={setContent}
            onSubmitEditing={() => addComment(movie._id, content)}
          />
          <TouchableOpacity onPress={() => addComment(movie._id, content)} style={styles.addCommentButton}>
            <Text style={styles.addCommentText}>Post Comment</Text>
          </TouchableOpacity>
           
          <FlatList
            data={visibleComments}
            renderItem={({ item }) => <CommentItem commentobj={item} />}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={()=>loadMoreComments}
            onEndReachedThreshold={0.5} 
            scrollEnabled={false}
            
          />
          {
            (visibleComments.length < comments.length) ?(
                <TouchableOpacity onPress={loadMoreComments} style={{ marginTop: 10, alignSelf: 'center' }}>
            <Text style={{ color: 'gray' }}>------------ Load More Comments ------------</Text>
          </TouchableOpacity>
            ):(
              <Text style={{ color: 'gray' }}>------------ end of Comments ------------</Text>

            )
          }
        
        </View>
        </View>
    </ScrollView>

    
   
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  profilecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:10
  },
  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
  },
  icon: {
    marginRight: 10,
  },
  
  posterImage: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 15,
  },
  infoContainer: {
    marginBottom: 15,
  },
  releaseDate: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 5,
  },
  genre: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 5,
  },
  duration: {
    fontSize: 16,
    color: '#aaa',
  },
  ratingContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1c40f', 
  },
  starContainer: {
    marginVertical: 10,
  },
  favoriteButton: {
    paddingHorizontal: 2,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#fff",
    marginVertical:10,
    flex:1,
    justifyContent:"center",
    alignItems:"center"
    
  },
  favoriteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  watchButton: {
    backgroundColor: '#1abc9c',
    borderRadius: 5,
    paddingVertical: 12,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  reserveButton: {
    backgroundColor: '#e67e22',
    borderRadius: 5,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentsSection: {
    marginTop: 20,
  },
  commentInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  addCommentButton: {
    backgroundColor: '#f1c40f',
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addCommentText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentList: {
    marginTop: 15,
  },
  commentText: {
    color: '#fff',
    fontSize: 12,
    fontFamily:'',
    marginBottom: 8,
  },
  userRatingContainer: {
    marginTop: 20,
  },
  submitRatingButton: {
    backgroundColor: '#f1c40f',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  submitRatingText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoviesDetails;
