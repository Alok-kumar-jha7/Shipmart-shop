import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import { toast } from "sonner-native";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: {
    id: string;
    file_id: string;
    url: string;
  } | null;
}

export default function useUser() {
  const [user, setUser] = useState<User>();
  console.log(user);
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
    console.log("hey this is userData", user);
    getUserData();
  }, [user]);

  return { user, updateUserData };
}
