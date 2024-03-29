export class Book {
    idBook!: number;
    titreBook!: string;
    imageBook!: string;
    typeBook!: TypeBook;
    pdfBook !: string;
    authorName!: string;
    
}


export enum TypeBook {
    Roman = 'roman',
    Language = 'language',
    Economy = 'economy',
    Health = 'health',
    Politics ='politics'
}