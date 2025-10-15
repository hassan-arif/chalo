import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const Index = () => {
  const { isLoaded, isSignedIn } = useAuth();

  return isLoaded ? (
    isSignedIn ? (
      <Redirect href={"/(root)/(tabs)/home"} />
    ) : (
      <Redirect href="/(auth)/welcome" />
    )
  ) : (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default Index;
