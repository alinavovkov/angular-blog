import { Injectable } from '@angular/core';
import { IPost, IUser } from '../interfaces/posts/posts.interface';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  public posts: Array<IPost> = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'programing',
      date: new Date ('3/5/2024, 8:45:11 AM'),
      message: 'about frontend'
    },
    {
      id: 2,
      postedBy: 'admin',
      topic: 'programing',
      date: new Date ('3/5/2024, 11:45:11 AM'),
      message: 'about frontend'
    },
    {
      id: 3,
      postedBy: 'alina',
      topic: 'programing',
      date: new Date ('3/5/2024, 7:45:11 PM'),
      message: 'about frontend'
    }
  ];
  public users: IUser[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: '1234'
    },
    {
      id: 2,
      username: 'alina',
      email: 'alina',
      password: '1234'
    }
  ];

  constructor() {     
  }
  getPosts(): Array<IPost> {
    return this.posts;
  }
  getUsers(): Array<IUser> {
     return this.users;
  }
}

