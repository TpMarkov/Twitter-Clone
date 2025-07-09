import { View, Text, Alert } from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useState } from "react";
import { CONVERSATIONS, ConversationType } from "../data/conversations";

const MessagesScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchedText, setSearchedText] = useState("");
  const [convesationsList, setConversationList] = useState(CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const deleteConversation = (conversationId: number) => {
    Alert.alert(
      "Delete Conversation",
      "Are you sure you want to delete this conversation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setConversationList((prev) =>
              prev.filter((conv) => conv.id !== conversationId)
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView>
      <Text>MessagesScreen</Text>
    </SafeAreaView>
  );
};

export default MessagesScreen;
