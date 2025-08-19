import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRef } from "react";

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
  actions: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  editInput: {
    fontSize: 18,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    width: "90%",
    color: "#333",
    padding: 15,
  },
});

function NoteItem({ note, deleteNote, onEdit }) {
  const [isEdition, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(note.text);
  const inputRef = useRef(null);

  const handleSave = () => {
    onEdit(note.id, editedText);
    setIsEditing(false);
    inputRef.current?.blur();
  };

  return (
    <View style={Styles.viewStyle}>
      {isEdition ? (
        <TextInput
          style={Styles.editInput}
          ref={inputRef}
          value={editedText}
          onChangeText={setEditedText}
          autoFocus
          onSubmitEditing={() => setIsEditing(false)}
          returnKeyType="done"
        />
      ) : (
        <Text style={Styles.noteText}>{note.title}</Text>
      )}

      <View style={Styles.actions}>
        {isEdition ? (
          <TouchableOpacity onPress={handleSave}>
            <AntDesign name="save" size={18} color="blue" style={{marginTop:10}}/>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <AntDesign name="edit" size={18} color="blue" style={{marginTop:10}} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={Styles.deleteButton}
          onPress={() => deleteNote(note.id)}
        >
          <AntDesign name="delete" size={18} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default NoteItem;
