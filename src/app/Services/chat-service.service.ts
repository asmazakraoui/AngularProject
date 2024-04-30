import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Chat } from 'src/models/Chat';
import { Client } from '@stomp/stompjs';
import { ChatMessage } from '../models/chatMessage';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { HttpClient } from '@angular/common/http';
import { GroupeChat } from 'src/models/GroupeChat';
import { User } from '../models/user';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  
  
  public stompClient: any;
  public messagesSubject = new Subject<any>();
  messages$ = this.messagesSubject.asObservable();
  GroupChat: GroupeChat;
  groupChatid: number;
  currentuser: User;
  constructor(private http: HttpClient,private accountservice:RegisterService) { 
    this.currentuser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}') as User;
    this.groupChatid = 1;
      console.info('groupchatid:', this.groupChatid);
    
  }
  
  connect(url: string): void {
    this.stompClient = new Client({
      webSocketFactory: () => new WebSocket(url)
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket server');
      // Subscribe to your desired destination

      this.stompClient.subscribe('/topic/groupChat/' + this.groupChatid, (message) => {
        this.messagesSubject.next(message);
      }
    );
    };

    this.stompClient.onStompError = (error) => {
      console.error('STOMP protocol error:', error);
    };

    this.stompClient.activate();
  }
  // Method to subscribe to the specified group chat topic
subscribeToGroupChatMessages(groupChatId: number): void {

  // Subscribe to the topic where group chat messages are being broadcasted
  this.stompClient.subscribe('/topic/groupChat/' + groupChatId, (message: any) => { 
    const receivedMessage = message.body;
    // Handle the received message here, such as emitting it through an observable
    this.messagesSubject.next(receivedMessage);
  });

}
   subscribeToTopic(groupChatid: number) {
    this.stompClient.subscribe('/topic/groupChat/' + groupChatid, (message: any) => { 
      const chatMessage = JSON.parse(message.body);
      this.messagesSubject.next(chatMessage);
    });
  }

  sendMessage(destination: string, message: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({ destination, body: JSON.stringify(message) });
    } else {
      console.error('WebSocket connection not established.');
    }
  }
  disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
    }
  }

  getMessages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }
}
