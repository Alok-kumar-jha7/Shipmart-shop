import OnBoarding from "./screens/OnBoarding";
import "../global.css";
import useUser from "../hooks/useUser";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user} = useUser();

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/screens/OnBoarding" />;
}