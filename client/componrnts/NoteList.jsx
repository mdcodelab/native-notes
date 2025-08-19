import { View, StyleSheet, FlatList} from "react-native";
import NoteItem from "./NoteItem";

const Styles = StyleSheet.create({

});

function NoteList({notes, deleteNote, onEdit}) {
  return (
    <View>
        <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (<NoteItem note={item}
                     deleteNote={deleteNote} onEdit={onEdit}></NoteItem>
                    )}
                />
    </View>
  )
}

export default NoteList
