import { GroupeService } from './../Services/groupe.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Groupe } from '../models/groupe';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent   {
  
 /* idGrp: any = 0;
  registerForm: FormGroup;
  loginForm: FormGroup;
  successregister: boolean = false;
  registermsg = "";
  alert = "";
  loginmsg = "";
  alert2 = "";
  successlogin: boolean = false;
  public userObj: User = new User();
  public alluser: any = [];
  secondUsername = "";
  chatObj: Groupe = new Groupe();
  public chatData: any = [];
  check = "";
  loggedIn: boolean = false;
  loggedOut: boolean = true;
  chatbox: boolean = true;

  logout() {
    this.loggedIn = false;
    this.loggedOut = true;
    sessionStorage.clear();
    
    this.router.navigateByUrl('');
  }

  constructor(private router: Router, private userService: UserService, private groupeService: GroupeService) {
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required])
    });
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required])
    });



}

ngOnInit(): void {

  setInterval(() => {
    this.userService.getAll().subscribe((data) => {
      // console.log(data);

      this.alluser = data;

    })
  }, 1000);

}
adduser() {
  if (this.registerForm.valid) {
    this.userObj.nomUser = this.registerForm.value.nomUser;
    this.userService.addUser(this.userObj).subscribe(
      (data: any) => {
        console.log(data);

        this.successregister = true;
        this.alert = "success";
        this.registermsg = "Successsfully added";

        this.registerForm.reset();

      },
      (error) => {
        console.log(error.error);
        if (error.status == 409) {
          this.successregister = true;
          this.alert = "danger";
          this.registermsg = "Already registered"
        } else {
          this.successregister = true;
          this.alert = "danger";
          this.registermsg = "Error"
        }

      }
    )
  }
}

  login() {
    if (this.loginForm.valid) {
      this.userService.getUserByUsername(this.loginForm.value.nomUser).subscribe(
        (data: any) => {
          console.log(data);

          this.successlogin = true;
          this.alert2 = "success";
          this.loginmsg = "Successsfully LoggedIn";

          sessionStorage.setItem("nomUser", this.loginForm.value.nomUser);
          this.check = this.loginForm.value.nomUser;
          this.loginForm.reset();

          this.loggedIn = true;
          this.loggedOut = false;

          // this.router.navigateByUrl('/chat');
        },
        (error) => {
          console.log(error.error);
          if (error.status == 404) {
            this.successlogin = true;
            this.alert2 = "danger";
            this.loginmsg = "Not a registerd user"
          } else {
            this.successlogin = true;
            this.alert2 = "danger";
            this.loginmsg = "Error"
          }

        }
      )
    }

  
  }



goToChat(username: any) {
  this.groupeService.getChatByFirstUserNameAndSecondUserName(username, sessionStorage.getItem("username")).subscribe(
    (data) => {
      this.chatData = data;
      this.idGrp = this.chatData[0].chatId;
      sessionStorage.setItem("chatId", this.idGrp);
      this.router.navigateByUrl('/chat');
    },
    (error) => {
      if (error.status == 404) {
        this.chatObj.firstUserName = sessionStorage.getItem("username");
        this.chatObj.secondUserName = username;
        this.groupeService.createChatRoom(this.chatObj).subscribe(
          (data) => {
            this.chatData = data;
            sessionStorage.setItem("chatId", this.chatData[0].chatId);
            // this.router.navigateByUrl('/chat');
            console.log("2")
          })
      } else {
        // this.router.navigateByUrl('/chat');
        console.log("3")
      }
    });

}*/



}
