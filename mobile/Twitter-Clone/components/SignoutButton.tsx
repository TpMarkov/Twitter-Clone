import { TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useSignOut } from "@/app/hooks/useSIgnOut";

const SignoutButton = () => {
  const { handleSignOut } = useSignOut();
  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Feather name="log-out" size={24} color={"#E0245E"} />
    </TouchableOpacity>
  );
};

export default SignoutButton;
