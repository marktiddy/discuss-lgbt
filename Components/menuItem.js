import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MenuItem = ({ title, color }) => {
  return (
    <View style={[styles.mainview, { backgroundColor: color }]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    backgroundColor: '#ff0018',
    borderRadius: 3,
    padding: 6,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto_500Medium',
    textAlign: 'center',
  },
});

export default MenuItem;
