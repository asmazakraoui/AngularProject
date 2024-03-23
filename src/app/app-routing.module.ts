import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './FrontOffice/front/front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { BackComponent } from './BackOffice/back/back.component';
import { AddLibraryComponent } from './LibraryManagment/library-add/add-library.component';
import { EventAffComponent } from './EventManagment/event-aff/event-aff.component';
import { EventAddComponent } from './EventManagment/event-add/event-add.component';
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
  {path: "LibraryAdd", component: AddLibraryComponent},
  {path: "LibraryUpp/:id", component: UpLibraryComponent},
  {path: "LibraryAff", component: LibraryAffComponent},
  //////
  {path: "EventAff", component: EventAffComponent},
  {path: "EventAdd", component: EventAddComponent},
  {path: "EventUpp/:id", component: EventUpdateComponent},
  ///////
  {path: "FaAdd", component: FavorisAddComponent},
  {path: "FaAff", component: FavorisAffComponent},
  {path: "FaUpp/:id", component: FavorisUppComponent},
  //////
  {path: "BookAff", component: BookAffComponent},
  {path: "BookAdd", component: BookAddComponent},
  {path: "BookUpp/:id", component: BookUppComponent},
  /////
  {path: "PodcastAff", component: PodcastAffComponent},
  {path: "PodcastAdd", component: PodcastAddComponent},
  {path: "PodcastUpp/:id", component: PodcastUppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
