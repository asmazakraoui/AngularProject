import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCaptchaModule } from 'ngx-captcha';
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
import { EventfrontAffComponent } from './EventManagment/eventfront-aff/eventfront-aff.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FavorisfrontAffComponent } from './FavorisManagment/favorisfront-aff/favorisfront-aff.component';
import { FavorisfrontUppComponent } from './FavorisManagment/favorisfront-upp/favorisfront-upp.component';
import { FavorisfrontAddComponent } from './FavorisManagment/favorisfront-add/favorisfront-add.component';
import { PodcastfrontAffComponent } from './PodcastManagment/podcastfront-aff/podcastfront-aff.component';
import { EventDetailsComponent } from './EventManagment/event-details/event-details.component';
import { BookDetailsComponent } from './BookManagment/book-details/book-details.component';
import { AffectbookTofavppComponent } from './BookManagment/affectbook-tofavpp/affectbook-tofavpp.component';
import { PodcastDetaisComponent } from './PodcastManagment/podcast-detais/podcast-detais.component';
import { QRCodeModule } from 'angular2-qrcode';
import {NgxPaginationModule} from 'ngx-pagination'
import { BookfrontAffComponent } from './BookManagment/bookfront-aff/bookfront-aff.component';
import { AddtofavComponent } from './PodcastManagment/addtofav/addtofav.component';
import { FavoriPodComponent } from './FavorisManagment/favori-pod/favori-pod.component';
import { MylibraryComponent } from './LibraryManagment/mylibrary/mylibrary.component';
import { BookoflibraryComponent } from './LibraryManagment/bookoflibrary/bookoflibrary.component';
import { AddlibFrontComponent } from './LibraryManagment/addlib-front/addlib-front.component';
import { UplibrayFrontComponent } from './LibraryManagment/uplibray-front/uplibray-front.component';
import { EventStatComponent } from './EventManagment/event-stat/event-stat.component';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EventParteciperComponent } from './EventManagment/event-parteciper/event-parteciper.component';
import { ChartsModule } from 'ng2-charts';




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
    EventfrontAffComponent,
    FavorisfrontAffComponent,
    FavorisfrontUppComponent,
    FavorisfrontAddComponent,
    BookfrontAffComponent,
    PodcastfrontAffComponent,
      EventDetailsComponent,
      BookDetailsComponent,
     
      AffectbookTofavppComponent,
      PodcastDetaisComponent,
      AddtofavComponent,
      FavoriPodComponent,
      MylibraryComponent,
      BookoflibraryComponent,
      AddlibFrontComponent,
      UplibrayFrontComponent,
      EventStatComponent,
      EventParteciperComponent,
      
      

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatRippleModule,
    MatFormFieldModule,
    CommonModule,
    NgxCaptchaModule,
    QRCodeModule,
    NgxPaginationModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    ChartsModule
    

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
