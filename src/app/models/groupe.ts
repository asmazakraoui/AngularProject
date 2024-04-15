import { Message } from "./message";

export class Groupe {
    idGrp! : Number;
    nomGroupe! : String;
   
    firstUserName: string;
    secondUserName: string;
   
     membreGrp! : Number;
   dateCreationGrp! : Date;
   messageList: Message[];
}