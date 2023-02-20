import { Text, StyleSheet, View, FlatList } from "react-native";
import FastImage from "react-native-fast-image";
import Button from "../components/AButton";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { render } from "react-dom";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";



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
                    users.push(user);
                    userDict[key] = user;
                }

                setUsers(users);
            });
    }

    const renderItem = ({ item }) => {
        return (
            <Item user={ item }/>
        );
    }

    const Item = ({ user }) => (
        <Pressable style={styles.userView} onPress={() => navigation.navigate('User', {user})}>
            <FastImage style={styles.profileImage} source={{uri: user.profile_pic}} />
            <View style={styles.userText}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
            </View>
        </Pressable>
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
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
    },
    userView: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 10,
    },
    userText: {
        marginLeft: 10,
    }
  });