export default interface Message {
  id: number;
  chatId: number;
  content: string;
  userId: number;
  timestamp: string;
  sender: string;
}
