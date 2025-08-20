import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/authContext';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useRouter } from 'expo-router';

const Styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    error: {
        color: "#ff0000",
        marginBottom: 10,
        fontSize: 12,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        width: "80%",
        alignSelf: "center",
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        alignSelf: "center",
        width: "80%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
    },
    question: {
        marginTop: 20,
        alignSelf: "center",
    },
    questionText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
        backgroundColor: "transparent"
    },
});

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [forRegistering, setForRegistering] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (email, password, confirmPassword) => {
        setIsLoading(true);
        setError("");
        
        if (!email || !password || !confirmPassword) {
            setError("All fields are required!");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        try {
            console.log('Sending registration request...');
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                { email, password, confirmPassword },
                { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            
            console.log('Registration successful:', response.data);
            Toast.show({
                type: 'success',
                text1: 'Registration successful!',
                text2: 'You can now log in.'
            });
            setForRegistering(false);
        } catch (error) {
            console.error('Registration error:', error);
            let errorMessage = 'Registration failed. Please try again.';
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                
                errorMessage = error.response.data?.message || errorMessage;
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                errorMessage = 'No response from server. Please check your connection.';
            } else {
                // Something happened in setting up the request
                console.error('Error setting up request:', error.message);
                errorMessage = `Request error: ${error.message}`;
            }
            
            setError(errorMessage);
            Toast.show({
                type: 'error',
                text1: 'Registration failed',
                text2: errorMessage,
                visibilityTime: 4000
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (email, password) => {
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setIsLoading(true);
            setError("");
            
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            }, {
                withCredentials: true
            });

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Login successful!'
            });

            router.replace('/notes');

        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.error || 'Login failed';
            setError(errorMessage);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: errorMessage
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuth = async () => {
        if (forRegistering) {
            await handleRegister(email, password, confirmPassword);
        } else {
            await handleLogin(email, password);
        }
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>
                {forRegistering ? "Register" : "Login"}
            </Text>
            {error ? <Text style={Styles.error}>{error}</Text> : null}
            <TextInput
                placeholder="Email..."
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={Styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password..."
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={Styles.input}
            />
            {forRegistering && (
                <TextInput
                    placeholder="Confirm password..."
                    placeholderTextColor="#aaa"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    style={Styles.input}
                />
            )}
            <TouchableOpacity
                style={[Styles.button, isLoading && { opacity: 0.7 }]}
                onPress={handleAuth}
                disabled={isLoading}
            >
                <Text style={Styles.buttonText}>
                    {isLoading 
                        ? (forRegistering ? 'Creating Account...' : 'Logging in...') 
                        : (forRegistering ? 'Register' : 'Login')
                    }
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={Styles.question}
                onPress={() => {
                    setForRegistering(!forRegistering);
                    setError("");
                }}
            >
                <Text style={Styles.questionText}>
                    {forRegistering 
                        ? "Already have an account? Login" 
                        : "Don't have an account? Register"
                    }
                </Text>
            </TouchableOpacity>
        </View>
    );
}
