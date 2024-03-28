import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ConnectionMessage = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message.message}</Text>
    </View>
  )
}

export default ConnectionMessage

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#818181",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  }
});