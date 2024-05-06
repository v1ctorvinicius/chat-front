import type Message from "./Message";

export default interface chat {
  id: number;
  name: string;
  password: string;
  messages: Message[];
}
  