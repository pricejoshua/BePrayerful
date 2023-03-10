import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import Button from '../components/AButton';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ navigation }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const user = auth().currentUser;

    if (image == null && user.photoURL) {
        setImage(user.photoURL);
    }

    const update = () => {
        setLoading(true);
        setError('');
        database().ref('users/' + user.uid).set({
            name: name,
            email: email,
        }).then(() => {
            console.log('User updated!');
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setError('Update failed.');
            setLoading(false);
        });
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            ref = storage().ref('profile-pictures/' + user.uid);
            await ref.putFile(result.assets[0].uri);
            database().ref('users/' + user.uid).update({
                profile_pic: await ref.getDownloadURL(),
            }).then(() => {
                console.log('Profile picture updated!');
            }).catch((error) => {
                console.log(error);
            });
            // update the user's profile picture
            user.updateProfile({
                photoURL: await ref.getDownloadURL(),
            }).then(() => {
                console.log('Profile picture updated!');
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={name => setName(name)}
                value={name}
            />
            <Text>{user.name}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={email => setEmail(email)}
                value={email}
            />
            <Text>{user.email}</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={password => setPassword(password)}
                value={password}
            />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <Button title="Change Profile Picture" onPress={pickImage} />
            </View>
            <Button title="Update" onPress={update} />
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Sign Out" onPress={() => auth().signOut()} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 60,
        paddingBottom: 60,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    image: {
        borderRadius: 200,
        width: 200,
        height: 200,
        borderWidth: 3,
        borderColor: "black",
    }
  });