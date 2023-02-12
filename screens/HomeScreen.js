import PeopleGroup from "../components/PeopleGroup";
import { Text, StyleSheet, View, Pressable } from "react-native";
import auth from '@react-native-firebase/auth';
import Button from "../components/AButton";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import styles from "../styles";

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BePrayerful</Text>
            <Button style={styles.button} title="Profile" onPress={() => navigation.navigate('Profile')} />
            <PeopleGroup />
            <Button title="Users" onPress={() => navigation.navigate('Users')} />
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
  });