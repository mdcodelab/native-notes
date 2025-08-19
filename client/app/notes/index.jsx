import { View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import NoteList from "../../componrnts/NoteList";
import AddModal from "../../componrnts/AddModal";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    button: {
        backgroundColor: "#ff8c00",
        position: "absolute",
        bottom: 20,
        right: 20,
        left: 15,
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    
});

export default function Notes() {
    const [notes, setNotes] = React.useState([
        { id: "1", title: "Note One" },
        { id: "2", title: "Note Two" },
        { id: "3", title: "Note Three" }
    ]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newNote, setNewNote] = React.useState("");

    function addNote() {
        if (newNote.trim() === "") return;
        setNotes((prevNotes)=>[...prevNotes, {id: Date.now().toString(), title: newNote} ] )
        setNewNote("");
        setModalVisible(false);
    }

    function deleteNote(id) {
        window.alert("Are you sure you want to delete this note?");
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    // Alert.alert(
    //     "Delete Note",
    //     "Are you sure you want to delete this note?",
    //     [
    //         {
    //             text: "Cancel",
    //             style: "cancel"
    //         },
    //         {
    //             text: "Delete",
    //             style: "destructive",
    //             onPress: () => setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
    //         }
    //     ])
    }

    function updateNote(id, title) {
        if(!title.trim()) {
            window.alert("Note cannot be empty");
            return;
        };
        setNotes(prevNotes => prevNotes.map(note => {
            if(note.id !==id) return note;
            return {...note, title} 
        }))
    };

    return (
        <View style={Styles.container}>
            <NoteList notes={notes} deleteNote={deleteNote} onEdit={updateNote}></NoteList>
            <TouchableOpacity style={Styles.button} onPress={() => setModalVisible(true)}>
                <Text style={Styles.buttonText}>+ Add Note</Text>
            </TouchableOpacity>
        {/* Modal */}
        <AddModal modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                setNewNote={setNewNote} 
                addNote={addNote}>
                newNote={newNote}
                </AddModal>
        </View>
    );
}
