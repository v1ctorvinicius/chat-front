import type User from "@/types/user";

export default interface Message {
  chatId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
}
