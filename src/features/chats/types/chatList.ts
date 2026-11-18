export type ChatParticipantResponse = {
  _id: string;
  email: string;
  password: string;
  __v: number;
  firstname?: string;
  lastname?: string;
};

export type ChatResponse = {
  _id: string;
  participant_one: ChatParticipantResponse;
  participant_two: ChatParticipantResponse;
  __v: number;
  lastMessageDate: string;
};

export type ChatsFoundResponse = {
  msg: string;
  newChatList: ChatResponse[];
};

export type ChatFilter = "all" | "unread" | "favorites";

export type ChatListItem = {
  id: string;
  otherParticipantId: string;
  displayName: string;
  email: string;
  lastMessageDate: string;
};

export type ChatList = {
  unreadCount: number;
  items: ChatListItem[];
};
