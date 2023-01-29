import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import people from '../people-test.json';

export default function PeopleGroup() {
    const [peopleGroup, setPeopleGroup] = useState();
    const [peopleGroupName, setPeopleGroupName] = useState('');
    const [peopleGroupSummary, setPeopleGroupSummary] = useState('');
    const [peopleGroupCountry, setPeopleGroupCountry] = useState('');

    // if (peopleGroup == undefined) {
    //     fetch('http://api.joshuaproject.net/v1/people_groups/daily_unreached.json?api_key=b07deb2be7d9')
    //     .then((res) => res.json())
    //     .then((json) => {
    //         setPeopleGroup(json);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }
    if (peopleGroup == undefined){
        setPeopleGroup(people);
    }
    useEffect(() => {
        if (peopleGroup != undefined) {
            setPeopleGroupName(peopleGroup[0]['PeopNameInCountry']);
            setPeopleGroupSummary(peopleGroup[0]['ProfileText'][0]['Summary']);
            setPeopleGroupCountry(peopleGroup[0]['Ctry']);
            
        }
    }, [peopleGroup]);


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Today's People Group</Text>
            <Text>The {peopleGroupName} in {peopleGroupCountry}</Text>
            <Text>{peopleGroupSummary}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingHorizontal: 20
    },
    header : {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50
    }
});