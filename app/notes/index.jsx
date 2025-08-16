import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import React from "react";
import {useRouter} from "expo-router";

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
    noteText: {          // ← Pentru notele din listă
        fontSize: 18,
        color: "#333",   // ← Culoare închisă pentru fundal gri
    },
    buttonText: {        // ← Pentru textul din buton
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    }
});

export default function Notes() {
    const [notes, setNotes] = React.useState([
        {id: 1, title: "Note One"},
        {id: 2, title: "Note Two"},
        {id: 3, title: "Note Three"}
    ]);

    return (
        <View style={Styles.container}>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={Styles.viewStyle}>
                        <Text style={Styles.noteText}>{item.title}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={Styles.button}>
                <Text style={Styles.buttonText}>+ Add Note</Text>
            </TouchableOpacity>
        </View>
    );
}