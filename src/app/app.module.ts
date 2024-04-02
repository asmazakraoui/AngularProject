import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
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
import { AllMedicamentComponent } from './components/all-medicament/all-medicament.component';
import { PostMedicamentComponent } from './components/post-medicament/post-medicament.component';
import { UpdateMedicamentComponent } from './components/update-medicament/update-medicament.component';
import { AllDiagnosticComponent } from './components/all-diagnostic/all-diagnostic.component';
import { PostDiagnosticComponent } from './components/post-diagnostic/post-diagnostic.component';
import { UpdateDiagnosticComponent } from './components/update-diagnostic/update-diagnostic.component';
import { AllHealthcareComponent } from './components/all-healthcare/all-healthcare.component';
import { PostHealthcareComponent } from './components/post-healthcare/post-healthcare.component';
import { UpdateHealthcareComponent } from './components/update-healthcare/update-healthcare.component';
import { AllRegimealimentaireComponent } from './components/all-regimealimentaire/all-regimealimentaire.component';
import { PostRegimealimentaireComponent } from './components/post-regimealimentaire/post-regimealimentaire.component';
import { UpdateRegimealimentaireComponent } from './components/update-regimealimentaire/update-regimealimentaire.component';
import { AllReportComponent } from './components/all-report/all-report.component';
import { PostReportComponent } from './components/post-report/post-report.component';
import { UpdateReportComponent } from './components/update-report/update-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    AllMedicamentComponent,
    PostMedicamentComponent,
    UpdateMedicamentComponent,
    AllDiagnosticComponent,
    PostDiagnosticComponent,
    UpdateDiagnosticComponent,
    AllHealthcareComponent,
    PostHealthcareComponent,
    UpdateHealthcareComponent,
    AllRegimealimentaireComponent,
    PostRegimealimentaireComponent,
    UpdateRegimealimentaireComponent,
    AllReportComponent,
    PostReportComponent,
    UpdateReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
