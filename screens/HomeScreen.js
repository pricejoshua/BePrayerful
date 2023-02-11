import PeopleGroup from "./PeopleGroup";
import { Text, StyleSheet, View, Pressable } from "react-native";
import auth from '@react-native-firebase/auth';
import Button from "./components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import styles from "../styles";

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BePrayerful</Text>
            <PeopleGroup />
            {/* <View style={styles.button}> */}
                <Pressable style={styles.button} title="Users" onPress={() => navigation.navigate('Users')} />
            {/* </View> */}
            {/* <View style={styles.button}> */}
                <Pressable style={styles.button} onPress={() => auth().signOut()}>
                    <Text style={{ color: 'white' }}>Sign Out</Text>
                </Pressable>
            {/* </View> */}
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