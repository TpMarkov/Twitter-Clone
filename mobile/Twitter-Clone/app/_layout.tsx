import "../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";

export default function RootLayoutNav() {
  /* Your App */
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </ClerkProvider>
  );
}
