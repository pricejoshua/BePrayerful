import { Text, StyleSheet, View } from "react-native";
import Button from "../components/AButton";
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