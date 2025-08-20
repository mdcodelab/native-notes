import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Platform, View, Text } from 'react-native';
import { AuthProvider } from "../context/authContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack 
          screenOptions={{
            headerStyle:{
              backgroundColor: "#ff8c00",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20
            },
            headerTitleAlign: "center",
            contentStyle: {
              paddingHorizontal: 10,
              paddingTop: 10,
              backgroundColor: "#fff",
            },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
          <Stack.Screen name="auth" options={{ headerTitle: "Authentication" }} />
        </Stack>
      </AuthProvider>
      
      {/* Toast Configuration - Outside AuthProvider but inside GestureHandlerRootView */}
      <Toast 
        position={Platform.OS === 'web' ? 'top' : 'bottom'}
        topOffset={Platform.OS === 'web' ? 20 : undefined}
        bottomOffset={Platform.OS === 'android' ? 50 : 40}
        visibilityTime={3000}
        autoHide={true}
        config={{
          success: (props) => (
            <View style={{
              backgroundColor: '#4BB543',
              padding: 15,
              borderRadius: 8,
              marginBottom: 10,
              width: '90%',
              alignSelf: 'center',
            }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
              {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
            </View>
          ),
          error: (props) => (
            <View style={{
              backgroundColor: '#FF3333',
              padding: 15,
              borderRadius: 8,
              marginBottom: 10,
              width: '90%',
              alignSelf: 'center',
            }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
              {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
            </View>
          ),
          info: (props) => (
            <View style={{
              backgroundColor: '#3498DB',
              padding: 15,
              borderRadius: 8,
              marginBottom: 10,
              width: '90%',
              alignSelf: 'center',
            }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
              {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
            </View>
          )
        }}
      />
    </GestureHandlerRootView>
  );
}
