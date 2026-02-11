import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { toast } from "sonner-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpOtp() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const { email, name, password, phone } = useGlobalSearchParams<{
    email: string;
    name: string;
    password: string;
    phone: string;
  }>();

  const inputRefs = useRef<(TextInput | null)[]>([]);

  // useEffect(() => {
  //   if (!name || !email || !password || !phone) {
  //     toast.error("Missing Information",{
  //       description:"Required signup data is missing"
  //     })
  //     router.back();
  //   }
  // } ,[email,password,name,phone]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-row items-center px-4 mt-4 mb-8 ">
          <TouchableOpacity
            // onPress={handleGoBack}
            className="mr-4 p-2 rounded-full bg-gray-100"
            // disabled={isVerifying}
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-poppins-bold text-gray-900 ">
            Verify OTP
          </Text>
        </View>
        <View className="flex-1 px-4">
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-blue-100 rounded-full item-center justify-cneter mb-6">
              <Ionicons name="shield-checkmark" size={40} color={"#2563Eb"}/>
            </View>
            <Text className="text-xl font-poppins-bold text-gary-900 mb-2 text-center">

            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
