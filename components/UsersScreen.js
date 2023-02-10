import PeopleGroup from "./PeopleGroup";
import { Text, StyleSheet, View, Button } from "react-native";
import auth from '@react-native-firebase/auth';

export default function UsersScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Sign Out" onPress={() => auth().signOut()} />
        </View>
    );
}