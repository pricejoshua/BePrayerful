import React from 'react';
import { render } from 'react-dom';
import Button from '../components/AButton';
import { StyleSheet, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

export default function UserScreen({ navigation, route }) {
    console.log(route.params.user);
    const user = route.params.user;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{user.name}</Text>
            <FastImage style={styles.image} source={{ uri: user.profile_pic }} />
            <Button title="Add Friend" onPress={() => {}} />
            <Button title="Back" onPress={() => navigation.goBack()} />
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
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    image: {
        borderRadius: 200,
        width: 200,
        height: 200,
        borderWidth: 3,
        borderColor: "black",
    }
});
