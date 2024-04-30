import { GroupeChat } from "./GroupeChat";
import { MessageType } from "./MessageType";
import { User } from "./user";

export class Chat {
    id:number;

    type: MessageType;
    message: string;
   
    date:Date;
    sender:User;
    groupchat:GroupeChat
}

