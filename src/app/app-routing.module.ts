import { UpdateCommentComponent } from './update-comment/update-comment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './FrontOffice/front/front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
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
  {
    path:"admin",
    component:BackComponent,
  },
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
