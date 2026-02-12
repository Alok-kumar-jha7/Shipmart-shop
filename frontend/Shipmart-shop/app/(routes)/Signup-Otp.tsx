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

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    //Auto focus to next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyPress = (key: string, index: number) => {
    // handle backspace - go to previous input if cureent is empty
    if (key === "Backspace" && !otp[index] && index >= 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleVerifyOtp = () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      toast.error("Invalid OTP", {
        description: "Please enter complete 4-digit",
      });
      return;
    }
    if (!name || !email || !password || !phone) {
      toast.error('Missing Informatiom',{
        description:"Required signup data is missing.Please fill-up all the fields"
      }) ;
      return;
    }
  };

  const handleGoBack = () =>{
    router.back();
  }

  // Auto-focus first input on mount 
  useEffect(()=>{
    const timer = setTimeout(()=>{
      inputRefs.current[0]?.focus();
    },100)
    return ()=> clearTimeout(timer)
  },[])

  const isOTPComplete = otp.every((digit)=> digit !== "");

  //Format  countdown time as  MM:SS
  const formatTime = (seconds:number)=>{
    const mins = Math.floor(seconds/60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2,"0")}:${secs
    .toString()
    .padStart(2,"0")}`
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-row items-center px-4 mt-4 mb-8 ">
          <TouchableOpacity
            onPress={handleGoBack}
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
            <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-6">
              <Ionicons name="shield-checkmark" size={40} color={"#2563Eb"} />
            </View>
            <Text className="text-xl font-poppins-bold text-gary-900 mb-2 text-center">
              Hi {name || "Admin"}! Verify Your Account
            </Text>
            <Text className="text-gray-500 font-poppins text-base text-center">
              we&apos;ve sent a 4-digit verification code to{" "}
              {email || "user.admin@gmail.com"}
            </Text>
          </View>
          {/* OTP input fields */}

          <View className="flex-row justify-center mb-8 gap-4">
            {otp?.map((digit, index) => (
              <View key={index} className="w-16 h-16">
                <TextInput
                  ref={(ref: TextInput | null): void => {
                    inputRefs.current[index] = ref;
                  }}
                  className={`w-full h-full text-center text-2xl  font-poppins-bold border-2 rounded-xl ${digit ? "border-blue-600 bg-blue-100" : "border-gray-200 bg-gray-50"}`}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="numeric"
                  maxLength={1}
                  selectTextOnFocus={true}
                  // editable={!isVerifying}
                />
              </View>
            ))}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
