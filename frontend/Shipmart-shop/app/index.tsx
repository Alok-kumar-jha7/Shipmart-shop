import "../global.css";
import useUser from "../hooks/useUser";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user, loading } = useUser(); 

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)/Home" />;
  }

  return <Redirect href="/screens/OnBoarding" />;
}