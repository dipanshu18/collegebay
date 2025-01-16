export interface IPost {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  isAvailable: boolean;
  isApproved: boolean;
  userId: string;
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
