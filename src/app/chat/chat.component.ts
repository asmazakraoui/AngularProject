import { ActivatedRoute, Router } from '@angular/router';
import { ChatMessage } from '../models/chatMessage';
import { ChatServiceService } from '../Services/chat-service.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Chat } from 'src/models/Chat';
import { Component } from '@angular/core';
import { MessageType } from 'src/models/MessageType';
import { Client } from '@stomp/stompjs';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../Services/register.service';
import { GroupeChat } from 'src/models/GroupeChat';
import { Socket, SocketIoConfig } from 'ngx-socket-io'; // Optional for direct sending (if needed)
import { User } from 'src/models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
 
  chats: Chat[] = [];
  messageContent: string = '';
  messageDisplay:  string;
  messages: { content: string, senderUsername: string }[] = [];

  oldChats: Chat [] = [];
  newChats: Chat [] = [];
  displayedMessages: Chat[] = [];
  sendermessages:string;
  currentChat: Chat;
  socket: Socket; 
  messageInput: string = '';
  nomGroupe: string;
  GroupChat: GroupeChat;
  groupChatid: number;
  currentuser: User;
  myuser: User;
  msg: Chat;
  constructor(private chatService: ChatServiceService,private accountService: RegisterService) { 
    this.currentuser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}') as User;
    
    this.accountService.getCurrentUser().subscribe((data: User) => {
      this.myuser = data;
      console.log('myuser:', this.myuser);
    });

    
  }

 
 
  
  sendMessageto() {
    if (this.messageContent.trim()) {
      // Create a Chat object with message content and sender information (if needed)
      const chatMessage = new Chat();
      chatMessage.message = this.messageContent;
      chatMessage.sender = this.myuser;
      chatMessage.groupchat = this.GroupChat;
      chatMessage.type = MessageType.SENT;
      chatMessage.date = new Date();
      const destination = '/app/chat.sendMessage'; // Match the MessageMapping in Spring Boot

      this.chatService.sendMessage(destination,chatMessage);
        this.messageContent = '';
        console.log(this.messageContent);
  }}
  // Function to extract the message content from the raw WebSocket message
extractMessageContent(message: any): string {
  if (message.body) {
    return message.body.trim(); 
  } else {
    return 'test'; 
  }}
  extractusername(message: any): string {
    if (message) {
      return message.username.trim(); 
    } else {
      return 'test'; 
    }}

  ngOnInit() {  
    
   

    this.chatService.connect('ws://localhost:8082/testtest/ws');
   // this.chatService.subscribeToGroupChatMessages(this.groupChatid);

    this.chatService.messages$.subscribe((result) => {
      const body=JSON.parse(result.body);
      console.info('Received message:', body);
      const content = body.content.trim();
      const senderUsername = body.sender.trim();
      this.messages.push({ content, senderUsername });
      console.info('messageDisplay:', this.messageDisplay);

    }, (error) => {
      console.error('Error processing message:', error);
    }
  );
  }
  ngOnDestroy() {
    // Disconnect from STOMP server on component destruction
    this.chatService.disconnect();
  }


}
