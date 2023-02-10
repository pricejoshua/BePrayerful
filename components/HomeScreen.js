import PeopleGroup from "./PeopleGroup";
import { Text, StyleSheet, View, Button } from "react-native";
import auth from '@react-native-firebase/auth';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BePrayerful</Text>
            <PeopleGroup />
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
    }
  });