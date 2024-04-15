import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chatMessage';
import { BehaviorSubject } from 'rxjs';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: any
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor() {
    this.initConnenctionSocket();
   }

   initConnenctionSocket() {
    const baseURL = '//localhost:8082/test/chat-socket';
    const socket = new SockJS(baseURL);
    this.stompClient = Stomp.over(socket)
  }
  joinRoom(roomId: string) {
    this.stompClient.connect({}, ()=>{
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);

        this.messageSubject.next(currentMessage);

      })
    })
  }

  sendMessage(roomId: string, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  }

  getMessageSubject(){
    return this.messageSubject.asObservable();
  }
}
