import { Component, Input, OnInit } from '@angular/core';
import { ProductInfo } from 'src/app/Models/ShopManag/ProductInfo';
import { CommandLineService } from 'src/app/Services/CommandLine/command-line.service';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommandLine } from 'src/app/Models/ShopManag/CommandLine';
import { ProductService } from 'src/app/Services/Product/product.service';
import { Product } from 'src/app/Models/ShopManag/Product';
import { interval } from 'rxjs';

@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrls: ['./card-cart.component.css']
})
export class CardCartComponent implements OnInit{

  @Input() product!: ProductInfo;
  @Input() id!: number;
  cartProducts: ProductInfo[]=[];
  idU!:number;
  quantity!:number;
  idCart!:number;
  CommandLineForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private commandLineService:CommandLineService,
     private cartproductComponent: CartProductComponent, private productService:ProductService){}

  ngOnInit(): void {
    this.CommandLineForm = this.formBuilder.group({
      quantite: ['', Validators.required]});
      this.quantity = 1;
      /*interval(100).subscribe(() => {
        this.updateCommandLine();
      });*/
  }

  getImageUrl(): string {
    return `http://localhost/Uploads/ProductImages/${this.product.imageProduit}`;
  }
  deleteCommandLine(id:number): void {
    this.commandLineService.deleteCommandLine(id).subscribe(() : void => {
      this.cartproductComponent.getCartProducts();
    });
  }
  getidCart(idCart:number): void{
    this.idCart=idCart;
  }
  
  updateTotalPrice() {
    this.product.totalPrice = this.product.prixProduit * this.quantity;
  }

  updateCommandLine(): void {
    /*const totalPrice = this.product.prixProduit * this.quantity; // Calcul du prix total
    const commandLine: CommandLine = {
      idLigneCom: this.id,
      quantite: this.quantity,
      prix_total_product: totalPrice
    };*/
    this.product.quantity=this.quantity;
    this.product.totalPrice=this.product.prixProduit * this.quantity; 

   // console.log(commandLine);
      this.commandLineService.updateCart(this.product).subscribe(() => {
        // Réinitialiser les valeurs après la mise à jour
        // Vous pouvez également réinitialiser d'autres valeurs si nécessaire
      });
    
}

  
  

}
