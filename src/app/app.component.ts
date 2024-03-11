import { Component, ViewChild, TemplateRef } from '@angular/core';
import { IPost, IUser } from '../app/shared/interfaces/posts/posts.interface';
import { MyServiceService } from '../app/shared/services/post.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('signInForm') signInForm!: TemplateRef<any>;
  @ViewChild('signUpForm') signUpForm!: TemplateRef<any>;
  @ViewChild('postForm') postForm!: TemplateRef<any>;

  title = 'angular-blog';

  public isTemplateVisible = false;
  public currentTemplate: TemplateRef<any> | null = null;

  inputUsername: string = '';
  inputEmail: string = '';
  inputPassword: string = '';
  formControls: { [key: string]: { touched: boolean; invalid: boolean } } = {};
  email: any;
  password: any;

  titlePost: string = '';
  textMessage: string = '';

  public adminPosts!: IPost[];
  public adminUsers!: IUser[];
  public usersAll = this.postService.getUsers;
  public nameLog!: string;
  public clicker: boolean = false;
  public errorTxt!: string;
  public editPostClicker!: boolean;
  editingPost: IPost | null = null;
  clikedStatus: boolean = false;

  // public nameRegExp: RegExp = /^[a-zA-Z&]{4,16}$/;
  public passRegExp: RegExp = /^[a-zA-Z0-9._-]{4,16}$/;
  public emailExp: RegExp = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  
  constructor(
    private postService: MyServiceService
  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();

  }

  getPosts(): void {
    this.adminPosts = this.postService.getPosts();
  }
  getUsers(): void {
    this.adminUsers = this.postService.getUsers();
  }

  openTemplate(templateType: string) {
    this.isTemplateVisible = true;
    if (templateType === 'signIn') {
      this.currentTemplate = this.signInForm;
    } else if (templateType === 'signUp') {
      this.currentTemplate = this.signUpForm;
    } else if (templateType === 'addPost') {
      this.currentTemplate = this.postForm;

    }
  }

  closeTemplate() {
    this.isTemplateVisible = false;
    this.currentTemplate = null;
  }

  submit() {
    const user = this.adminUsers.find(u => u.email === this.email && u.password === this.password);
    if (user) {
      this.nameLog = user.username;
      console.log('User found:', user);
      this.isTemplateVisible = false;
      this.currentTemplate = null;
      this.clicker = true;
    } else {
      this.clicker = false;
      this.errorTxt = 'User not found or incorrect password';
    }
   
    // this.validateEmail(this.email)
    this.email = '';
    this.password = '';
  }

  signup() {
    const index = this.adminUsers.length;
    const newUser: IUser = {
      id: index + 1,
      username: this.inputUsername,
      email: this.inputEmail,
      password: this.inputPassword
    };
    this.adminUsers.push(newUser);
    console.log(this.adminUsers);
    this.isTemplateVisible = false;
    this.inputPassword = '';
    this.inputEmail = '';
    this.inputUsername = '';
  }

  shouldShowButtons(post: any): boolean {
    const isUserAdmin = this.nameLog === 'admin' || this.nameLog === post.postedBy;
    return isUserAdmin;
  }

  addPost() {
    if (!this.titlePost || !this.textMessage) {
      // Show an error message or handle the case where fields are empty
      // this.clicker = false;
      this.errorTxt = 'Please fill in all required fields';
      return;
    }

    const now = new Date();
    const index = this.adminPosts.length;
    const newPost: IPost = {
      id: index + 1,
      postedBy: this.nameLog,
      topic: this.titlePost,
      date: new Date(`${now.toLocaleString()}`),
      message: this.textMessage
    };
    this.adminPosts.push(newPost);
    console.log(this.adminPosts);
    this.isTemplateVisible = false;
    this.currentTemplate = null;
    this.clicker = true;
    this.resetFormAndToggleTemplate();
  }

  signOut() {
    this.clicker = false;
  }

  deletePost(post: IPost): void {
    const index = this.adminPosts.indexOf(post);
    if (index !== -1) {
      this.adminPosts.splice(index, 1);
    }
  }

  editPost(post: IPost) {
    this.isTemplateVisible = true;
    this.currentTemplate = this.postForm;
    this.clikedStatus = true;
    this.editingPost = post;
    this.titlePost = post.topic;
    this.textMessage = post.message;
  }
  savePost() {
    const editedPostIndex = this.adminPosts.findIndex(p => p === this.editingPost);
    if (editedPostIndex !== -1) {
      this.adminPosts[editedPostIndex] = {
        id: this.editingPost!.id,
        postedBy: this.editingPost!.postedBy,
        topic: this.titlePost,
        date: new Date(`${this.editingPost?.date}`),
        message: this.textMessage
      };
    }
    console.log(this.adminPosts);
    this.isTemplateVisible = false;
    this.currentTemplate = null;
    this.clicker = true;
    this.clikedStatus = false;
    this.resetFormAndToggleTemplate();
  }

  private resetFormAndToggleTemplate() {
    this.titlePost = '';
    this.textMessage = '';
  }
}
