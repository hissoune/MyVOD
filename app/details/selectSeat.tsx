import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import {createReservation, updateSession} from '@/app/(redux)/sessionsSlice'
import { useSelector } from 'react-redux';
import { RootState } from '../(redux)/store';
const SelectSeat = () => {    
    const { sessiondata } = useLocalSearchParams();

  const sessionObject = sessiondata ? JSON.parse(decodeURIComponent(sessiondata as string)):null
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const dispatch = useAppDispatch()
  const {session } = useSelector((state:RootState)=>state.sessions)

  useEffect(()=>{
    dispatch(updateSession(sessionObject))
  },[dispatch])

const handelReservation =async (session:string,seats:number | null )=>{
 
    if (!seats) {
        Alert.alert("Error", "Please select a seat before reserving.");
        return;
    }
    try {
     const response = await dispatch(createReservation({session,seats}))
     if (response) {

        
      
        Alert.alert(
            "Reservation Successful",
            `Your seat ${seats} has been reserved successfully!`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
     }else{
        Alert.alert(
            "failed",
         
        );
     }
  
} catch (error) {
    Alert.alert("Reservation Failed", "Something went wrong. Please try again.");
}

}
    const handleSelectSeat = (seatNumber: number) => {
        setSelectedSeat(seatNumber);
        
    };

    if (!session) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No session details available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Session Details</Text>
            <Text style={styles.sessionText}>📅 Date: {new Date(session.dateTime).toLocaleString()}</Text>
            <Text style={styles.sessionText}>🎬 Movie: {session.movie.title}</Text>
            <Text style={styles.sessionText}>🏠 Room: {session.room.name}</Text>
            <Text style={styles.sessionText}>💰 Price: ${session.price}</Text>

            <Text style={styles.title}>Select Your Seat</Text>
            <ScrollView >
                <View style={styles.seatContainer}>
                {session.seats.map((seat:any, index:any) => (
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
                <View>
                    <TouchableOpacity style={styles.reserveButton} onPress={()=>handelReservation(session._id.toString(),selectedSeat)}>
                        <Text style={styles.reserveButtonText}> Reserve Now </Text>
                    </TouchableOpacity>
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
        backgroundColor: '#28a745', 
    },
    unavailableSeat: {
        backgroundColor: '#dc3545', 
    },
    selectedSeat: {
        borderWidth: 2,
        borderColor: '#ffc107', 
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
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});

export default SelectSeat;
