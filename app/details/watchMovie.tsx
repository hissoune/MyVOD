import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Video } from 'expo-av';
import { useRef } from 'react';
import { replaceIp } from '@/hooks/helpers';
import { array } from 'yup';

const WatchMovie = () => {
    const { movie } = useLocalSearchParams();
    const movieObject = movie ? JSON.parse(decodeURIComponent(movie as string)) : null;
    const videoRef = useRef(null);

    if (!movieObject || !movieObject.videoUrl) {
        return <View style={styles.container}><Text style={styles.errorText}>No video available</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={{ uri:replaceIp(movieObject.videoUrl, '192.168.8.254') }}
                style={styles.video}
                resizeMode='contain'
                useNativeControls
                shouldPlay
                
            />
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
    errorText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default WatchMovie;
