import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgxCaptchaModule } from 'ngx-captcha';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { FrontComponent } from './FrontOffice/front/front.component';
import { ProductComponent } from './Component/get-product/product.component';
import { AddProductComponent } from './Component/add-product/add-product.component';
import { OrderrComponent } from './Component/get-orderr/orderr.component';
import { UpdateProductComponent } from './Component/update-product/update-product.component';
import { GetProductFrontComponent } from './Component/get-product-front/get-product-front.component';
import { CardProductFrontComponent } from './Component/card-product-front/card-product-front.component';
import { CardBackComponent } from './Component/card-back/card-back.component';
import { CartProductComponent } from './Component/cart-product/cart-product.component';
import { CardCartComponent } from './Component/card-cart/card-cart.component'; 
import { PromotionComponent } from './Component/promotion/promotion.component';
import { AddPromotionComponent } from './Component/add-promotion/add-promotion.component';
import { UpdatePromotionComponent } from './Component/update-promotion/update-promotion.component';
import { NavBackComponent } from './BackOffice/nav-back/nav-back.component';
import { SidebarComponent } from './BackOffice/sidebar/sidebar.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { BackComponent } from './BackOffice/back/back.component';
import { CommonModule } from '@angular/common';
import { AuthComponentComponent } from './User/auth-component/auth-component.component';
import { LoginComponent } from './User/login/login.component';
import { RoleComponent } from './role/role.component';
import { ProfileComponent } from './User/profile/profile.component';
import { SettingBackComponent } from './BackOffice/setting-back/setting-back.component';
import { DashbordComponent } from './BackOffice/dashbord/dashbord.component';
import { GetUserComponent } from './User/get-user/get-user.component';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ProfileSeeComponent } from './profile-see/profile-see.component';
//import { authInterceptorProviders } from './Services/auth.inteceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { authInterceptorProviders } from './Services/auth.inteceptor';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';
//import { DeletePostComponent } from './delete-post/delete-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { UpdateCommentComponent } from './update-comment/update-comment.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ReactComponent } from './react/react.component';
import { GroupeComponent } from './groupe/groupe.component';
import { ChatComponent } from './chat/chat.component';

// Import PrimeNG modules
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
 import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
 import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
 import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { MessageService } from 'primeng/api';
import { HeroSectionComponent } from './FrontOffice/hero-section/hero-section.component';
import { DashFrontComponent } from './FrontOffice/dash-front/dash-front.component';
import { DashAfterlogComponent } from './FrontOffice/dash-afterlog/dash-afterlog.component';
import { HeaderSecComponent } from './FrontOffice/header-sec/header-sec.component';
import { JobAppComponent } from './job-app/job-app.component';
import { FacebookCallbackComponent } from './facebook-callback/facebook-callback.component';
import {  SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  
} from 'angularx-social-login';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AddFuneralLocationComponent } from './components/add-funeral-location/add-funeral-location.component';
import { FuneralLocationListComponent } from './components/funeral-location-list/funeral-location-list.component';
import { UpdateFuneralLocationComponent } from './components/update-funeral-location/update-funeral-location.component';
import { AddBurrialLocationComponent } from './components/add-burrial-location/add-burrial-location.component';
import { BurrialLocationListComponent } from './components/burrial-location-list/burrial-location-list.component';
import { UpdateBurrialLocationComponent } from './components/update-burrial-location/update-burrial-location.component';
import { AddFlowerComponent } from './components/add-flower/add-flower.component';
import { UpdateFlowerComponent } from './components/update-flower/update-flower.component';
import { FlowerListComponent } from './components/flower-list/flower-list.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { MealsListComponent } from './components/meals-list/meals-list.component';
import { UpdateMealComponent } from './components/update-meal/update-meal.component';
import { AddCeremonyComponent } from './components/add-ceremony/add-ceremony.component';
import { CeremonyListComponent } from './components/ceremony-list/ceremony-list.component';
import { UpdateCeremonyComponent } from './components/update-ceremony/update-ceremony.component';
import { MealSelectorComponent } from './components/meal-selector/meal-selector.component';
import { FlowerSelectorComponent } from './components/flower-selector/flower-selector.component';
import { BurrialSelectorComponent } from './components/burrial-selector/burrial-selector.component';
import { FuneralSelectorComponent } from './components/funeral-selector/funeral-selector.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { SuccessComponent } from './components/success/success.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingComponent } from './components/rating/rating.component';
import { CalendarModule as AngularCalendarModule , DateAdapter} from 'angular-calendar';




import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';
import { AddFArrangementComponent } from './components/add-farrangement/add-farrangement.component';
import { FarrangementListComponent } from './components/farrangement-list/farrangement-list.component';
import { UpdateFarrangementComponent } from './components/update-farrangement/update-farrangement.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationComponent } from './components/notification/notification.component';
import { FlowerStatisticsComponent } from './components/flower-statistics/flower-statistics.component';
import { CalendarComponent } from './components/calendar/calendar.component';
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
import { AddMedicamentModalComponent } from './components/add-medicament-modal/add-medicament-modal.component';
import { AllDoctorsComponent } from './components/all-doctors/all-doctors.component';
import {CalendarPatientComponent} from './components/calendar-patient/calendar.component'
import { CalendarsComponent } from './components/calendar-admin/calendars.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { ReservedDateComponent } from './components/reserved-date/reserved-date.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DashChartComponent } from './components/dash-chart/dash-chart.component';






import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PayCarteComponent } from './Component/pay-carte/pay-carte.component';
import { FacturePayComponent } from './Component/facture-pay/facture-pay.component';
import { DeliveryPageComponent } from './Component/delivery-page/delivery-page.component';
import { OrderBackComponent } from './Component/order-back/order-back.component';
import { DeliveryBackComponent } from './Component/delivery-back/delivery-back.component';
import { DashboardProductComponent } from './Component/dashboard-product/dashboard-product.component';
import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    //ranim
    AppComponent,
    HomeFrontComponent,
    FooterFrontComponent,
    FrontComponent,
    HeaderFrontComponent,
    NavBackComponent,
    SidebarComponent,
    FooterBackComponent,
    BackComponent,
    AuthComponentComponent,
    LoginComponent,
    RoleComponent,
    ProfileComponent,
    SettingBackComponent,
    DashbordComponent,
    GetUserComponent,
    UpdateUserComponent,
    ResetPasswordComponent,
    ForgetPassComponent,
    ProfileSeeComponent,
    ProfileAdminComponent,
    DashFrontComponent,
    DashAfterlogComponent,
    HeaderSecComponent   ,
    HeaderSecComponent,
  
    AllDiagnosticComponent,
    PostDiagnosticComponent,
    UpdateDiagnosticComponent,
    AllHealthcareComponent,
    PostHealthcareComponent,
    UpdateHealthcareComponent,
    AllRegimealimentaireComponent,
    PostRegimealimentaireComponent,
    UpdateRegimealimentaireComponent,

    
    
//asmaa
    PostComponent,
    AddPostComponent,
    UpdatePostComponent,
    CommentComponent,
    AddCommentComponent,
    UpdateCommentComponent,
    PostDetailsComponent,
    ReactComponent,

    GroupeComponent,
    ChatComponent,
    HeroSectionComponent,
    JobAppComponent,
    FacebookCallbackComponent,
   
    


    AddFuneralLocationComponent,
   
  FuneralLocationListComponent,
      UpdateFuneralLocationComponent,
      AddBurrialLocationComponent,
      BurrialLocationListComponent,
      UpdateBurrialLocationComponent,
      AddFlowerComponent,
      UpdateFlowerComponent,
      FlowerListComponent,
      AddMealComponent,
      MealsListComponent,
      UpdateMealComponent,
      AddCeremonyComponent,
      CeremonyListComponent,
      UpdateCeremonyComponent,
      MealSelectorComponent,
      FlowerSelectorComponent,
      BurrialSelectorComponent,
      FuneralSelectorComponent,
      PaiementComponent,
      SuccessComponent,
      InvitationComponent,
      RatingComponent,
      RecaptchaComponent,
      AddFArrangementComponent,
      FarrangementListComponent,
      UpdateFarrangementComponent,
      NotificationComponent,
      FlowerStatisticsComponent,
      CalendarComponent,
      AllPatientsComponent,
      PatientDetailsComponent,
      AddMedicamentModalComponent,
      AllDoctorsComponent,
      CalendarPatientComponent,
      CalendarsComponent,
      PatientDashboardComponent,
      ReservedDateComponent,
      DashChartComponent,
      
  

      
      
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
      
    DashbordComponent,
    ProductComponent,
    AddProductComponent,
    OrderrComponent,
    UpdateProductComponent,
    GetProductFrontComponent,
    CardProductFrontComponent,
    CardBackComponent,
    CartProductComponent,
    CardCartComponent,
    PromotionComponent,
    AddPromotionComponent,
    UpdatePromotionComponent,
    PayCarteComponent,
    FacturePayComponent,
    DeliveryPageComponent,
    OrderBackComponent,
    DeliveryBackComponent,
    DashboardProductComponent
      

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule, 
    MatDialogModule,
    MatSnackBarModule,
    
    CommonModule,
    FormsModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    ConfirmDialogModule,
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule


     
  ],
  providers: [authInterceptorProviders,
    {provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '886163472276-949toosda6jvna4qtn9snb51reckdd4i.apps.googleusercontent.com'
          ),
        }
      ],
    } as SocialAuthServiceConfig,
  },
    
    AvatarModule,
    AvatarGroupModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    BadgeModule,
    BreadcrumbModule,
    BlockUIModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CascadeSelectModule,
     CheckboxModule,
    ChipsModule,
    ChipModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    VirtualScrollerModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DockModule,
    DropdownModule,
    DynamicDialogModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ImageModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
     OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    SelectButtonModule,
    SidebarModule,
    ScrollerModule,
    ScrollPanelModule,
    ScrollTopModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SpeedDialModule,
    SpinnerModule,
    SplitterModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TriStateCheckboxModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    AnimateModule,
    CardModule,
    RippleModule,
    StyleClassModule,

    
    TabViewModule,
    FormsModule,
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
    MatSnackBarModule ,
   
    QRCodeModule,
    NgxPaginationModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    ChartsModule
    

    
    
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    NgbModule,
    ChartsModule

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
