import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../(redux)/store';
import { User } from '@/types';

const Profile = () => {
    const  {user}  = useSelector((state: RootState) => state.auth.user);
   
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
<Image
  source={{
    uri: user
      ?  'https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg'
      : 'https://i.pinimg.com/736x/42/ee/46/42ee4666b21e3e1204ad55456d5f1dd7.jpg',
  }}
  style={styles.profileImage}
/>
<Text style={styles.name}>{user.name || 'Name not available'}</Text>
<Text style={styles.email}>{user.email || 'Email not available'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"#fff"
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});


export default Profile;
