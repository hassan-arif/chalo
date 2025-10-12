import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative w-full h-[250px]">
        <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
        <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
          Welcome 👋
        </Text>
      </View>

      <View className="p-5">
        <InputField
          label="Email"
          placeholder="Enter your email"
          icon={icons.email}
          value={form.email}
          onChangeText={(email) => setForm({ ...form, email })}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={true}
          icon={icons.lock}
          value={form.password}
          onChangeText={(password) => setForm({ ...form, password })}
        />
      </View>

      <CustomButton title="Sign In" onPress={onSignInPress} className="m-5" />

      <View className="mx-5">
        <OAuth />
      </View>

      <TouchableWithoutFeedback onPress={() => router.back()}>
        <View className="flex-row justify-center mt-10">
          <Text className="text-lg text-general-200">
            Don't have an account?{" "}
          </Text>
          <Text className="text-lg text-primary-500">Sign Up</Text>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SignUp;
