import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    viewStyle: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
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
    noteText: {
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modelOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modelTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        marginBottom: 20,
        width: "90%",
        color: "#333",
    },
    modelButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
        backgroundColor: "#ff8c00",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    buttonModalText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    }
});

export default function Notes() {
    const [notes, setNotes] = React.useState([
        { id: 1, title: "Note One" },
        { id: 2, title: "Note Two" },
        { id: 3, title: "Note Three" }
    ]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newNote, setNewNote] = React.useState("");

    function addNote() {
        if (newNote.trim() === "") return;
        setNotes((prevNotes)=>[...prevNotes, {id: Date.now().toString(), title: newNote} ] )
        setNewNote("");
        setModalVisible(false);
    }

    return (
        <View style={Styles.container}>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={Styles.viewStyle}>
                        <Text style={Styles.noteText}>{item.title}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={Styles.button} onPress={() => setModalVisible(true)}>
                <Text style={Styles.buttonText}>+ Add Note</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={Styles.modelOverlay}>
                    <View style={Styles.modalView}>
                        <Text style={Styles.modelTitle}>Add A New Note</Text>
                        <TextInput
                            style={Styles.input}
                            placeholder="Add a note..."
                            placeholderTextColor="#aaa"
                            value={newNote}
                            onChangeText={(text) => setNewNote(text)}
                        />
                        <View style={Styles.modelButtons}>
                            <TouchableOpacity style={Styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={Styles.buttonModalText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.modalButton} onPress={addNote}>
                                <Text style={Styles.buttonModalText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
