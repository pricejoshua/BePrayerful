import PeopleGroup from "../components/PeopleGroup";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Button from "../components/AButton";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import styles from "../styles";

const test_photo_url = "https://via.placeholder.com/150";
const photo_uri = auth().currentUser.photoURL;

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>BePrayerful</Text>
                <PeopleGroup />
                <Button title="Users" onPress={() => navigation.navigate('Users')} />
                <Button title="Sign Out" onPress={() => auth().signOut()} />
            </View>
            <Pressable style={styles.profileImagePressable} onPress={() => navigation.navigate('Profile')}>
                <Image style={styles.profileImage} source={{uri: photo_uri }} />
            </Pressable>
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },    
    profileImagePressable: {
        top: 5,
        right: 5,
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        overflow: "hidden",
    }
  });