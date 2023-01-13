import React, { useEffect, useState } from "react";
import { Text } from "react-native";

export default function PeopleGroup() {
    const [peopleGroup, setPeopleGroup] = useState();
    const [peopleGroupName, setPeopleGroupName] = useState('');

    console.log("peopleGroup", peopleGroup, typeof peopleGroup);
    if (peopleGroup == undefined) {
        fetch('http://api.joshuaproject.net/v1/people_groups/daily_unreached.json?api_key=b07deb2be7d9')
        .then((res) => res.json())
        .then((json) => {
            setPeopleGroup(json);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        if (peopleGroup != undefined) {
            setPeopleGroupName(peopleGroup[0]['PeopNameInCountry']);
        }
    }, [peopleGroup]);


    return (
        <Text>{peopleGroupName}</Text>
    );
}