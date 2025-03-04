import SocketContext from "@/context/SocketContext";
import { useContext } from "react";

export default function useSocket() {
  const socketContext = useContext(SocketContext);

  if (socketContext === undefined) {
    throw new Error("Socket Context must be used inside Socket Provider");
  }

  return socketContext;
}
