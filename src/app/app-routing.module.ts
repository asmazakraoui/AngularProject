import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './FrontOffice/front/front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { BackComponent } from './BackOffice/back/back.component';
import { AllDiagnosticComponent } from './components/all-diagnostic/all-diagnostic.component';
import { PostDiagnosticComponent } from './components/post-diagnostic/post-diagnostic.component';
import { UpdateDiagnosticComponent } from './components/update-diagnostic/update-diagnostic.component';
import { AllHealthcareComponent } from './components/all-healthcare/all-healthcare.component';
import { PostHealthcareComponent } from './components/post-healthcare/post-healthcare.component';
import { UpdateHealthcareComponent } from './components/update-healthcare/update-healthcare.component';
import { PostRegimealimentaireComponent } from './components/post-regimealimentaire/post-regimealimentaire.component';
import { AllRegimealimentaireComponent } from './components/all-regimealimentaire/all-regimealimentaire.component';
import { UpdateRegimealimentaireComponent } from './components/update-regimealimentaire/update-regimealimentaire.component';

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
  ,{
    path:"diagnostic",component:AllDiagnosticComponent

  },
  {
    path:"postdiagnostic",component:PostDiagnosticComponent
  },
  {
    path:"updatediagnostic/:id",component:UpdateDiagnosticComponent
  }
  ,
  { path: "postregimealimentaire", component: PostRegimealimentaireComponent }
  ,
  { path: "regime-alimentaire", component: AllRegimealimentaireComponent }
  ,
  { path: "regimealimentaire/:id", component: UpdateRegimealimentaireComponent }
  ,

  {
    path:"healthcare",component:AllHealthcareComponent
  },
  {
    path:"posthealthcare",component:PostHealthcareComponent
  },
  {
    path:"healthcare/:id",component:UpdateHealthcareComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
