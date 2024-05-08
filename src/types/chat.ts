import type Message from "./message";

export default interface Chat {
  id: string;
  name: string;
  password: string;
  messages: Message[];
}
