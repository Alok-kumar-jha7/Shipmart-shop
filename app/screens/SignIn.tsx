import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding':'height'} className='flex-1'>
        <ScrollView className='flex-1 px-6' showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className='mt-16 mb-8'>
          <Text className='text-3xl font-poppins-bold text-gray-900 mb-2'>
            Welcome Back
          </Text>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})