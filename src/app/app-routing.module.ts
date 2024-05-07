import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './FrontOffice/front/front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { BackComponent } from './BackOffice/back/back.component';
import { AddLibraryComponent } from './LibraryManagment/library-add/add-library.component';
import { EventAffComponent } from './EventManagment/event-aff/event-aff.component';

import { EventUpdateComponent } from './EventManagment/event-update/event-update.component';
import { UpLibraryComponent } from './LibraryManagment/up-library/up-library.component';
import { LibraryAffComponent } from './LibraryManagment/library-aff/library-aff.component';
import { FavorisAddComponent } from './FavorisManagment/favoris-add/favoris-add.component';
import { FavorisAffComponent } from './FavorisManagment/favoris-aff/favoris-aff.component';
import { FavorisUppComponent } from './FavorisManagment/favoris-upp/favoris-upp.component';
import { BookAffComponent } from './BookManagment/book-aff/book-aff.component';
import { BookAddComponent } from './BookManagment/book-add/book-add.component';
import { BookUppComponent } from './BookManagment/book-upp/book-upp.component';
import { PodcastAffComponent } from './PodcastManagment/podcast-aff/podcast-aff.component';
import { PodcastAddComponent } from './PodcastManagment/podcast-add/podcast-add.component';
import { PodcastUppComponent } from './PodcastManagment/podcast-upp/podcast-upp.component';
import { EventfrontAffComponent } from './EventManagment/eventfront-aff/eventfront-aff.component';
import { FavorisfrontAffComponent } from './FavorisManagment/favorisfront-aff/favorisfront-aff.component';
import { FavorisfrontUppComponent } from './FavorisManagment/favorisfront-upp/favorisfront-upp.component';
import { FavorisfrontAddComponent } from './FavorisManagment/favorisfront-add/favorisfront-add.component';
import { BookfrontAffComponent } from './BookManagment/bookfront-aff/bookfront-aff.component';
import { PodcastfrontAffComponent } from './PodcastManagment/podcastfront-aff/podcastfront-aff.component';
import { AffectbookTofavppComponent } from './BookManagment/affectbook-tofavpp/affectbook-tofavpp.component';
import { FavoriPodComponent } from './FavorisManagment/favori-pod/favori-pod.component';
import { MylibraryComponent } from './LibraryManagment/mylibrary/mylibrary.component';
import { BookoflibraryComponent } from './LibraryManagment/bookoflibrary/bookoflibrary.component';
import { AddlibFrontComponent } from './LibraryManagment/addlib-front/addlib-front.component';
import { EventStatComponent } from './EventManagment/event-stat/event-stat.component';
import { EventParteciperComponent } from './EventManagment/event-parteciper/event-parteciper.component';

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
  ///// back 
  {path: "LibraryAdd", component: AddLibraryComponent},
  {path: "LibraryUpp/:id", component: UpLibraryComponent},
  {path: "LibraryAff", component: LibraryAffComponent},
  {path: "mylib", component: MylibraryComponent},
  {path: "BookOfLib/:id", component: BookoflibraryComponent},
  {path: "eventOfUser", component: EventParteciperComponent},

 // {path: "addlibFront", component: AddlibFrontComponent},
  //////
  {path: "EventAff", component: EventAffComponent},
 // {path: "EventAdd", component: EventAddComponent},
  {path: "EventUpp/:id", component: EventUpdateComponent},
  {path: "EventStat", component: EventStatComponent},
  ///////
  {path: "FaAdd", component: FavorisAddComponent},
  {path: "FaAff", component: FavorisAffComponent},
  {path: "FaUpp/:id", component: FavorisUppComponent},
  {path: "favpod/:id", component: FavoriPodComponent},
  //////
  {path: "BookAff", component: BookAffComponent},
  {path: "BookAdd", component: BookAddComponent},
  {path: "BookUpp/:id", component: BookUppComponent},
  /////
  {path: "PodcastAff", component: PodcastAffComponent},
  {path: "PodcastAdd", component: PodcastAddComponent},
  {path: "PodcastUpp/:id", component: PodcastUppComponent},
  ////////// front
  {path: "EventFrontAFF", component: EventfrontAffComponent},
  {path: "FavorisFrontAFF", component: FavorisfrontAffComponent},
  {path: "FavorisFrontUpp/:id", component: FavorisfrontUppComponent},
  {path: "FavorisFrontAdd", component: FavorisfrontAddComponent},
  {path: "BookFrontAff", component: BookfrontAffComponent},
  {path: "PodcastFrontAff", component: PodcastfrontAffComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
