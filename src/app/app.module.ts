import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { AddLibraryComponent } from './LibraryManagment/library-add/add-library.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventAddComponent } from './EventManagment/event-add/event-add.component';
import { EventAffComponent } from './EventManagment/event-aff/event-aff.component';
import { EventUpdateComponent } from './EventManagment/event-update/event-update.component';
import { UpLibraryComponent } from './LibraryManagment/up-library/up-library.component';
import { LibraryAffComponent } from './LibraryManagment/library-aff/library-aff.component';
import { FavorisAddComponent } from './FavorisManagment/favoris-add/favoris-add.component';
import { FavorisUppComponent } from './FavorisManagment/favoris-upp/favoris-upp.component';
import { FavorisAffComponent } from './FavorisManagment/favoris-aff/favoris-aff.component';
import { BookAffComponent } from './BookManagment/book-aff/book-aff.component';
import { BookUppComponent } from './BookManagment/book-upp/book-upp.component';
import { BookAddComponent } from './BookManagment/book-add/book-add.component';
import { PodcastAddComponent } from './PodcastManagment/podcast-add/podcast-add.component';
import { PodcastAffComponent } from './PodcastManagment/podcast-aff/podcast-aff.component';
import { PodcastUppComponent } from './PodcastManagment/podcast-upp/podcast-upp.component';



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
    AddLibraryComponent,
    EventAddComponent,
    EventAffComponent,
    EventUpdateComponent,
    UpLibraryComponent,
    LibraryAffComponent,
    FavorisAddComponent,
    FavorisUppComponent,
    FavorisAffComponent,
    BookAffComponent,
    BookUppComponent,
    BookAddComponent,
    PodcastAddComponent,
    PodcastAffComponent,
    PodcastUppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
