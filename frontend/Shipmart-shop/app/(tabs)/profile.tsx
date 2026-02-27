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
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const Profile = () => {
  const { user } = useUser();

  const menuItems =[
    {
      id:"orders",
      title:"My Orders",
      subtitle:"Track your orders and view history",
      icon:"bag-outline",
      iconColor:"#2563EB",
      iconBg:"#DBEAFE",
      onPress:()=> router.push("/(routes)/my-orders"),
    },
    {
      id:"inbox",
      title:"Inbox",
      subtitle:"View your messages",
      icon:"mail-outline",
      iconColor:"#059669",
      iconBg:"#D1FAE5",
      onPress:()=> router.push("/(tabs)/messages"),
    },
    {
      id:"notifications",
      title:"Notifications",
      subtitle:"Manage your notifications",
      icon:"notifications-outline",
      iconColor:"#D97706",
      iconBg:"#FEF3C7",
      onPress:()=> router.push("/(routes)/notifications"),
    },
      {
      id:"shipping",
      title:"Shipping Address",
      subtitle:"Manage your delivery address",
      icon:"location-outline",
      iconColor:"#7C3AED",
      iconBg:"#EDE9FE",
      onPress:()=> router.push("/(routes)/shipping-address"),
    },
    {
      id:"password",
      title:"Password",
      subtitle:"Update your account password",
      icon:"lock-closed-outline",
      iconColor:"#DC2626",
      iconBg:"#FEE2E2",
      onPress:()=> router.push("/(routes)/change-password"),
    },
    {
      id:"settings",
      title:"Account Settings",
      subtitle:"Manage your account prefrences",
      icon:"settings-outline",
      iconColor:"#6B7280",
      iconBg:"#F3F4F6",
      onPress:()=> router.push("/(routes)/settings"),
    },

  ]
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
              <View className="relative items-center mb-5">
                <View className="relative">
                  <Image
                    source={
                      user?.avatar?.url
                        ? { uri: user.avatar.url }
                        : require("@/assets/images/profile.jpg")
                    }
                    className="w-20 h-20 rounded-full"
                    resizeMode="cover"
                  />
                  <TouchableOpacity className="absolute -bottom-2 -right-1 w-7 h-7 bg-blue-600 rounded-full items-center justify-center">
                    <Ionicons name="camera" size={13} color={"#ffffff"} />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-xl font-poppins-bold text-gray-900">
                  {user?.name || "User Name"}
                </Text>
                <Text className="text-gray-500 font-poppins-medium">
                  {user?.email || "user@shipmartshop.com"}
                </Text>
                <TouchableOpacity
                  className="mt-1"
                  //  onPress={()=>setShowPhotoModal}
                >
                  <Text className="text-blue-600 font-poppins-medium text-sm">
                    Change Photo
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1 bg-gray-100 rounded-xl p-4">
                <View className="flex-row items-cneter mb-2 ">
                  <Ionicons name="time-outline" size={16} color={"#6B7280"} />
                  <Text className="text-gray-600 font-poppins-medium ml-2 text-sm">
                    Orders
                  </Text>
                </View>
                <Text className="text-xl font-poppins-bold text-gray-600">
                  7
                </Text>
              </View>
              <View className="flex-1 bg-gray-100 rounded-xl p-4 ">
                <View className="flex-row items-cneter mb-2 -ml-1">
                  <SimpleLineIcons
                    name="user-following"
                    size={14}
                    color={"#6B7280"}
                  />
                  <Text className="text-gray-600 font-poppins-medium ml-1 text-sm">
                    Following
                  </Text>
                </View>
                <Text className="text-xl font-poppins-bold text-gray-600">
                  2
                </Text>
              </View>
              <View className="flex-1 bg-gray-100 rounded-xl p-4">
                <View className="flex-row items-cneter mb-2 ">
                  <Ionicons name="bag-outline" size={16} color={"#6B7280"} />
                  <Text className="text-gray-600 font-poppins-medium ml-2 text-sm">
                    Cart
                  </Text>
                </View>
                <Text className="text-xl font-poppins-bold text-gray-600">
                  3
                </Text>
              </View>
            </View>
          </View>
          {/* Menu Items */}
          <View className="gap-4">

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
