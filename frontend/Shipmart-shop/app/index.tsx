import OnBoarding from "./screens/OnBoarding";
import "../global.css";
import useUser from "@/hooks/useUser";
import { Redirect } from "expo-router";
import Home from "./(tabs)/home";

export default function Index() {
  const { user } = useUser();
  console.log("hey",user)
  if (user) {
    return <Home />;
  }else{

    return <OnBoarding />;
  }

}
