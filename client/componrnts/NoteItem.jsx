import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"; // import iconiță AntDesign

const Styles = StyleSheet.create({
  viewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  noteText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    padding: 5,
  },
});

function NoteItem({ note, deleteNote }) {
  return (
    <View style={Styles.viewStyle}>
      <Text style={Styles.noteText}>{note.title}</Text>
      <TouchableOpacity
        style={Styles.deleteButton}
        onPress={() => deleteNote(note.id)}
      >
        <AntDesign name="delete" size={18} color="red" />
      </TouchableOpacity>
    </View>
  );
}

export default NoteItem;
