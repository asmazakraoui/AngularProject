export class JobApplication{
        id:number;
        certificateFile:String;
        cvFile:String;
        applicationDate:Date;
        user: {
                nomUser: string;
                prenomUser: string;
                emailUser: string;
                sexe: string;
                dateNaiss: Date;
                accountConfirmed:Boolean;
              };

}