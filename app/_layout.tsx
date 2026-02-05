import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
  <Stack screenOptions={{ headerShown: false }} >
    <Stack.Screen name="screens/OnBoarding"/>
    <Stack.Screen name="screens/SignIn"/>
    </Stack>
    // <StatusBar style='dark'/>
   )
}
