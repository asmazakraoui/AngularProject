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
import { FuneralLocationListComponent } from './components/funeral-location-list/funeral-location-list.component';
import { AddFuneralLocationComponent } from './components/add-funeral-location/add-funeral-location.component';
import { UpdateFuneralLocationComponent } from './components/update-funeral-location/update-funeral-location.component';
import { AddBurrialLocationComponent } from './components/add-burrial-location/add-burrial-location.component';
import { BurrialLocationListComponent } from './components/burrial-location-list/burrial-location-list.component';
import { UpdateBurrialLocationComponent } from './components/update-burrial-location/update-burrial-location.component';
import { AddFlowerComponent } from './components/add-flower/add-flower.component';
import { FlowerListComponent } from './components/flower-list/flower-list.component';
import { UpdateFlowerComponent } from './components/update-flower/update-flower.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { MealsListComponent } from './components/meals-list/meals-list.component';
import { UpdateMealComponent } from './components/update-meal/update-meal.component';
import { AddCeremonyComponent } from './components/add-ceremony/add-ceremony.component';
import { CeremonyListComponent } from './components/ceremony-list/ceremony-list.component';
import { UpdateCeremonyComponent } from './components/update-ceremony/update-ceremony.component';
import { MealSelectorComponent } from './components/meal-selector/meal-selector.component';
import { FlowerSelectorComponent } from './components/flower-selector/flower-selector.component';
import { BurrialSelectorComponent } from './components/burrial-selector/burrial-selector.component';
import { FuneralLocation } from './model/FuneralLocation';
import { FuneralSelectorComponent } from './components/funeral-selector/funeral-selector.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { SuccessComponent } from './components/success/success.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { RatingComponent } from './components/rating/rating.component';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';

import { AddFArrangementComponent } from './components/add-farrangement/add-farrangement.component';
import { FarrangementListComponent } from './components/farrangement-list/farrangement-list.component';
import { UpdateFarrangementComponent } from './components/update-farrangement/update-farrangement.component';
import { FlowerStatisticsComponent } from './components/flower-statistics/flower-statistics.component';
import { CalendarComponent } from './components/calendar/calendar.component';

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
import { JobAppComponent } from './job-app/job-app.component';
import { TypeRole } from 'src/models/role';
import { FacebookCallbackComponent } from './facebook-callback/facebook-callback.component';
//import { UpdateCommentComponent } from './update-comment/update-comment.component';
//import { UpdateCommentComponent } from './update-comment/update-comment.component';





import { AllDiagnosticComponent } from './components/all-diagnostic/all-diagnostic.component';
import { PostDiagnosticComponent } from './components/post-diagnostic/post-diagnostic.component';
import { UpdateDiagnosticComponent } from './components/update-diagnostic/update-diagnostic.component';
import { AllHealthcareComponent } from './components/all-healthcare/all-healthcare.component';
import { PostHealthcareComponent } from './components/post-healthcare/post-healthcare.component';
import { UpdateHealthcareComponent } from './components/update-healthcare/update-healthcare.component';
import { PostRegimealimentaireComponent } from './components/post-regimealimentaire/post-regimealimentaire.component';
import { AllRegimealimentaireComponent } from './components/all-regimealimentaire/all-regimealimentaire.component';
import { UpdateRegimealimentaireComponent } from './components/update-regimealimentaire/update-regimealimentaire.component';
import { AllPatientsComponent } from './components/all-patients/all-patients.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { AllDoctorsComponent } from './components/all-doctors/all-doctors.component';
import {CalendarPatientComponent} from './components/calendar-patient/calendar.component';
import { CalendarsComponent } from './components/calendar-admin/calendars.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { ReservedDateComponent } from './components/reserved-date/reserved-date.component';
import { DashChartComponent } from './components/dash-chart/dash-chart.component';


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
  { path: "admin", component: DashbordComponent, data: { requiredRole: TypeRole.ADMIN }, canActivate: [AuthGuard] },
  { path: 'oauth2/authorization/facebook', component: LoginComponent },
  { path: 'facebook-callback', component: FacebookCallbackComponent },

  { path:"role", component:RoleComponent },
  { path:"update/:id", component:ProfileComponent, canActivate: [AuthGuard] },
  { path:"showProfile", component:ProfileSeeComponent, canActivate: [AuthGuard] },
  { path:"getUser", component:GetUserComponent , canActivate: [AuthGuard]},
  { path: "updateUser/:id", component: UpdateUserComponent, canActivate: [AuthGuard] },
  {path: "forget",component:ForgetPassComponent},
  {path: "reset",component:ResetPasswordComponent},
  {path:"profileAdmin", component:ProfileAdminComponent, canActivate: [AuthGuard]},
  {path:"apply",component:JobAppComponent},
  {path:"chat",component:ChatComponent},
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
 { path: 'chat/:id', component: ChatComponent },
//hadil
  { path:"admin",component:BackComponent,
    
    children:[
              { path: 'add-funeral-location', component: AddFuneralLocationComponent },
              { path: 'funeral-location-list', component: FuneralLocationListComponent },
              {path: 'update-funeral-location/:id', component: UpdateFuneralLocationComponent},
              { path: 'add-cemetery', component: AddBurrialLocationComponent },
              { path: 'cemetery-list', component: BurrialLocationListComponent },
              { path: 'update-cemetery/:id', component: UpdateBurrialLocationComponent },
              { path: 'add-flower', component: AddFlowerComponent },
              { path: 'flower-list', component: FlowerListComponent },
              { path: 'update-flower/:id', component: UpdateFlowerComponent },
              { path: 'add-meal', component: AddMealComponent  },
              { path: 'Meals-list', component: MealsListComponent },
              { path: 'update-meal/:id', component: UpdateMealComponent }, 
     
    ]
  
  },

  { path: 'add-funeral-location', component: AddFuneralLocationComponent },

{ path: 'funeral-location-list', component: FuneralLocationListComponent },
{path: 'update-funeral-location/:id', component: UpdateFuneralLocationComponent},
{ path: 'add-cemetery', component: AddBurrialLocationComponent },
{ path: 'cemetery-list', component: BurrialLocationListComponent },
{ path: 'update-cemetery/:id', component: UpdateBurrialLocationComponent },
{ path: 'add-flower', component: AddFlowerComponent },
{ path: 'flower-list', component: FlowerListComponent },
{ path: 'update-flower/:id', component: UpdateFlowerComponent },
{ path: 'add-meal', component: AddMealComponent  },
{ path: 'Meals-list', component: MealsListComponent },
{ path: 'update-meal/:id', component: UpdateMealComponent },
{ path: 'add-ceremony', component: AddCeremonyComponent  },
{ path: 'ceremony-list', component: CeremonyListComponent },
{ path: 'update-ceremony/:id', component: UpdateCeremonyComponent },
{ path: 'meals', component: MealSelectorComponent },
{ path: 'flowers', component: FlowerSelectorComponent },
{ path: 'cemeteries', component: BurrialSelectorComponent },
{ path: 'funeral-locations', component: FuneralSelectorComponent },
{ path: 'pay', component: PaiementComponent },
{ path: 'success', component: SuccessComponent },
{ path: 'invit/:id', component: InvitationComponent },
{ path: 'rating', component: RatingComponent },
{ path: 'recaptcha', component: RecaptchaComponent },
{ path: 'AddFarrangemenet', component: AddFArrangementComponent },
{ path: 'FarrList', component: FarrangementListComponent },
{ path: 'UpdateFArr/:id', component: UpdateFarrangementComponent },
{ path: 'flowerstat', component: FlowerStatisticsComponent },
{ path: 'calendar', component: CalendarComponent },




{
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
},







{
  path:"all-patients",component:AllPatientsComponent
},
{
  path:"patient/:id",component:PatientDetailsComponent
},
{
  path:"all-doctors",component:AllDoctorsComponent
},

{
  path:"calendar-patient",component:CalendarPatientComponent
},
{
  path:"calendar-admin",component:CalendarsComponent
},
{
  path:"patient-dashboard",component:PatientDashboardComponent
},
{
  path:"reserved-date",component:ReservedDateComponent
},
{
  path:"charts-dash",component:DashChartComponent
},




];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})


export class AppRoutingModule { }
