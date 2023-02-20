import { Text, StyleSheet, View, FlatList, Image } from "react-native";
import Button from "../components/AButton";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { render } from "react-dom";



export default function UsersScreen({ navigation }) {

    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    class User {
        constructor(uid, name, email, profile_pic) {
            this.uid = uid;
            this.name = name;
            this.email = email;
            this.profile_pic = profile_pic;
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getUsers(); 
            setLoading(false);
        }, 1000);
    }, []);

    const getUsers = () => {
        database()
            .ref('users')
            .on('value', snapshot => {
                let data = snapshot.val();
                const userList = {};
                const users = [];

                for (let key in data) {
                    userList[key] = data[key];
                }

                const userDict = {};

                

                for (let key in userList) {
                    let user = userList[key];
                    user.uid = key;
                    storage().ref('profile-pictures/' + auth().currentUser.uid).getDownloadURL().then((url) => {
                        user.profile_pic = url;
                    })
                    // user.profile_pic = storage().ref('profile-pictures/' + user.uid).getDownloadURL();
                    users.push(user);
                    userDict[key] = user;
                }



                console.log("users" , users);
                setUsers(users);
            });
    }

    const renderItem = ({ item }) => {
        return (
            <Item name={item.name} email={item.email} profile_url={item.profile_pic} />
        );
    }

    const Item = ({ name, email, profile_url }) => (
        <View>
            <Text>{name}</Text>
            <Text>{email}</Text>
            <Image source={{uri: profile_url}} style={{width: 50, height: 50}} />
        </View>
    );


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>
            {!loading ? (
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={item => item.uid}
                />
            ) : (
                <Text>Loading...</Text>
            )
            }

            <Button title="Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Sign Out" onPress={() => auth().signOut()} />
        </View>
    );
}

export const styles = StyleSheet.create({
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
    }
  });