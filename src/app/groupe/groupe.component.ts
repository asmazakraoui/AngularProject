import { GroupeService } from './../Services/groupe.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Groupe } from '../models/groupe';
import { Message } from '../models/message';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent {
  /*chatForm: FormGroup;
  chatObj: Groupe = new Groupe();
  messageObj: Message = new Message();
  messageList: Message[] = [];
  chatList: Groupe[] = [];
  secondUserName = "";
  alluser: any = [];
  check = sessionStorage.getItem('username');
  firstUserName = sessionStorage.getItem('username');
  loggedIn = false;
  loggedOut = true;
  chatbox = true;

  constructor(private groupeService: GroupeService, private router: Router, private userService: UserService) {
    this.chatForm = new FormGroup({
      replymessage: new FormControl()
    });
  }

  ngOnInit(): void {
    this.loadChatData();
    this.loadChatList();
    this.loadAllUsers();
  }

  loadChatData() {
    setInterval(() => {
      this.groupeService.getChatById(sessionStorage.getItem('chatId')).subscribe(data => {
        this.messageList = data.messageList || [];
        this.secondUserName = data.secondUserName || "";
        this.firstUserName = data.firstUserName || "";
      });
    }, 1000);
  }

  loadChatList() {
    let getByname = setInterval(() => {
      this.groupeService.getChatByFirstUserNameOrSecondUserName(sessionStorage.getItem('username')).subscribe(data => {
        if (Array.isArray(data)) {
          this.chatList = data as Groupe[];
        } else {
          this.chatList = [];
        }
      });
    }, 1000);
  }

  loadAllUsers() {
    let all = setInterval(() => {
      this.userService.getAll().subscribe((data) => {
        this.alluser = data || [];
      });
    }, 1000);
  }

  sendMessage() {
    if (this.chatForm.valid) {
      this.messageObj.replymessage = this.chatForm.value.replymessage;
      this.groupeService.updateChat(this.messageObj, sessionStorage.getItem('chatId')).subscribe(data => {
        this.chatForm.reset();
        this.loadChatData();
      });
    }
  }

  routeX() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

  routeHome() {
    this.router.navigateByUrl('');
  }

  goToChat(username: any) {
    this.groupeService.getChatByFirstUserNameAndSecondUserName(username, sessionStorage.getItem("username")).subscribe(
      (data: any) => {
        if (data && data.idGrp) { // Vérifier si data est défini et si la propriété idGrp existe
          sessionStorage.setItem("chatId", data.idGrp.toString());
        } else {
          console.log("Data or idGrp property is missing.");
        }
      },
      (error) => {
        if (error.status == 404) { // Utiliser error.status pour vérifier le statut de l'erreur
          this.chatObj.firstUserName = sessionStorage.getItem("username");
          this.chatObj.secondUserName = username;
          this.groupeService.createChatRoom(this.chatObj).subscribe(
            (data: any) => { // Spécifier le type de données comme any
              if (data && data.idGrp) { // Vérifier si data est défini et si la propriété idGrp existe
                sessionStorage.setItem("chatId", data.idGrp.toString());
              }
            });
        } else {
          console.log("Error occurred:", error);
        }
      }
    );
  }*/
  
}
