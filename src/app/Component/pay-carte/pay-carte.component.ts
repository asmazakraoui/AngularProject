import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stripe, StripeCardElement, StripeElements, loadStripe } from '@stripe/stripe-js';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { forkJoin } from 'rxjs';
import { CommandLine } from 'src/app/models/ShopManag/CommandLine';
import { Orderr } from 'src/app/models/ShopManag/Orderr';
import { Product } from 'src/app/models/ShopManag/Product';
import { CommandLineService } from 'src/app/Services/CommandLine/command-line.service';
import { DeliveryService } from 'src/app/Services/Delivery/delivery.service';
import { OrderrService } from 'src/app/Services/Orderr/orderr.service';
import { ProductService } from 'src/app/Services/Product/product.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-pay-carte',
  templateUrl: './pay-carte.component.html',
  styleUrls: ['./pay-carte.component.css']
})
export class PayCarteComponent implements OnInit{
  payCarteForm: FormGroup;
  selectedPaymentType: string = 'Cash';// Type de paiement sélectionné ('card' ou 'cash')
  isCardPaymentSelected: boolean = false; // Indique si le paiement par carte est sélectionné
  isCashPaymentSelected: boolean = false;
  checkoutForm!: FormGroup;
  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;
  iduser!: number;
  clientSecret: any;
  stripeElements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;
  paymentMessageShown: boolean = false; // Utilisation de "!" pour indiquer que la propriété sera initialisée avant d'être utilisée
  paymentMessageSuccess: boolean = false;
  paymentMessageText: string = '';
  paymentHandler: any = null;
  amount!:number;
  order!: Orderr;
  commandLines : CommandLine [] = [];
  idUser: number =2;
  product!:Product;

  constructor(private deliveryService: DeliveryService,
              private formBuilder: FormBuilder,
              private orderService: OrderrService,
              private commandLineService: CommandLineService,
              private productService: ProductService,
              private router: Router,){
  
      this.payCarteForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['',  [Validators.required, Validators.pattern('[0-9]{8}')]],
        address: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['',  [Validators.required, Validators.pattern('[0-9]{4}')]],
        typePayment:  ['']
      });     
    }

    onTypePaymentChange(event: Event): void {
      const selectedValue = (event.target as HTMLSelectElement).value;
      console.log("hey");
      this.selectedPaymentType = selectedValue; // Assuming selectedValue can be either 'card' or 'cash'
      this.isCardPaymentSelected = this.selectedPaymentType === 'Card';
      this.isCashPaymentSelected = this.selectedPaymentType === 'Cash';
      console.log(this.isCardPaymentSelected);
    }

    getLastOrderForUser(): void {
      this.orderService.getLastOrderForUser().subscribe(
        (order: Orderr) => {
          this.order = order;
          this.getCommandLinesByOrder();
        },
        (error: any) => {
          console.error('Une erreur est survenue lors de la récupération du dernier ordre :', error);
        }
      );
    }

    getCommandLinesByOrder():void{
      this.orderService.getCommandLinesByOrder(this.order.idCom).subscribe(
        (commandLinesList: CommandLine[]) => {
          this.commandLines = commandLinesList;
          console.log(this.commandLines);
        },
        (error: any) => {
          console.error('Une erreur est survenue lors de la récupération du dernier ordre :', error);
        }
      );
    }


    addDelivery(idCom:number): void {
      console.log("tesssst");
      if (this.payCarteForm.valid) {
        const deliveryDto = {
          firstName: this.payCarteForm.get('firstName')?.value,
          lastName: this.payCarteForm.get('lastName')?.value,
          phone: this.payCarteForm.get('phone')?.value,
          address: this.payCarteForm.get('address')?.value,
          country: this.payCarteForm.get('country')?.value,
          postalCode: this.payCarteForm.get('postalCode')?.value,
          idCom: idCom
        };
        console.log(deliveryDto);
        this.deliveryService.addDelivery(deliveryDto).subscribe(() => {
          //alert("Delivery added successfully!");
          this.payCarteForm.reset();
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'error!',
            footer: '<a href="#">Pourquoi cette erreur?</a>'
          });;
          console.error(error);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all the required fields correctly.',
          footer: '<a href="#">Pourquoi cette erreur?</a>'
        });
      } 

    }

  ngOnInit() {
    this.invokeStripe();
    this.getLastOrderForUser();
  }

  Payment() {
    this.getLastOrderForUser();
    this.amount=this.order.totalPrix;
    console.log('1',this.amount);
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51P8VkXRposRj4ai95obdTnM8maLLUleTKhszTGycfR0xKwR7KfCzCShAjFEQITPNK8pHnCxWCLNcQxioMopSGWKe0058mGbTAm',
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log('stripe hahah');     
      }
      });
    paymentHandler.open({
      name: 'Payment',
      description: 'Enter your bank card number',
      amount: this.amount * 100 ,
    });
    this.updateQuantityProduct();
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }

  async saveInvoiceAsPDF(contractData: string): Promise<void> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(contractData, {
      x: 50,
      y: page.getHeight() - 100,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Invoice.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
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

  updateQuantityProduct(): void {
    const getProductObservables = this.commandLines.map(commandLine => this.commandLineService.getProductByCommandLine(commandLine.idLigneCom));
  

    forkJoin(getProductObservables).subscribe(
      (products: Product[]) => {
        products.forEach((product, index) => {
          const commandLine = this.commandLines[index];
          this.productService.updateQuantityProduct(product.idProduit, commandLine.quantite).subscribe(
            () => {
              console.log("Quantité mise à jour pour la ligne de commande:", commandLine.idLigneCom);
            },
            (error: any) => {
              console.error('Erreur lors de la mise à jour de la quantité pour la ligne de commande:', commandLine.idLigneCom, error);
            }
          );
        });
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    );
  }

  generateInvoice(): void {
    const orderDate: string = this.order.dateCommande.toString();
    const totalPrice: number = this.order.totalPrix; 
    const discount: number = this.order.remise; 
    const clientName: string = "Eya Grati";
    const commandLines: CommandLine[] = this.commandLines; 
    const getProductObservables = commandLines.map(commandLine => this.commandLineService.getProductByCommandLine(commandLine.idLigneCom));

    forkJoin(getProductObservables).subscribe(
        (products: Product[]) => {
            let invoiceContent = `
                Invoice
                --------
                
                This invoice is issued to ${clientName} for the following items:

                Date: ${orderDate}
                Total Price: ${totalPrice} $
                Discount: ${discount} $

                Items:
            `;

            commandLines.forEach((commandLine, index) => {
                const product = products[index]; 
                invoiceContent += `
                    ${index + 1}. Product: ${product.nomProduit}, Quantity: ${commandLine.quantite}, Unit Price: ${product.prixProduit}, Total: ${commandLine.prix_total_product}
                `;
            });

            invoiceContent += `
                Terms:
                - Payment Terms:
                  The client agrees to pay the total amount mentioned above.
                - Termination:
                  This invoice is due upon receipt.
                - Governing Law:
                  This invoice shall be governed by and construed in accordance with the laws of your 
                  jurisdiction.

                Thank you for your business!
                
                Frontizo,
            `;

            console.log(invoiceContent); 
            this.saveInvoiceAsPDF(invoiceContent);
        },
        (error: any) => {
            console.error('Une erreur est survenue lors de la récupération des produits pour la facture :', error);
        }
    );
    this.updateStatusOrder();
}
updateStatusOrder():void{
  this.orderService.updateStatusOrder(this.order.idCom).subscribe(
    () => {
      console.log("update Status");
    },
    (error: any) => {
      console.error('Error update Status:', error);
    }
  );
}


}

