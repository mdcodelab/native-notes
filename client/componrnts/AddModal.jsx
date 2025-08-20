import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import React, { useState } from "react";
const Styles = StyleSheet. create({
modalOverlay: {
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
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
    paddingVertical: 12,
    paddingVertical: 12,
        backgroundColor:  "#4CAF50",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    modalButtonCancel: {
        paddingVertical: 12,
    paddingVertical: 12,
        backgroundColor:  "grey",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonModalText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    }
})

function AddModal({modalVisible, setModalVisible, 
    setNewNote, addNote, newNote}) {
  return (
    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={Styles.modalOverlay}>
                        <View style={Styles.modalView}>
                            <Text style={Styles.modelTitle}>Add A New Note</Text>
                            <TextInput
                                style={Styles.input}
                                placeholder="Add a note..."
                                placeholderTextColor="#aaa"
                                value={newNote}
                                onChangeText={(text) => setNewNote(text)}
                            />
                            <View style={Styles.modalButtons}>
                                <TouchableOpacity style={Styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                                    <Text style={Styles.buttonModalText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.modalButton} onPress={addNote}>
                                    <Text style={Styles.buttonModalText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
  )
}

export default AddModal;
