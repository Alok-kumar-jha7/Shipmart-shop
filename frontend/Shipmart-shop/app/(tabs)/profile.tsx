import { View, Text, StatusBar, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useUser from "@/hooks/useUser";

const Profile = () => {
  const {user} = useUser();
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
          <View className="bg-white rounded-2xl shadow-[0_0_3px_rgba_(0,0,0,0.3)] border border-gray-100 p-6 mb-6">

          </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
