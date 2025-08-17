import { Text, View, StyleSheet} from "react-native";

const Styles = StyleSheet.create({
viewStyle: {
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
});

function NoteItem({note}) {
  return (
    <View style={Styles.viewStyle}>
        <Text style={Styles.noteText}>{note.title}</Text>
    </View>  
  )
}

export default NoteItem;
