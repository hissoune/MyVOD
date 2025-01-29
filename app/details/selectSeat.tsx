import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const SelectSeat = () => {
    const { session } = useLocalSearchParams();
    const sessionObject = session ? JSON.parse(decodeURIComponent(session as string)) : null;

    const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

    

    const handleSelectSeat = (seatNumber: number) => {
        setSelectedSeat(seatNumber);
    };

    if (!sessionObject) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No session details available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Session Details</Text>
            <Text style={styles.sessionText}>📅 Date: {new Date(sessionObject.dateTime).toLocaleString()}</Text>
            <Text style={styles.sessionText}>🎬 Movie: {sessionObject.movie.title}</Text>
            <Text style={styles.sessionText}>🏠 Room: {sessionObject.room.name}</Text>
            <Text style={styles.sessionText}>💰 Price: ${sessionObject.price}</Text>

            <Text style={styles.title}>Select Your Seat</Text>
            <ScrollView >
                <View style={styles.seatContainer}>
                {sessionObject.seats.map((seat:any, index:any) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.seat,
                            seat.available ? styles.availableSeat : styles.unavailableSeat,
                            selectedSeat === seat.number && styles.selectedSeat,
                        ]}
                        onPress={() => seat.available && handleSelectSeat(seat.number)}
                    >
                        <Text style={styles.seatText}>{seat.number}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            </ScrollView>
            {selectedSeat && (
                <Text style={styles.selectedSeatText}>
                    You have selected seat {selectedSeat}
                </Text>
            )}
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
    sessionText: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
    },
    seatContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        justifyContent: 'center',
    },
    seat: {
        width: 50,
        height: 50,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    availableSeat: {
        backgroundColor: '#28a745', // Green for available
    },
    unavailableSeat: {
        backgroundColor: '#dc3545', // Red for unavailable
    },
    selectedSeat: {
        borderWidth: 2,
        borderColor: '#ffc107', // Yellow border when selected
    },
    seatText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedSeatText: {
        color: '#ffc107',
        fontSize: 18,
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});

export default SelectSeat;
