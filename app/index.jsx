
import { Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import PostItImage from "@/assets/images/post-it.png";
import { useRouter } from "expo-router";

export default function HomeScreen () {
  const router = useRouter();
  return (
    <View style={Styles.container}>
    <Image source={PostItImage} style={Styles.image}></Image>
      <Text style={Styles.title}>Welcome To Notes App</Text>
      <Text style={Styles.subtitle}>Capture your thoughts any time anywhere</Text>
      <TouchableOpacity style={Styles.button} onPress={()=> router.push("/notes")}>
        <Text style={{color: "#fff", fontSize: 16}}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222"
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#ff8c00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  }
});