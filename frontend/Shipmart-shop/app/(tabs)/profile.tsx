import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React,{useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useUser from "@/hooks/useUser";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { toast } from "sonner-native";
import * as ImagePicker from "expo-image-picker"

const Profile = () => {
  const { user } = useUser();

  const [showPhotoModal,setShowPhotoModal]=useState(false);
  const [selectedImage,setSelectedImage]=useState<string|null>(null);
  const [uploadedImageUrl,setUploadedImageUrl]=useState<string|null>(null);
  const [uploadedImageId,setUploadedImageId]=useState<string>("");
  const [isUploading,setIsUploading]=useState(false);
  const [showAIFeatures,setShowAIFeatures]=useState(false);
  const [appliedFeatures,setAppliedFeatures]=useState<string[]>([]);
  const [isApplyingAI,setIsApplyingAI]=useState(false);


  const pickImage = async () =>{
    try{
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if(status!== "granted"){
        toast.error("Permission Required",);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:['images'],
        allowsEditing:true,
        aspect:[1,1],
        quality:0.8,
      });
      if(!result.canceled && result.assets[0]){
        setSelectedImage(result.assets[0].uri);
        setShowAIFeatures(true);
      }
    }catch(error){
      console.error("Error picking image",error);
      toast.error("Failed to pick image. Pleas try again. ");
    }
  };

  const takePhoto = async() =>{
      try{
        const { status } = await ImagePicker.getCameraPermissionsAsync();

        if(status !== "granted"){
          toast.error("Sorry, we need camera permission to make this work!");
          return;
        }
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing:true,
          aspect:[1,1],
          quality:0.8,
        });
        if(!result.canceled && result.assets[0]){
          setSelectedImage(result.assets[0].uri);
          setShowAIFeatures(true);
        }
      }catch(error){
        console.error("Error taking photo");
        toast.error("Failed to take photo. Please try again.");
      }
  };

  const menuItems = [
    {
      id: "orders",
      title: "My Orders",
      subtitle: "Track your orders and view history",
      icon: "bag-outline",
      iconColor: "#2563EB",
      iconBg: "#DBEAFE",
      onPress: () => router.push("/(routes)/my-orders"),
    },
    {
      id: "inbox",
      title: "Inbox",
      subtitle: "View your messages",
      icon: "mail-outline",
      iconColor: "#059669",
      iconBg: "#D1FAE5",
      onPress: () => router.push("/(tabs)/messages"),
    },
    {
      id: "notifications",
      title: "Notifications",
      subtitle: "Manage your notifications",
      icon: "notifications-outline",
      iconColor: "#D97706",
      iconBg: "#FEF3C7",
      onPress: () => router.push("/(routes)/notifications"),
    },
    {
      id: "shipping",
      title: "Shipping Address",
      subtitle: "Manage your delivery address",
      icon: "location-outline",
      iconColor: "#7C3AED",
      iconBg: "#EDE9FE",
      onPress: () => router.push("/(routes)/shipping-address"),
    },
    {
      id: "password",
      title: "Password",
      subtitle: "Update your account password",
      icon: "lock-closed-outline",
      iconColor: "#DC2626",
      iconBg: "#FEE2E2",
      onPress: () => router.push("/(routes)/change-password"),
    },
    {
      id: "settings",
      title: "Account Settings",
      subtitle: "Manage your account prefrences",
      icon: "settings-outline",
      iconColor: "#6B7280",
      iconBg: "#F3F4F6",
      onPress: () => router.push("/(routes)/settings"),
    },
  ];

  const renderPhotoModal = () =>(
      <Modal
      visible={showPhotoModal}
      animationType="slide"
      presentationStyle="pageSheet"
      >
       <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
          <Text className="text-xl font-poppins-medium text-gray-800">
            Change Photo
          </Text>
          <TouchableOpacity 
            onPress={()=>{
              setShowPhotoModal(false);
              setSelectedImage(null);
              setShowAIFeatures(false);
            }}
          >
            <Ionicons name="close" size={24} color="#6B7280"/>
          </TouchableOpacity>
        </View>
        <ScrollView className="flex-1 p-4">
            {!selectedImage?(
              <View className="gap-2">
                <Text className="text-lg font-poppins-medium text-gray-700">
                  Choose how you want to add your photo 
                </Text>
                <TouchableOpacity
                className="flex-row mb-2 items-center p-4 border border-gray-200 rounded-xl"
                onPress={takePhoto}
                >
                  <View className="w-12 h-12 bg-blue-100 rounded-full items-cneter justify-cneter mr-4">
                    <Ionicons name="camera" size={24} color={"#2563EB"} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-poppins-semibold text-gray-800">
                      Take Photo
                    </Text>
                    <Text className="text-gary-500 font-poppins-medium">
                      Use your camera to take a new photo
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#6B7280"/>
                </TouchableOpacity>
                <TouchableOpacity 
                className="flex-row items-center p-4 border border-gray-200 rounded-xl"
                onPress={pickImage}
                >
                  <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
                    <Ionicons name="images" size={24} color="#059669"/>
                  </View>
                  <View className="flex-1">'
                    <Text className="text-lg font-poppins-semibold text-gray-800">
                      Choose from library
                    </Text>
                    <Text className="text-gray-500 font-poppins-medium">
                      Select a photo from your gallery
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#6B7280"/>
                </TouchableOpacity>
              </View>
            ):(
            <View className="space-y-6">
              <View
              className="items-center"
              >
                {isApplyingAI? (
                  <View 
                  className="w-32 h-32 rounded-full bg-gray-100 items-center justify-center"
                  >
                    <View className="animated-spin">
                      <Ionicons name="refresh" size={32} color={"#6B7280"}/>
                    </View>
                    <Text className="text-xs text-gray-500 mt-2">
                      Applying AI.....
                    </Text>
                    </View>
                ):(
                <Image 
                key={uploadedImageUrl|| selectedImage}
                source={{uri:uploadedImageUrl || selectedImage}}
                className="h-32 w-32 rounded-full"
                resizeMode="cover"
                />
                )}
                <Text className="text-base font-poppins-medium text-gray-200">
                  Preview
                </Text>
              </View>
              {!uploadedImageUrl?(
                <View className="space-y-4">
                  <Text className="text-lg font-poppins-semibold text-gray-700">
                    Ready to upload your photo?
                  </Text>
                  <TouchableOpacity
                  className="py-3 bg-blue-600 rounded-xl"
                  onPress={()=>selectedImage && uploadImage(selectedImage)}
                  disabled={isUploading}
                  >
                    <Text className="text-center font-poppins-semibold bg-white">
                      {isUploading ? "Uploading..." : "Upload Photo"}

                    </Text>
                  </TouchableOpacity>
                  </View>
              ):(
                <View>
                  </View>
              )}
            </View>
          )}
        </ScrollView>
        </SafeAreaView> 
      </Modal>
  )
  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 pt-12 bg-white">
      <StatusBar barStyle={"dark-content"} backgroundColor={"#ffffff"} />
      {/* Header */}

      <View className="bg-white px-4 py-4 border-b border-gray-300">
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
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-white rounded-2xl shadow-[0_0_3px_rgba(0,0,0,0.9)] border border-gray-100 p-4"
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <View
                    style={{
                      backgroundColor: item.iconBg,
                      height: 40,
                      width: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 4,
                      borderRadius: 10,
                    }}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={22}
                      color={item.iconColor}
                    />
                  </View>
                  <View className="flex-1 ml-4">
                    <Text className="text-lg font-poppins-semibold text-gray-900">
                      {item.title}
                    </Text>
                    <Text className="text-gray-500 font-poppins-medium text-sm">
                      {item.subtitle}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={"#9CA3AF"}/>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity 
          className="bg-red-50 rounded-2xl border border-red-200 p-5 mt-6"
          onPress={()=>{}}
          activeOpacity={0.7}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="log-out-outline" size={21} color={"#EF4444"}/>
              <Text className="ml-2 font-poppins-semibold text-red-500 text-lg">
              Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
