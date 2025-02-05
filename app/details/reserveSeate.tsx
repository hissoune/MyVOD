import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../(redux)/store';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchSessionsForMovies } from '../(redux)/sessionsSlice';

const ReserveSeate = () => {
    const { movie } = useLocalSearchParams();
    const movieObject = movie ? JSON.parse(decodeURIComponent(movie as string)) : null;

    if (!movieObject) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No movies available</Text>
            </View>
        );
    }
const router = useRouter()

    const { user } = useSelector((state: RootState) => state.auth);
    const { sessions, status, error } = useSelector((state: RootState) => state.sessions);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (movieObject._id) {
            dispatch(fetchSessionsForMovies(movieObject._id));
        }
    }, [dispatch, movieObject._id]);

    if (status === 'loading') {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading Sessions...</Text>
            </View>
        );
    }

    if (status === 'failed') {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    const handleReserveSeat = (session:any) => {
        const sessionData = encodeURIComponent(JSON.stringify(session));

        router.push(`/details/selectSeat?sessiondata=${sessionData}`);  
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Sessions:</Text>
            <FlatList
                data={sessions}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.sessionCard}>
                        <Text style={styles.sessionText}>📅 Date: {new Date(item.dateTime).toLocaleString()}</Text>
                        <Text style={styles.sessionText}>💰 Price: ${item.price}</Text>
                        <Text style={styles.sessionText}>🎬 Movie: {item.movie.title}</Text>
                        <Text style={styles.sessionText}>🏠 Room: {item.room.name}</Text>
                        <Text style={styles.sessionText}>🪑 Available Seats: {item.seats.length}</Text>
                        
                        <TouchableOpacity 
                            style={styles.reserveButton} 
                            onPress={() => handleReserveSeat(item)}>
                            <Text style={styles.reserveButtonText}>🪑 Reserve Seat</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sessionCard: {
        backgroundColor: '#1E1E1E',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    sessionText: {
        color: '#fff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    loadingText: {
        color: '#fff',
        fontSize: 18,
    },
    reserveButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ff6f00',
        borderRadius: 5,
        alignItems: 'center',
    },
    reserveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ReserveSeate;
