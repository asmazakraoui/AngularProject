import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './FrontOffice/front/front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { ProductComponent } from './Component/get-product/product.component';
import { AddProductComponent } from './Component/add-product/add-product.component';
import { UpdateProductComponent } from './Component/update-product/update-product.component';
import { GetProductFrontComponent } from './Component/get-product-front/get-product-front.component';
import { CartProductComponent } from './Component/cart-product/cart-product.component';
import { PromotionComponent } from './Component/promotion/promotion.component';
import { AddPromotionComponent } from './Component/add-promotion/add-promotion.component';
import { UpdatePromotionComponent } from './Component/update-promotion/update-promotion.component';
import { DashbordComponent } from './BackOffice/dashbord/dashbord.component';
import { PayCarteComponent } from './Component/pay-carte/pay-carte.component';
import { DeliveryPageComponent } from './Component/delivery-page/delivery-page.component';
import { OrderBackComponent } from './Component/order-back/order-back.component';
import { DeliveryBackComponent } from './Component/delivery-back/delivery-back.component';
import { DashboardProductComponent } from './Component/dashboard-product/dashboard-product.component';

export const routes: Routes = [
  {
    path:"",
    component:FrontComponent,
    children:[
      {
        path:"",
        component:HomeFrontComponent
      }
    ]
  },
  { path:"admin", component:DashbordComponent},
  { path: "product", component: ProductComponent},
  { path: "product-add", component: AddProductComponent},
  { path: "product-update/:id", component: UpdateProductComponent},
  { path: "get-product-front", component: GetProductFrontComponent},
  { path: "cart-product", component: CartProductComponent},
  { path: "promotion", component: PromotionComponent},
  { path: "add-promotion", component: AddPromotionComponent},
  { path: "update-promotion/:id", component: UpdatePromotionComponent},
  {path: "pay-carte", component:PayCarteComponent},
  {path: "delivery-page", component:DeliveryPageComponent},
  {path: "order-back", component:OrderBackComponent},
  {path: "delivery-back", component:DeliveryBackComponent},
  {path: "dashboard-product", component:DashboardProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
