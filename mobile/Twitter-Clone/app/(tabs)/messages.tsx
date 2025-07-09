import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useState } from "react";
import { CONVERSATIONS, ConversationType } from "../data/conversations";
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native";

const MessagesScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
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

  const openConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
  };

  const closeChatModal = () => {
    setIsChatOpen(false);
    setSelectedConversation(null);
    setNewMessage("");
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      setConversationList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, time: "now" }
            : conv
        )
      );
      setNewMessage("");
      Alert.alert(
        "Message Sent!",
        `Your message has been sent to ${selectedConversation?.user.name}`
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* HEADER */}

      <View className="flex-row items-center justify-between border-b border-gray-100 py-4 px-3">
        <Text className="font-bold text-xl text-gray-900">Messages</Text>
        <TouchableOpacity>
          <Feather name="edit" size={24} color="#1DA1F2"></Feather>
        </TouchableOpacity>
      </View>

      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            className="flex-1 ml-3 text-base"
            placeholder="Search for people and groups"
            placeholderTextColor="#657786"
            value={searchText}
            onChangeText={setSearchText}
          ></TextInput>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        {convesationsList.map((conversation, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50"
            onPress={() => openConversation(conversation)}
            onLongPress={() => deleteConversation(conversation.id)}
          >
            <Image
              className="size-12 rounded-full mr-3"
              source={{ uri: conversation.user.avatar }}
            ></Image>

            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-1">
                <View className="flex-1 flex-row gap-2 items-center">
                  <Text className="font-semibold text-gray-900">
                    {conversation.user.name}
                  </Text>
                  {conversation.user.verified && (
                    <Feather
                      name="check-circle"
                      size={16}
                      color="#1DA1F2"
                      className="ml-1"
                    />
                  )}
                  <Text className="text-gray-500 text-sm ml-1">
                    {"@" + conversation.user.username}
                  </Text>
                </View>
                <Text className="text-gray-500 text-sm">
                  {conversation.time}
                </Text>
              </View>
              <Text className="text-sm text-gray-500" numberOfLines={1}>
                {conversation.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Quick actions */}
      <View className="px-4 py-2 border-t border-gray-50 bg-gray-50">
        <Text className="font-sm text-gray-500 text-center">
          Tap to open Long press to delete
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MessagesScreen;
