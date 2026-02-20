import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export default function BlurTabBarBackground() {
  return (
    <BlurView
      tint="light"
      intensity={80}
      style={StyleSheet.absoluteFill}
    />
  );
}
