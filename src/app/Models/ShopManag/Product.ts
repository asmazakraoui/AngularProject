export class Product{
    idProduit!: number;
    nomProduit!: string;
    dateFabrication!: Date;
    dateExpiration!: Date;
    description!: string;
    prixProduit!: number;
    imageProduit!: string;
    nbrProduit!: number;
    statusProd!: boolean;
    typeShop!: TypeShop;
    categorie!: Categorie;
    largeur!:number;
    hauteur!:number;
}
export enum Categorie{
    Dairy_Products ='Dairy_products',
    Bakery_and_Pastries='Bakery_and_Pastries',
    Cereal_Products='Cereal_Products',
    Meats_and_substitutes='Meats_and_substitutes',
    Canned_and_Packaged_Goods='Canned_and_Packaged_Goods',
    Beverages='Beverages'
}
export enum TypeShop{
    Store='Store',
    Pharmacy='Pharmacy'

}