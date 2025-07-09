import { View, Text, Button } from "react-native";
import React from "react";
import { useClerk } from "@clerk/clerk-expo";

const index = () => {
  const { signOut } = useClerk();

  return (
    <View>
      <Text>Home Screen</Text>
      <Button onPress={() => signOut()} title="logout"></Button>
    </View>
  );
};

export default index;
