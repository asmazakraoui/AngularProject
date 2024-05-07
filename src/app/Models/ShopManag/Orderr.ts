import { CommandLine } from 'src/app/models/ShopManag/CommandLine';

export class Orderr{
    idCom!: number;
    nbProduit!: number;
    totalPrix!: number;
    remise!: number;
    statusCom!: boolean;
    dateCommande!:Date;
    modePayement!: ModePayement;
    commandLines!: CommandLine[];
}
export enum ModePayement{
    Card="Credir_card",
    Cash="cash"
}