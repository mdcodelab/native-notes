import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useAuth } from "../context/authContext";
import {useRouter} from "expo-router";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';

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
  const router = useRouter();

  const handleLogout = async () => {
    try {
        // Make a POST request to the logout endpoint
        await axios.post(
            'http://localhost:3001/api/auth/logout', 
            {}, // empty data object since we don't need to send any data
            {
                withCredentials: true, // This is the correct way to include cookies
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        // Update the UI state
        setUser(null);
        
        // Show success message
        Toast.show({
            type: 'success',
            text1: 'You have been logged out successfully!',
        });
        router.replace('/auth');
    } catch (error) {
        console.error('Logout error:', error);
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.response?.data?.message || 'Failed to log out. Please try again.',
        });
    }
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
