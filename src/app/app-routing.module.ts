import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './FrontOffice/front/front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { BackComponent } from './BackOffice/back/back.component';

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
  {
    path:"admin",
    component:BackComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
