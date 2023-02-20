import PeopleGroup from "../components/PeopleGroup";
import { Text, StyleSheet, View, Pressable } from "react-native";
import FastImage from "react-native-fast-image";
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import Button from "../components/AButton";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const test_photo_url = "https://via.placeholder.com/150";


export default function HomeScreen({ navigation }) {
    const [photo_uri, setPhotoUri] = useState(test_photo_url);

    // Set up the profile picture from the firebase database storage
    
    database().ref('users/' + auth().currentUser.uid).on('value', snapshot => {
        let data = snapshot.val();
        if (data.profile_pic) {
            setPhotoUri(data.profile_pic);
        } else {
            setPhotoUri(test_photo_url);
        }
    });
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>BePrayerful</Text>
                <PeopleGroup />
                <Button title="Sign Out" onPress={() => auth().signOut()} />
            </View>
            <Pressable style={styles.profileImagePressable} onPress={() => navigation.navigate('Profile')}>
                <FastImage style={styles.profileImage} source={{uri: photo_uri }} />
            </Pressable>
            <Pressable style={styles.addFriendButton} onPress={() => navigation.navigate('Users')}>
                <AntDesign name="adduser" size={50} color="black" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 40,
    },
    title: {
      fontSize: 30,
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
    profileImagePressable: {
        top: 10,
        right: 5,
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        overflow: "hidden",
    },
    addFriendButton: {
        top: 10,
        left: 5,
        position: "absolute",
        width: 50,
        height: 50
    },
  });