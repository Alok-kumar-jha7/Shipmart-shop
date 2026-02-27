import OnBoarding from "./screens/OnBoarding";
import "../global.css";
import useUser from "../hooks/useUser";
import { Redirect } from "expo-router";
import Home from "./(tabs)/home";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user,loading } = useUser();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/screens/OnBoarding" />;
}