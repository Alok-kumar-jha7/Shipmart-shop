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
  } | null;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userString = await SecureStore.getItemAsync("user");

        if (userString) {
          const parsedUser = JSON.parse(userString);
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const updateUserData = async (newUserData: User) => {
    try {
      await SecureStore.setItemAsync("user", JSON.stringify(newUserData));
      setUser(newUserData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return { user, loading, updateUserData };
}
