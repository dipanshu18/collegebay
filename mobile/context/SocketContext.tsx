import { BASE_URL } from "@/api/queries";
import type { IChat, IMessage } from "@/api/types";
import { getValue } from "@/utils/secure-store";
import axios from "axios";
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ISocketContext {
  socket?: WebSocket;
  chat: IChat | undefined;
  getChat: (id: string) => void;
  messages: IMessage[];
  handleSendMessage: (inputMessage: string) => void;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  const token = getValue("token");
  const userId = getValue("uid");

  const [socket, setSocket] = useState<WebSocket>();
  const [chat, setChat] = useState<IChat>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const getChat = useCallback(
    async (id: string) => {
      try {
        const response = await axios.get(`${BASE_URL}/chats/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = (await response.data.chat) as IChat;
        setChat(data);
        setMessages(data.messages);
      } catch (error) {
        console.log(error);
      }
    },
    [token]
  );

  async function handleSendMessage(inputMessage: string) {
    if (inputMessage && inputMessage.length < 1) return;

    const payload = JSON.stringify({
      event: "new_message",
      chatId: chat?.id,
      text: inputMessage,
      receiverId: chat?.participants.filter((p) => p.id !== userId)[0].id,
    });
    socket?.send(payload);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://10.0.2.2:7777");
    // const ws = new WebSocket("ws://192.168.0.148:7777");

    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "new_message") {
        setMessages((prev) => [...prev, data.newMessage]);
      }
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        chat,
        messages,
        getChat,
        handleSendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContext;
