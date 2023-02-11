// A basic profile screen with an edit button
//

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function ProfileScreen({ navigation }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const user = auth().currentUser;

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={name => setName(name)}
                value={name}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                onChangeText={age => setAge(age)}
                value={age}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={email => setEmail(email)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                onChangeText={address => setAddress(address)}
                value={address}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                onChangeText={phone => setPhone(phone)}
                value={phone}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={password => setPassword(password)}
                value={password}
            />
            <Button title="Update" onPress={update} />
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Sign Out" onPress={() => auth().signOut()} />
        </View>
    );

}