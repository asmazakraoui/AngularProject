export class Event {
    idEvent!: number;
    titreEvent!: string;
    dateEvent!: Date;
    imageEvent!: string;
    nrParticipants!: number;
    nbTotalPlace!: number;
    adresseEvent!: string;
    typeEvent!: TypeEvent;
    meansTransport!: MeansTransport;
    idus!: number;
    prixEvent!: number
    
  }
  
  export enum MeansTransport {
    Bus = 'bus',
    Car = 'car'
  }
  
  export enum TypeEvent {
    Donation = 'donation',
    Party = 'party',
    Hiking = 'hiking'
  }
  