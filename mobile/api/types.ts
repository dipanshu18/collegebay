export interface IPost {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  isAvailable: boolean;
  isApproved: boolean;
  seller: {
    id: string;
    image: string;
    name: string;
    email: string;
    college: string;
    phoneNo: string;
  };
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProfile {
  id: string;
  image: string;
  name: string;
  email: string;
  college: string;
  phoneNo: string;
  posts: IPost[];
  requests: IUserRequest[];
}

export interface IUserRequest {
  id: string;
  title: string;
  description: string;
  image: string;
  isApproved: boolean;
  userId: string;
  createdAt: Date;
  user: {
    image: string;
    name: string;
    email: string;
    college: string;
    phoneNo: string;
  };
  _count: {
    upVotes: number;
  };
}

export interface IChat {
  id: string;
  participants: {
    id: string;
    name: string;
    college: string;
    image: string;
  }[];
  messages: {
    id: string;
    type: "TEXT" | "IMAGE" | "VIDEO";
    mediaUrl: string | null;
    text: string | null;
    chatId: string;
    senderId: string;
    sender: {
      id: string;
      name: string;
      college: string;
      image: string;
    };
    createdAt: Date;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  id: string;
  type: "TEXT" | "IMAGE" | "VIDEO";
  mediaUrl: string | null;
  text: string | null;
  chatId: string;
  senderId: string;
  sender: {
    id: string;
    name: string;
    college: string;
    image: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserNotification {
  id: string;
  targetType:
    | "MESSAGE"
    | "ADMIN_APPROVE"
    | "ADMIN_REJECT"
    | "UPVOTE"
    | "POST"
    | "REQUEST";
  action: {
    id: string;
    name: string;
    image: string;
  };
  targetId: string;
  actionId: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
