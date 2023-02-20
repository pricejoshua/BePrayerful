import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, { useState } from 'react';
import { ImageBackground, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

const __doCreateUser = async (email, name, password) => {
    try {
        console.log("email", email, "name", name, "password", password)
        const { user } = await auth().createUserWithEmailAndPassword(email, password);
        const update = {
            displayName: name,
            
        };
        await auth().currentUser.updateProfile(update);
        console.log(user);
        database().ref('/users/' + user.uid).set({
            name: name,
            email: email,
        });
    } catch (e) {
        setMessage(e.message);
        console.log(e);
    }
};

const RegisterScreen = ({navigation, route}) => {

    const [email, setEmail] = useState((route.params ? route.params.email : '') ?? '');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const onChangeHandler = () => {
        navigation.navigate('LoginScreen', {params: {email: email}});
    };

    const onSubmitHandler = () => {
        __doCreateUser(email, name, password);
    };

    return (
        <ImageBackground source={require('../assets/images/gradient.jpg')} style={styles.image}>
            <View style={styles.card}>
                <Text style={styles.heading}>Signup</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                        <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                        {error && <Text style={[styles.message, {color: error ? 'red' : 'green'}]}>{error}</Text>}
                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.buttonAltText}>Login</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },  
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '80%',
        marginTop: '40%',
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },  
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
});

export default RegisterScreen;