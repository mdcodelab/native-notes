import { Stack } from "expo-router";
import {AuthProvider} from "../context/authContext";

export default function RootLayout() {
  return <AuthProvider>
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

  ><Stack.Screen name="index" options={{ title: "Home" }} />
    <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
  </Stack>
  </AuthProvider>;

}
