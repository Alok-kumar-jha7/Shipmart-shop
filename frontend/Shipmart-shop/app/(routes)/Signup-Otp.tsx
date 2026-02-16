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
import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
interface VerifyOTPData {
  otp: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}
interface ResendOTPData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

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

  //Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | any;

    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, canResend]);

  //Start countdown on component mount
  useEffect(() => {
    setCanResend(false);
    setCountdown(120);
  },[]);

  // Auto-focus first input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!name || !email || !password || !phone) {
      toast.error("Missing Information", {
        description: "Required signup data is missing",
      });
      router.back();
    }
  }, [email, password, name, phone]);

  const verifyOtp = async (data: VerifyOTPData) => {
    try {
      const response = await axios.post(
        `
        ${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/api/verify-user`,
        {
          otp: data.otp,
          email: data.email,
          name: data?.name,
          phone: data?.phone,
          password: data?.password,
        },
        { timeout: 10000 },
      );
      return response.data;
    } catch (error) {
      console.log("OTP verification error:", error);
      if (isAxiosError(error)) {
        if (!error.response) {
          throw new Error(
            "Network error. Please check your connection and try again.",
          );
        }
        const statusCode = error?.response?.status;
        const errorData = error?.response?.data;

        if (statusCode === 400 || statusCode === 422) {
          throw new Error(errorData?.message || "Invalid OTP of signup data");
        } else if (statusCode === 404) {
          throw new Error(errorData?.message || "OTP expired or not found");
        } else if (statusCode === 409) {
          throw new Error(
            errorData?.message || "User already exists with this email",
          );
        } else if (statusCode === 429) {
          throw new Error(
            errorData?.message || "Too many attempts. Please try again later.",
          );
        } else if (statusCode >= 500) {
          throw new Error(
            errorData?.message || "Server error.Please try again later!",
          );
        } else {
          throw new Error(errorData?.message || "OTP verifiacation failed!");
        }
      }
    }
  };

  const resendOTP = async (data: ResendOTPData) => {
    try {
      const response = await axios.post(
        ` ${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/api/verify-user`,
        data,
        { timeout: 10000 },
      );
      return response.data;
    } catch (error) {
      console.log(" Resend OTP error:", error);
      if (isAxiosError(error)) {
        if (!error.response) {
          throw new Error(
            "Network error. Please check your connection and try again.",
          );
        }
        const statusCode = error?.response?.status;
        const errorData = error?.response?.data;

        if (statusCode === 400 || statusCode === 422) {
          throw new Error(errorData?.message || "Invalid email address");
        } else if (statusCode === 429) {
          throw new Error(
            errorData?.message ||
              "Too many requests. Please wait before requesting again",
          );
        } else if (statusCode >= 500) {
          throw new Error(
            errorData?.message || "Server error.Please try again later!",
          );
        } else {
          throw new Error(errorData?.message || "Failed to resend OTP");
        }
      }
      throw new Error("An unexpected error occured");
    }
  };

  const verifyOTPMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      toast.success("Welcome!", {
        description: `Account created successfully for ${name}! `,
      });
      router.replace("/screens/SignIn");
    },
    onError: (error: Error) => {
      console.log("OTP verification error:", error.message);
      toast.error("Verification failed", {
        description: error.message,
      });
    },
  });
  const resendOTPMutation = useMutation({
    mutationFn: resendOTP,
    onSuccess: (data) => {
      toast.success("OTP sent!", {
        description: `A new OTP has been sent for ${email}. `,
      });
      //clear current otp
      setOtp(["", "", "", ""]);
      //focus first input
      inputRefs.current[0]?.focus();

      setCanResend(false);
      setCountdown(60);
    },
    onError: (error: Error) => {
      console.log("Resend OTP error:", error.message);
      toast.error("Resend failed", {
        description: error.message,
      });
    },
  });

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
    if (key === "Backspace" && !otp[index] && index > 0) {
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
      toast.error("Missing Informatiom", {
        description:
          "Required signup data is missing.Please fill-up all the fields",
      });
      return;
    }
    verifyOTPMutation.mutate({
      otp: otpCode,
      email: email,
      phone: phone,
      name: name,
      password: password,
    });
  };
  const handleResendOTP = () => {
    if (!canResend || resendOTPMutation.isPending) return;

    if (!email) {
      toast.error("Missing Email", {
        description: "Email address is required to resend OTP.",
      });
      return;
    }
    //Trigger the resend mutation
    resendOTPMutation.mutate({
      email: email as string,
      name: name as string,
      phone: phone as string,
      password: password as string,
    });
  };
  const handleGoBack = () => {
    router.back();
  };

  const isOTPComplete = otp.every((digit) => digit !== "");
  const isVerifying = verifyOTPMutation.isPending;
  const isResending = resendOTPMutation.isPending;

  //Format  countdown time as  MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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
            disabled={isVerifying}
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
                  editable={!isVerifying}
                />
              </View>
            ))}
          </View>
          {/* Verify OTP Button */}
          <TouchableOpacity
            className={`rounded-xl py-4 mb-8 ${isOTPComplete && !isVerifying? "bg-blue-600 " : "bg-gray-400"}`}
            onPress={handleVerifyOtp}
            disabled={!isOTPComplete || isVerifying}
          >
            <Text className="text-white text-center text-lg font-poppins-bold">
             {isVerifying ? "Verifying..." : "Verify OTP"}
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text className="text-gray-600 font-poppins">
              Didn&apos;t receive the code?
            </Text>
            {canResend ? (
              <TouchableOpacity
                onPress={handleResendOTP}
                disabled={isResending}
              >
                <Text
                  className={`font-poppins-semibold ml-1 ${isResending ? "text-gray-400" : "text-blue-600"}`}
                >
                  {isResending ? "Sending..." : "Resend OTP"}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text className="text-gary-400 font-poppins">Resend OTP ({formatTime(countdown)})</Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
