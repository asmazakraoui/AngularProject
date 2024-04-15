import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './FrontOffice/front/front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { AuthComponentComponent } from './User/auth-component/auth-component.component';
import { LoginComponent } from './User/login/login.component';
import { RoleComponent } from './role/role.component';
import { ProfileComponent } from './User/profile/profile.component';
import { DashbordComponent } from './BackOffice/dashbord/dashbord.component';
import { GetUserComponent } from './User/get-user/get-user.component';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ProfileSeeComponent } from './profile-see/profile-see.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';

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
  { path: 'Register', component: AuthComponentComponent },
  { path:"login",component:LoginComponent },
  { path:"admin",component:DashbordComponent },
  { path:"role", component:RoleComponent },
  { path:"update/:id", component:ProfileComponent },
  { path:"showProfile", component:ProfileSeeComponent },
  { path:"getUser", component:GetUserComponent },
  { path: "updateUser/:id", component: UpdateUserComponent },
  {path: "forget",component:ForgetPassComponent},
  {path: "reset",component:ResetPasswordComponent},
  {path:"profileAdmin", component:ProfileAdminComponent}
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
