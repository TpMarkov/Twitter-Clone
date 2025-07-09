import { TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useSignOut } from "@/app/hooks/useSIgnOut";

const SignoutButton = () => {
  const { handleSignOut } = useSignOut();
  return (
    <TouchableOpacity onPress={handleSignOut} className="py-5 px-5">
      <Feather name="log-out" size={24} color={"#E0245E"} />
    </TouchableOpacity>
  );
};

export default SignoutButton;
