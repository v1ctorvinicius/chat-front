import type Message from "./Message";

export default interface chat {
  id: string;
  name: string;
  password: string;
  messages: Message[];
}
  