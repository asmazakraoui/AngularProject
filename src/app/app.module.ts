import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { FrontComponent } from './FrontOffice/front/front.component';
import { NavBackComponent } from './BackOffice/nav-back/nav-back.component';
import { SidebarComponent } from './BackOffice/sidebar/sidebar.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { BackComponent } from './BackOffice/back/back.component';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';
//import { DeletePostComponent } from './delete-post/delete-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { UpdateCommentComponent } from './update-comment/update-comment.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ReactComponent } from './react/react.component';
import { PostPaginatorComponent } from './post-paginator/post-paginator.component';

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
    PostComponent,
    AddPostComponent,
    UpdatePostComponent,
    CommentComponent,
    AddCommentComponent,
    UpdateCommentComponent,
    PostDetailsComponent,
    ReactComponent,
    PostPaginatorComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
