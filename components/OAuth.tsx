import { icons } from "@/constants";
import { googleOAuthFlow } from "@/lib/auth";
import { useSSO } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useCallback } from "react";
import { Alert, Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

const OAuth = () => {
  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuthFlow(startSSOFlow);

      if (result?.code === "session_exists") {
        Alert.alert("Success", "Session exists. Redirecting to home page");
        router.push("/(root)/(tabs)/home");
      }

      Alert.alert(result?.success ? "Success" : "Error", result?.message);
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </>
  );
};

export default OAuth;
