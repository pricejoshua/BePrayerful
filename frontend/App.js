import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  fetch('http://api.joshuaproject.com/v1/people_groups/daily_unreached.json?api_key=b07deb2be7d9')
  .then((res) => res.json())
  .then((json) => {
      // this.setState({
      //     people: json,
      //     DataisLoaded: true
      // });
      const str = JSON.stringify(json);
      console.log(json);
      // const str = JSON.stringify(this.people);
  })
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BePrayerful</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{str}</Text>
      {/* <Text>{this.json}</Text> */}
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
