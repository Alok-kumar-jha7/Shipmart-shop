import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";
import axios, { isAxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import {storeAccessToken} from "../../utils/axiosInstance"


interface SigninFormData {
  email: string;
  password: string;
}

const loginUser = async (userData:SigninFormData) =>{
  try{
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/api/login-user`,userData);
    return response.data;
  }
  catch(err){
    if(isAxiosError(err)){
      if(!err.response){
        throw new Error("Network error. Please check your internet connection.")
      }
      const status = err.response.status;
      const errorData = err.response.data;
      if(status===400||status===422){
        throw new Error(errorData?.message||"Invalid request. Please check your input and try again.");
      }else if(status ===401){
        throw new Error(errorData?.message || "Invalid credentials. Please check your email and password ");  
      }else if(status===404){
        throw new Error(errorData?.message || "Requested page not found. Please contact support.");
      }else if(status===429){
        throw new Error(errorData?.message ||"Too many login attempts. Please wait a few minutes and try again.");
      }else if(status>=500){
        throw new Error(errorData?.message ||"We are experiencing technical issues. Please try again in a few minutes.");
      }else{
        throw new Error(errorData?.message||"Sign IN failed")
      }
    }
    throw new Error("An unexpected error occured!");
  }
}

const SignIn = () => {
  const loginForm = useForm<SigninFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginMutation = useMutation({
    mutationFn:loginUser,
    onSuccess:async (data) =>{
      toast.success(' Hooray! You’re logged in successfully! 🥳🎉✨');


      const user = {
        id:data?.user?.id,
        name:data?.user?.name,
        email:data?.user?.id,
        avatar:data?.user?.id,
      }
     
      await SecureStore.setItemAsync("user",JSON.stringify(user));

      if(data?.accessToken){
        await storeAccessToken(data.accessToken);
      }
      if(data?.refreshToken){
        await SecureStore.setItemAsync("refresh_token",data.refreshToken);
      }
      router.replace("/(tabs)/Home")
    },
    onError:(error:Error)=>{
      toast.error(error?.message);
    },
  });

  const onLoginSubmit = (data:SigninFormData)=>{
    loginMutation.mutate(data);
  }
  const handleSignUpNavigation = () => {
    router.push("/screens/SignUp");
  };
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mt-10 mb-6">
            <Text className="text-3xl font-poppins-bold text-gray-900 mb-2">
              Welcome Back 
            </Text>
            <Text className="text-gray-500 font-poppins text-base mt-2">
              Sign in to your account
            </Text>
          </View>
          {/* Form Field */}
          <View className="gap-6 mt-6">
            <View className="mt-4">
              <Text className="text-gray-800 text-base font-poppins-medium mb-3">
                Email or Phone number
              </Text>
              <Controller
                control={loginForm.control}
                name="email"
                rules={{
                  required: "Email/Phone number is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+/,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <View
                      className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-2 border 
                       ${loginForm.formState.errors.email ? "border-red-500" : "border-gray-200"}`}
                    >
                      <Ionicons name="mail-outline" size={20} color="#9CA3AF" />

                      <TextInput
                        className="flex-1 ml-3 text-gray-800 font-poppins"
                        placeholder="Enter your email/phone no."
                        placeholderTextColor="#9CA3AF"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="none"
                        editable={!loginMutation.isPending}
                      />
                    </View>

                    {loginForm.formState.errors.email && (
                      <Text className="text-red-500 text-sm font-poppins mt-2">
                        {loginForm.formState.errors.email.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
            <View className="mt-4">
              <Text className="text-gray-800 text-base font-poppins-medium mb-2">
                Password
              </Text>
              <Controller
                control={loginForm.control}
                name="password"
                rules={{
                  required: "Password is required",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <View
                      className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-2 border 
                   ${loginForm.formState.errors.password ? "border-red-500" : "border-gray-200"}`}
                    >
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#9CA3AF"
                      />

                      <TextInput
                        className="flex-1 ml-3 text-gray-800 font-poppins"
                        placeholder="Enter your password"
                        placeholderTextColor="#9CA3AF"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={!showPassword}
                        editable={!loginMutation.isPending}
                      />

                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        disabled={loginMutation.isPending}
                      >
                        <Ionicons
                          name={
                            !showPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={20}
                          color="#9CA3AF"
                        />
                      </TouchableOpacity>
                    </View>

                    {loginForm.formState.errors.password && (
                      <Text className="text-red-500 text-sm font-poppins mt-2">
                        {loginForm.formState.errors.password.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
            <TouchableOpacity
              className="self-end"
              onPress={() => router.push("/(routes)/ForgotPassword")}
              disabled={loginMutation.isPending}
            >
              <Text className="text-blue-600 font-poppins-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          {/* Submit Button */}
          <TouchableOpacity
            className={`rounded-xl py-5 mt-6 ${
              loginForm.formState.isValid ? "bg-blue-600" : "bg-gray-300"
            }`}
             onPress={loginForm.handleSubmit(onLoginSubmit)}
             disabled={!loginForm.formState.isValid || loginMutation.isPending}
          >
            <Text className="text-white text-lg font-poppins-semibold text-center ">
              {loginMutation.isPending ? "Signing In..." : "Sign In" }
            </Text>
          </TouchableOpacity>
          {/* Divider */}
          <View className="flex-row items-center my-8">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500 font-poppins">
              Or continue with
            </Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>
          {/* Social login Buttons */}
          <View className="space-y-4 mb-4">
            <TouchableOpacity
              className="flex-row items-center mb-4 justify-center bg-white border border-gray-300 rounded-xl py-4"
              disabled={loginMutation.isPending}
            >
              <View className="w-6 h-6 mr-3">
                <Image
                  source={{
                    uri: "https://developers.google.com/identity/images/g-logo.png",
                  }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-gray-800 text-base font-poppins-medium">
                Sign in with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center mb-4 justify-center bg-white border border-gray-300 rounded-xl py-4"
              disabled={loginMutation.isPending}
            >
              <Ionicons
                name="logo-facebook"
                size={24}
                color="#1877f2"
                className="mr-3"
              />
              <Text className="text-gray-800 text-base font-poppins-medium">
                Sign in with Facebook
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mb-10">
            <Text className="text-gray-600 font-poppins">
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={handleSignUpNavigation}
              disabled={loginMutation.isPending}
            >
              <Text className="text-blue-600 font-poppins-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
