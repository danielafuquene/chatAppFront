import io from "socket.io-client";
import { ENV } from "../../constants/constants";

export let socket: any;

export const connectSocket = () => {
  socket = io(ENV.SOCKET_URL, {
    transports: ["websocket"],
  });
};
