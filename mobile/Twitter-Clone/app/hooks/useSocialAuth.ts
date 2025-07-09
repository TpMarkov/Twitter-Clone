import { useState } from "react";
import { useSSO } from "@clerk/clerk-expo";

export const useSocialAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setIsLoading(true);

    try {
      const { createdSessionId, setActive } = await startSSOflow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.log("Error in social auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSocialAuth };
};
