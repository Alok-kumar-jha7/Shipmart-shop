import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: {
    id: string;
    file_id: string;
    url: string;
  };
}
console.log("useUser mounted");

export default function useUser() {
  const [user, setUser] = useState<User>();

  const getUserData = async () => {
    try {
      const userString = await SecureStore.getItemAsync("user");
      console.log("SAVED USER:", userString);
      if (userString) {
        const user = JSON.parse(userString);
        setUser(user);
        return user;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
    return null;
  };
  const updateUserData = async (newUserData: User) => {
    try {
      await SecureStore.setItemAsync("user", JSON.stringify(newUserData));
      
      setUser(newUserData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  useEffect(() => {
    getUserData();
    console.log("user data:", user);
  },[]);

  return { user, updateUserData };
}
