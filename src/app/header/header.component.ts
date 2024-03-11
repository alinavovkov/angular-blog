import { Component, ViewChild, TemplateRef } from '@angular/core';
import { IPost, IUser } from '../../app/shared/interfaces/posts/posts.interface';
import { MyServiceService } from '../../app/shared/services/post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('signInForm') signInForm!: TemplateRef<any>;
  @ViewChild('signUpForm') signUpForm!: TemplateRef<any>;

  public isTemplateVisible = false;
  public currentTemplate: TemplateRef<any> | null = null;

  inputFirst: string = '';
  inputLast: string = '';
  inputPhone: string = '';
  formControls: { [key: string]: { touched: boolean; invalid: boolean } } = {};
  email: any;
  password: any;

  public adminPosts!: IPost[];
  public adminUsers!: IUser[];
  public usersAll = this.postService.getUsers;
  public nameLog!: string;
  public clicker: boolean = false;
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
    }
  }

  closeTemplate() {
    this.isTemplateVisible = false;
    this.currentTemplate = null;
  }
  submit() {
    // const user = this.adminUsers.find(u => u.email === this.email && u.password === this.password);
    const user = this.adminUsers.find(u => u.email === this.email);

    if (user) {
      this.nameLog = user.username;
      console.log('User found:', user);
      this.isTemplateVisible = false;
      this.currentTemplate = null;
      this.clicker = false;
      console.log(this.clicker);
    } else {
      console.log('User not found or incorrect password');
      // this.isTemplateVisible = true;
      // this.currentTemplate = this.signInForm;
      // this.clicker = false;
      // console.log(this.clicker);
    }
  }
}
