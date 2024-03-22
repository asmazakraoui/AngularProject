export class Podcast {
    idPod!:number;
    audio!: string;
    titrePod!: string;
    typePod!: TypePod;
}


export enum TypePod {
    Health = 'health',
    Human_Developpment = 'human_Developpment' ,
    Audio_book = 'audio_book',
    Music = 'music'
}