import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useAuth } from "../context/authContext";

const Styles = StyleSheet.create({
    button: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginRight: 20
        
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    }
})

function Logout() {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View>
      {user && (
        <TouchableOpacity style={Styles.button} onPress={handleLogout}>
          <Text style={Styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Logout;
