import { ChatComponent } from './chat/chat.component';
import { UpdateCommentComponent } from './update-comment/update-comment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

import { BackComponent } from './BackOffice/back/back.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostComponent } from './post/post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { CommentComponent } from './comment/comment.component';
//import { findAllPostComponent } from './add-post/add-post.component';
import { FormsModule } from '@angular/forms';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ReactComponent } from './react/react.component';
import { GroupeComponent } from './groupe/groupe.component';
import { FrontComponent } from './FrontOffice/front/front.component';
import { DashFrontComponent } from './FrontOffice/dash-front/dash-front.component';
import { AuthGuard } from './User/AuthGuard';
//import { UpdateCommentComponent } from './update-comment/update-comment.component';
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
  { path:"admin",component:DashbordComponent , canActivate: [AuthGuard]},
  
  { path:"role", component:RoleComponent },
  { path:"update/:id", component:ProfileComponent, canActivate: [AuthGuard] },
  { path:"showProfile", component:ProfileSeeComponent, canActivate: [AuthGuard] },
  { path:"getUser", component:GetUserComponent , canActivate: [AuthGuard]},
  { path: "updateUser/:id", component: UpdateUserComponent, canActivate: [AuthGuard] },
  {path: "forget",component:ForgetPassComponent},
  {path: "reset",component:ResetPasswordComponent},
  {path:"profileAdmin", component:ProfileAdminComponent, canActivate: [AuthGuard]},
  
  {path:"dashFront",component:DashFrontComponent, canActivate: [AuthGuard]},

  //asma
  {
    path:"index",
    component:PostComponent
  },
  {
  path:"addPost",
    component:AddPostComponent,
  },
  
 { path:"post", 
  component:PostComponent  } ,
  {path:"get", 
  component:PostComponent},
  {path:"deletePost", 
  component:PostComponent},
  {path:"updatePost/:id", 
   component:UpdatePostComponent},
  {path:"getComments", 
  component:CommentComponent},
  { path: 'updateComment/:id', component: UpdateCommentComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'addComment/:idPost', component: AddCommentComponent },
  {path:"add/:idPost", 
  component:PostComponent},
  { path: 'postDetails', component: PostDetailsComponent }, // Exemple de route pour les détails de publication avec un paramètre d'ID
  
 { path: 'addComment', component: CommentComponent}, // Exemple de route pour les détails de publication avec un paramètre d'ID
 { path: 'getCommentBypostid/:idPost', component: CommentComponent}, // Exemple de route pour les détails de publication avec un paramètre d'ID
 { path: 'add/:idPost', component: ReactComponent}, // Exemple de route pour les détails de publication avec un paramètre d'ID
 { path: 'groupe', component: GroupeComponent },
 { path: 'chat/:userId', component: ChatComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
