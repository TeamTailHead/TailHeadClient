export interface Connection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  onDisconnect(callback: () => void): void;
}
