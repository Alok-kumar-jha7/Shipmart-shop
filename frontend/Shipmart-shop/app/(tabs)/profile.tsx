import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useUser from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const { user } = useUser();
  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 pt-12 bg-white">
      <StatusBar barStyle={"dark-content"} backgroundColor={"#ffffff"} />
      {/* Header */}

      <View className="bg-white px-4 py-4 border-b border-gray-100">
        <Text className="text-2xl font-poppins-bold text-gray-900">
          Profile
        </Text>
        <Text className="text-sm text-gray-500 font-poppins-medium mt-1">
          Welcome back, {user?.name || "User"} 👋
        </Text>
      </View>
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        <View className="p-4">
          {/* Profile Header Card  */}
          <View className="bg-white rounded-2xl shadow-[0_0_3px_rgba(0,0,0,0.8)] border border-gray-100 p-6 mb-6">
            <View className="flex-row items-center mb-6 ">
              <View className="relative items-center mb-6">
                <View className="relative">
                  <Image
                    source={
                      user?.avatar?.url
                        ? { uri: user.avatar.url }
                        : require("@/assets/images/profilePic.png")
                    }
                    className="w-20 h-20 rounded-full"
                    resizeMode="cover"  
                  />
                  <TouchableOpacity className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full items-center justify-center">
                    <Ionicons name="camera" size={12} color={"#ffffff"} />
                  </TouchableOpacity>
                </View>
                <View className="ml-4">
                  <Text className="text-xl font-poppins"></Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
