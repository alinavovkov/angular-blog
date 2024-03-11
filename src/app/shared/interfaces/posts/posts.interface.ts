export interface IPost {
    id: number;
    postedBy: string;
    topic: string;
    date: Date;
    message: string;
  }
  
  export interface IUser {
    id: number;
    username: string;
    email: string;
    password: any;
  }