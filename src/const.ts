export const USE_DEBUG_SOCKET =
  import.meta.env.VITE_USE_DEBUG_SOCKET.toLowerCase() === "true";

export const SOCKET_SERVER_URL = `${
  import.meta.env.VITE_SOCKET_SERVER_URL ?? ""
}`;
