import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const forgotPasswordForm = useForm<ForgotPasswordFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const handleBackToSignin = () => {
    router.back();
  };

  const onForgotPasswordSubmit = (data: ForgotPasswordFormData) => {
    console.log("Forgot Password Data:", data);
    setIsSubmitted(true);
  };

  const handleResendEmail = () => {
    const email = forgotPasswordForm.getValues("email");
    if (email) console.log("Resending email to:", email);
  };

  /* ================= SUCCESS SCREEN ================= */

  if (isSubmitted) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6 items-center justify-center">
          <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="mail-outline" size={40} color="#10B981" />
          </View>

          <Text className="text-2xl font-poppins-bold text-gray-900 mb-2 text-center">
            Check Your Email
          </Text>

          <Text className="text-gray-500 font-poppins text-base text-center">
            We've sent a password reset link to
            <Text className="font-poppins-medium text-gray-700">
              {" "}{forgotPasswordForm.getValues("email")}
            </Text>
          </Text>

          <View className="bg-blue-50 rounded-xl p-4 mt-8 w-full">
            <Text className="text-blue-800 font-poppins-medium text-sm mb-2">
              What's next?
            </Text>
            <Text className="text-blue-700 font-poppins text-sm leading-5">
              1. Check your inbox{"\n"}
              2. Click reset link{"\n"}
              3. Create new password{"\n"}
              4. Login again
            </Text>
          </View>
        </View>

        <View className="px-6 pb-8">
          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-4 mb-4"
            onPress={handleResendEmail}
          >
            <Text className="text-white text-center text-lg font-poppins-semibold">
              Resend Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-gray-300 rounded-xl py-4"
            onPress={handleBackToSignin}
          >
            <Text className="text-gray-700 text-center text-lg font-poppins-semibold">
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* ================= MAIN SCREEN ================= */

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="flex-row items-center mt-6 mb-6">
            <TouchableOpacity onPress={handleBackToSignin} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>

            <Text className="text-xl font-poppins-semibold text-gray-900">
              Forgot Password
            </Text>
          </View>

          {/* Content */}
          <View className="mt-8">
            <Text className="text-3xl font-poppins-bold text-gray-900 mb-2">
              Reset Your Password
            </Text>

            <Text className="text-gray-500 font-poppins text-base mb-8 leading-6">
              Enter your email and we'll send a reset link.
            </Text>
          </View>

          {/* Email */}
          <View>
            <Text className="text-gray-800 text-base font-poppins-medium mt-6 mb-3">
              Email Address
            </Text>

            <Controller
              control={forgotPasswordForm.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+/,
                  message: "Enter valid email",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <View
                    className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border ${
                      forgotPasswordForm.formState.errors.email
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  >
                    <Ionicons name="mail-outline" size={20} color="#9CA3AF" />

                    <TextInput
                      className="flex-1 ml-3 text-gray-800 font-poppins"
                      placeholder="Enter your email"
                      placeholderTextColor="#9CA3AF"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>

                  {forgotPasswordForm.formState.errors.email && (
                    <Text className="text-red-500 text-sm font-poppins mt-2">
                      {forgotPasswordForm.formState.errors.email.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          {/* Button */}
          <TouchableOpacity
            className={`rounded-xl py-5 mt-8 ${
              forgotPasswordForm.formState.isValid
                ? "bg-blue-600"
                : "bg-gray-300"
            }`}
            onPress={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)}
          >
            <Text className="text-white text-lg font-poppins-semibold text-center">
              Reset Password
            </Text>
          </TouchableOpacity>
           <View className="rounded-xl mt-2 p-4">
            <Text className="text-gray-600 font-poppins-medium text-sm text-center leading-5">
              Remember your password?{" "}
              <Text className="text-blue-600 font-poppins-bold"
              onPress={handleBackToSignin}>
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
