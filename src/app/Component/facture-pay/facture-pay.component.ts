import { Component, Input, OnInit } from '@angular/core';
import { CommandLine } from 'src/app/Models/ShopManag/CommandLine';
import { Product } from 'src/app/Models/ShopManag/Product';
import { CommandLineService } from 'src/app/Services/CommandLine/command-line.service';
import { OrderrService } from 'src/app/Services/Orderr/orderr.service';

@Component({
  selector: 'app-facture-pay',
  templateUrl: './facture-pay.component.html',
  styleUrls: ['./facture-pay.component.css']
})
export class FacturePayComponent implements OnInit{
  @Input() commandeLine!: CommandLine; 
  product!:Product;

  constructor(private orderService: OrderrService,
              private commandLineService: CommandLineService,){}


  getImageUrl(image:string): string {
    return `http://localhost/Uploads/ProductImages/${image}`;
  }
  
  ngOnInit(): void {
    this.getProductByCommandLine(this.commandeLine.idLigneCom);
  }

  getProductByCommandLine(id:number):void{
    this.commandLineService.getProductByCommandLine(id).subscribe(
      (product: Product) => {
        this.product=product;
        console.log(this.product);
        
      },
      (error: any) => {
        console.error('Une erreur est survenue lors de la récupération du dernier ordre :', error);
      }
    );
  }

}
