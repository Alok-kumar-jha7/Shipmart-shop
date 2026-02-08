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

interface SignupFormData {
  email: string;
  name:string;
  password: string;
}

const SignUp = () => {
  const signupForm = useForm<SignupFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSignInNavigation=()=>{
    router.push('/screens/SignIn');
  }
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
          <View className="mt-16 mb-8">
            <Text className="text-3xl font-poppins-bold text-gray-900 mb-2">
              Create Account
            </Text>
            <Text className="text-gray-500 font-poppins text-base mt-2">
              Sign up and start shopping today
            </Text>
          </View>
          {/* Form Field */}
          <View className="gap-6 mt-8">
            <View className="mt-4">
                <Text className="text-gray-800 text-base font-poppins-medium mb-3">
                    Name
                </Text>
                <Controller
                control={signupForm.control}
                name="name"
                rules={{
                    required:"Name is required",
                    minLength:{
                        value:3,
                        message:'Name should be at least 3 charcters'
                    },
                }}
                render={({
                    field:{onChange, onBlur,value}
                })=>(
                    <View 
                    className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-2 border
                        ${signupForm.formState.errors.name ? "border-red-500" : "border-gray-200"}`}
                        >
                            <Ionicons name="person-outline" size={20} color={'#9CA3AF'}/>
                            <TextInput
                            className="flex-1 ml-3 text-gray-800 font-poppins"
                            placeholder="Create your name"
                            placeholderTextColor={"#9CA3AF"}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            />
                            </View>
                    )}
                    />
                    {signupForm.formState.errors.name && (
                        <Text 
                        className="text-red-500 text-sm font-poppins mt-1">
                            {signupForm.formState.errors.name.message}
                        </Text>
                    )}
            </View>
            <View className="mt-3">
              <Text className="text-gray-800 text-base font-poppins-medium mb-3">
                Email
              </Text>
              <Controller
                control={signupForm.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+/,
                    message: "Please enter a valid email",
                  },
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <View
                      className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-2 border 
                       ${signupForm.formState.errors.email ? "border-red-500" : "border-gray-200"}`}
                    >
                      <Ionicons name="mail-outline" size={20} color="#9CA3AF" />

                      <TextInput
                        className="flex-1 ml-3 text-gray-800 font-poppins"
                        placeholder="Enter your email"
                        placeholderTextColor="#9CA3AF"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        // editable={!signupMutation.isPending}
                      />
                    </View>

                    {signupForm.formState.errors.email && (
                      <Text className="text-red-500 text-sm font-poppins mt-2">
                        {signupForm.formState.errors.email.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
            <View className="mt-3">
              <Text className="text-gray-800 text-base font-poppins-medium mb-2">
                Password
              </Text>
              <Controller
                control={signupForm.control}
                name="password"
                rules={{
                  required: "Password is required",
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <View
                      className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-2 border 
                   ${signupForm.formState.errors.password? "border-red-500" : "border-gray-200"}`}
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
                        // editable={!signupMutation.isPending}
                      />

                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        // disabled={!signupMutation.isPending}
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

                    {signupForm.formState.errors.password && (
                      <Text className="text-red-500 text-sm font-poppins mt-2">
                        {signupForm.formState.errors.password.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
            <TouchableOpacity
              className="self-end"
              onPress={() => router.push("/(routes)/ForgotPassword")}
              // disabled={signupMutation.isPending}
            >
              <Text className="text-blue-600 font-poppins-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          {/* Submit Button */}
          <TouchableOpacity
            className={`rounded-xl py-5 mt-6 ${
              signupForm.formState.isValid ? "bg-blue-600" : "bg-gray-300"
            }`}
            //  onPress={signupForm.handleSubmit(onSignupSubmit)}
            //  disabled={!signupForm.formState.isValid || signupMutation.isPending}
          >
            <Text className="text-white text-lg font-poppins-semibold text-center ">
              {"Sign Up"}
              {/* signupMutation.isPending ? "Signing Up..." :  */}
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
          <View className="space-y-4">
            <TouchableOpacity
              className="flex-row items-center mb-4 justify-center bg-white border border-gray-300 rounded-xl py-4"
              // disabled={signupMutation.isPending}
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
              // disabled={signupMutation.isPending}
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

          <View className="flex-row justify-center mb-8">
            <Text className="text-gray-600 font-poppins">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity 
            // onPress={handleSignInNavigation}
            // disabled={signupMutation.isPending}
            >
              <Text className="text-blue-600 font-poppins-semibold">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
