import { BASE_URL } from "@/api/queries";
import { IChat, IMessage } from "@/api/types";
import { COLOR } from "@/constants/COLOR";
import useSocket from "@/hooks/useSocket";
import { getValue } from "@/utils/secure-store";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ChatBox() {
  const userId = getValue("uid");

  const { id } = useLocalSearchParams();

  const { chat, messages, getChat, handleSendMessage } = useSocket();

  useEffect(() => {
    getChat(id as string);
  }, [getChat, id]);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollToEnd({ animated: true });
    }, 50);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {chat?.messages && chat.messages.length > 0 ? (
          <FlatList
            ref={messagesEndRef}
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            onContentSizeChange={() => {
              setTimeout(() => {
                messagesEndRef.current?.scrollToEnd({ animated: true });
              }, 50);
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View
                  style={[
                    {
                      gap: 5,
                      borderRadius: 10,
                      marginVertical: 5,
                      padding: 10,
                      width: "90%",
                    },
                    item.senderId === userId
                      ? {
                          backgroundColor: COLOR.primary,
                          marginLeft: "auto",
                        }
                      : { backgroundColor: "#E5E7EB", marginRight: "auto" },
                  ]}
                >
                  <Text
                    style={[
                      { color: "white", fontSize: 20, fontWeight: "500" },
                      item.senderId === userId && { textAlign: "right" },
                      item.senderId !== userId && { color: COLOR.primary },
                    ]}
                  >
                    {item.text}
                  </Text>
                  <View
                    style={[
                      {
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      },
                      item.senderId === userId && { marginLeft: "auto" },
                    ]}
                  >
                    <Image
                      source={{ uri: item.sender.image }}
                      width={30}
                      height={30}
                      style={{ borderRadius: 100 }}
                    />
                    <Text
                      style={[
                        {
                          color: "white",
                          fontSize: 15,
                          fontWeight: "700",
                        },
                        item.senderId !== userId && { color: COLOR.primary },
                      ]}
                    >
                      {item.senderId === userId ? "You" : item.sender.name}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <View>
            <Text>No messages yet</Text>
          </View>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <TextInput
          placeholder="enter your message"
          style={styles.textInputBox}
          onChangeText={setInputMessage}
          value={inputMessage}
        />
        <Pressable
          onPress={async () => {
            await handleSendMessage(inputMessage);

            setInputMessage("");
          }}
          style={{
            backgroundColor: COLOR.primary,
            width: "15%",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 13,
          }}
        >
          <Feather name="send" size={25} color={"white"} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", gap: 10, padding: 10 },
  textInputBox: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ced4da",
    fontSize: 15,
    flex: 1,
  },
});
