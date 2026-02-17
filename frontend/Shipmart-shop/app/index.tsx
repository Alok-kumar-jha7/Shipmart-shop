import OnBoarding from "./screens/OnBoarding";
import "../global.css";
import useUser from "../hooks/useUser";
import { Redirect } from "expo-router";
import Home from "./(tabs)/Home";


export default function Index() {
 const { user } = useUser();

if (user) {
  return <Redirect href={"/(tabs)/Home"} />;
}

 
  return <OnBoarding/>;
}
