import { View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import NoteList from "../../componrnts/NoteList";
import AddModal from "../../componrnts/AddModal";
import { useAuth } from "../../context/authContext";
import axios from "axios";

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
    const [notes, setNotes] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newNote, setNewNote] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    //display all notes
    async function fetchNotes() {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:3001/api/notes', {
                withCredentials: true});
            setNotes(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching notes:', error);
        } 
    }

    const router = useRouter();
    const {user} = useAuth();
    React.useEffect(()=> {
        if(!user) {
            router.replace("/auth");
        }
    }, [user]);

    React.useEffect(()=> {
        if(user) {
            fetchNotes();
            //fetch the notes
        }
    }, [user]);
    
    //add a new note
    async function addNote() {
        console.log("NEW NOTE", newNote);
        if (!newNote.trim()) return;
        try {
            const response = await axios.post("http://localhost:3001/api/notes", {title: newNote},
                {withCredentials: true});
            console.log(response.data);
            setNotes((prevNotes) => [...prevNotes, {id: response.data.id, title: response.data.title}]);
            setNewNote("");
            setModalVisible(false);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    }
    

    async function deleteNote(id) {
        window.alert("Are you sure you want to delete this note?");
        try {
            const response = await axios.delete(`http://localhost:3001/api/notes/${id}`);
            setNotes((prevNotes) => prevNotes.filter(note => note.id !==id));
             // Alert.alert(
                // //     "Delete Note",
                // //     "Are you sure you want to delete this note?",
                // //     [
                // //         {
                // //             text: "Cancel",
                // //             style: "cancel"
                // //         },
                // //         {
                // //             text: "Delete",
                // //             style: "destructive",
                // //             onPress: () => setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
                // //         }
                // //     ])
        } catch (error) {
            console.error("Error deleting note:", error);
        }
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
