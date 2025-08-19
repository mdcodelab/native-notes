import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";

export default function AuthLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: "",
        // headerLeft: () => (
        //   <Button title="Back" onPress={() => router.back()} />
        // ),
      }}
    />
  );
}
