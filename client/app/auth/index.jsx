import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import {useRouter} from 'expo-router';

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
        marginBottom: 20
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

function Login () {
const[email, setEmail]=useState("");
const[password, setPassword]=useState("");
const [confirmPassword, setConfirmPassword]=useState("");
const[forRegistering, setForRegistering]=useState(true);
const [error, setError]=useState(false);

function handleLogin() {
}
    

  return (
    <View style={Styles.container}>
        <Text style={Styles.header}>
            {forRegistering ? "Register" : "Login"}
            </Text>
        {error ? <Text style={Styles.error}>{error}</Text>: null}
        <TextInput
            placeholder="Email..."
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={Styles.input}
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
            style={Styles.button}
            onPress={handleLogin}
        >
            <Text style={Styles.buttonText}>
                {forRegistering ? "Register" : "Login"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={Styles.question}
            onPress={() => setForRegistering(!forRegistering)}
        >
            <Text style={Styles.questionText}>
                {forRegistering ? "Already have an account? ogin" : "Don't hsve an accountRegister"}
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default Login;