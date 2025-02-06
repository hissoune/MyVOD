import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Video ,ResizeMode} from 'expo-av';
import { useRef, useState } from 'react';
import { replaceIp } from '@/hooks/helpers';

const WatchMovie = () => {
    const { movie } = useLocalSearchParams();
    const movieObject = movie ? JSON.parse(decodeURIComponent(movie as string)) : null;
    const videoRef = useRef<Video | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    if (!movieObject || !movieObject.videoUrl) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No video available</Text>
            </View>
        );
    }

    const togglePlayback = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
            } else {
                await videoRef.current.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={{ uri: replaceIp(movieObject.videoUrl,  `${process.env.EXPO_PUBLIC_REPLACE}`) }}
                style={styles.video}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
            />
            <TouchableOpacity onPress={togglePlayback} style={styles.button}>
                <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    video: {
        width: '100%',
        height: 300,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#1DB954',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default WatchMovie;
