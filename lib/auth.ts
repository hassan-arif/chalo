import * as Linking from "expo-linking";
import { fetchAPI } from "./fetch";

export const googleOAuthFlow = async (startSSOFlow: any) => {
  try {
    const { createdSessionId, setActive, signUp } = await startSSOFlow({
      strategy: "oauth_google",
      redirectUrl: Linking.createURL("/(root)/(tabs)/home", {
        scheme: "chalo",
      }),
    });

    if (createdSessionId) {
      if (setActive) {
        await setActive({ session: createdSessionId });

        if (signUp?.createdUserId) {
          await fetchAPI("/(api)/user", {
            method: "POST",
            body: JSON.stringify({
              name: `${signUp.firstName} ${signUp.lastName}`,
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
            }),
          });
        }
        return {
          success: true,
          code: "success",
          message: "You have successfully logged in",
        };
      }
    }
    return {
      success: false,
      code: "success",
      message: "An error occurred",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      code: error.code,
      message: error?.errors?.[0]?.longMessage,
    };
  }
};
