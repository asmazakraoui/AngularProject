import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { FrontComponent } from './FrontOffice/front/front.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { ProductComponent } from './Component/get-product/product.component';
import { AddProductComponent } from './Component/add-product/add-product.component';
import { OrderrComponent } from './Component/get-orderr/orderr.component';
import { UpdateProductComponent } from './Component/update-product/update-product.component';
import { GetProductFrontComponent } from './Component/get-product-front/get-product-front.component';
import { CardProductFrontComponent } from './Component/card-product-front/card-product-front.component';
import { CardBackComponent } from './Component/card-back/card-back.component';
import { CartProductComponent } from './Component/cart-product/cart-product.component';
import { CardCartComponent } from './Component/card-cart/card-cart.component'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PromotionComponent } from './Component/promotion/promotion.component';
import { AddPromotionComponent } from './Component/add-promotion/add-promotion.component';
import { UpdatePromotionComponent } from './Component/update-promotion/update-promotion.component';
import { NavBackComponent } from './BackOffice/nav-back/nav-back.component';
import { SidebarComponent } from './BackOffice/sidebar/sidebar.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { BackComponent } from './BackOffice/back/back.component';
import { DashbordComponent } from './BackOffice/dashbord/dashbord.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PayCarteComponent } from './Component/pay-carte/pay-carte.component';
import { FacturePayComponent } from './Component/facture-pay/facture-pay.component';
import { DeliveryPageComponent } from './Component/delivery-page/delivery-page.component';
import { OrderBackComponent } from './Component/order-back/order-back.component';
import { DeliveryBackComponent } from './Component/delivery-back/delivery-back.component';
import { DashboardProductComponent } from './Component/dashboard-product/dashboard-product.component';
import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    AppComponent,
    HomeFrontComponent,
    FooterFrontComponent,
    FrontComponent,
    HeaderFrontComponent,
    NavBackComponent,
    SidebarComponent,
    FooterBackComponent,
    BackComponent,
    DashbordComponent,
    ProductComponent,
    AddProductComponent,
    OrderrComponent,
    UpdateProductComponent,
    GetProductFrontComponent,
    CardProductFrontComponent,
    CardBackComponent,
    CartProductComponent,
    CardCartComponent,
    PromotionComponent,
    AddPromotionComponent,
    UpdatePromotionComponent,
    PayCarteComponent,
    FacturePayComponent,
    DeliveryPageComponent,
    OrderBackComponent,
    DeliveryBackComponent,
    DashboardProductComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    NgbModule,
    ChartsModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
