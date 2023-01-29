import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PeopleGroup from './components/PeopleGroup';

export default function App() {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>BePrayerful</Text>
      <PeopleGroup />
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
    top: 0
  }
});
