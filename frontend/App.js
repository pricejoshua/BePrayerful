import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import people from './people-test.json';

export default function App() {
  const [peopleGroup, setPeopleGroup] = useState([]);

  if (!peopleGroup){

    fetch('http://api.joshuaproject.net/v1/people_groups/daily_unreached.json?api_key=b07deb2be7d9')
    .then((res) => res.json())
    .then((json) => {
        setPeopleGroup(json);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  console.log(peopleGroup[0].PeopNameInCountry);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BePrayerful</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{this.peopleGroup[0].PeopNameInCountry}</Text>
      <Text></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50
  }
});
