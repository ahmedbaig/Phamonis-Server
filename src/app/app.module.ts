import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { DataService} from './services/data.service';

import { AppComponent } from './app.component';

import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { AccountActivitionComponent } from './components/account-activition/account-activition.component'; 
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { UserConnectionsComponent } from './components/pose-monitor/user-connections/user-connections.component';
import { DeviceConfigurationComponent } from './components/pose-monitor/device-configuration/device-configuration.component';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';
import { SearchBoardComponent } from './components/discussion-board/search-board/search-board.component';
import { MyBoardsComponent } from './components/discussion-board/my-boards/my-boards.component';
import { MessagesComponent } from './components/messages/messages.component';
import { UpcomingAppointmentsComponent } from './components/schedule-manager/upcoming-appointments/upcoming-appointments.component';
import { PastAppointmentsComponent } from './components/schedule-manager/past-appointments/past-appointments.component';
import { PatientMonitorComponent } from './components/patient-monitor/patient-monitor.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PlaceAppointmentComponent } from './components/schedule-manager/place-appointment/place-appointment.component';
import { UploadDiagnosisComponent } from './components/upload-diagnosis/upload-diagnosis.component';
import { EditDiagnosisComponent } from './components/edit-diagnosis/edit-diagnosis.component'; 
import { ViewDataComponent } from './components/pose-monitor/view-data/view-data.component';
import { AnalyticsComponent } from './components/pose-monitor/analytics/analytics.component';
import { StatusReportComponent } from './components/pose-monitor/status-report/status-report.component';
import { NewBoardComponent } from './components/discussion-board/new-board/new-board.component';
import { DetailAppointmentComponent } from './components/schedule-manager/detail-appointment/detail-appointment.component';
import { DetailBoardComponent } from './components/discussion-board/detail-board/detail-board.component';  
import { RequestsComponent } from './components/requests/requests.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CreateHardwareComponent } from './components/pi/create-hardware/create-hardware.component';
import { ListHardwareComponent } from './components/pi/list-hardware/list-hardware.component';
import { DetailHardwareComponent } from './components/pi/detail-hardware/detail-hardware.component';
import { EditHardwareComponent } from './components/pi/edit-hardware/edit-hardware.component';
import { SecureStorageService } from './auth/secure-storage.service'; 
import { NewHospitalComponent } from './components/users/new-hospital/new-hospital.component';
import { AllHospitalsComponent } from './components/users/all-hospitals/all-hospitals.component';
import { EditHospitalComponent } from './components/users/edit-hospital/edit-hospital.component';
import { JqxschedulerComponent } from './components/schedule-manager/jqxscheduler/jqxscheduler.component';
import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { ProfileDoctorComponent } from './components/profile-doctor/profile-doctor.component';
import { HorizontalBarComponent } from './components/charts/horizontal-bar/horizontal-bar.component';
import { LineBasicComponent } from './components/charts/line-basic/line-basic.component';
import { DonutComponent } from './components/charts/donut/donut.component';
import { LineBasicPoseComponent } from './components/charts/line-basic-pose/line-basic-pose.component'; 

const appRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: '', component: LoginComponent}, 
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password/:token', component: ResetPasswordComponent},
      {path: 'activate-account/:token', component: AccountActivitionComponent}
    ]
  }, {
    path: '',
    component: DashboardComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'pose', children: [
        {path: 'view-data', component: ViewDataComponent},
        {path: 'analytics', component: AnalyticsComponent},
        {path: 'status-report', component: StatusReportComponent},
        {path: 'connections', component: UserConnectionsComponent},
        {path: 'configuration', component: DeviceConfigurationComponent}
      ]},
      {path: 'diagnosis', component: DiagnosisComponent},
      {path: 'upload-diagnose', component: UploadDiagnosisComponent},
      {path: 'edit-diagnose/:id', component: EditDiagnosisComponent},
      {path: 'boards', children: [
        {path: 'search', component: SearchBoardComponent},
        {path: 'board/:id', component: DetailBoardComponent},
        {path: 'my-boards', component: MyBoardsComponent},
        {path: 'create', component: NewBoardComponent}
      ]},
      {path: 'messages', component: MessagesComponent},
      {path: 'notifications', component: NotificationsComponent},
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'profile-doctor/:id', component: ProfileDoctorComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'schedule', children: [
        {path: 'upcoming', component: UpcomingAppointmentsComponent},
        {path: 'past', component: PastAppointmentsComponent},
        {path: 'new', component: PlaceAppointmentComponent},
        {path: 'detail/:id', component: DetailAppointmentComponent}
      ]},
      {path: 'patient-monitor', component: PatientMonitorComponent},
      {path: 'users', children: [
        {path: '', component: AllUsersComponent},
        {path: 'new-user', component: NewUserComponent},
      ]},
      {path: 'hospitals', children: [
        {path: '', component: AllHospitalsComponent},
        {path: 'new-hospital', component: NewHospitalComponent},
        {path: 'edit-hospital/:hospital', component: EditHospitalComponent}
      ]},
      {path: 'requests', component: RequestsComponent},
      {path: 'pi', children: [
        {path: '', component: ListHardwareComponent}, 
        {path: 'create', component: CreateHardwareComponent},
        {path: 'detail/:id', component: DetailHardwareComponent},
        {path: 'edit/:id', component: EditHardwareComponent}
      ]},
    ]
  }
];

const config = {useHash:true};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    AccountActivitionComponent, 
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    NavigationComponent,
    HomeComponent,
    ViewDataComponent,
    AnalyticsComponent,
    UserConnectionsComponent,
    DeviceConfigurationComponent,
    DiagnosisComponent,
    SearchBoardComponent,
    MyBoardsComponent,
    MessagesComponent,
    UpcomingAppointmentsComponent,
    PastAppointmentsComponent,
    PatientMonitorComponent,
    NewUserComponent,
    ProfileComponent,
    NotificationsComponent,
    PlaceAppointmentComponent,
    UploadDiagnosisComponent,
    EditDiagnosisComponent,
    StatusReportComponent,
    NewBoardComponent,
    DetailAppointmentComponent,
    DetailBoardComponent,
    RequestsComponent,
    SettingsComponent,
    CreateHardwareComponent,
    ListHardwareComponent,
    DetailHardwareComponent,
    EditHardwareComponent, 
    NewHospitalComponent,
    AllHospitalsComponent,
    EditHospitalComponent,
    JqxschedulerComponent,
    AllUsersComponent,
    ProfileDoctorComponent,
    HorizontalBarComponent,
    LineBasicComponent,
    DonutComponent,
    LineBasicPoseComponent 
  ],
  imports: [
    NgbModule,
    LoadingBarHttpClientModule,
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, config)
  ],
  providers: [
    DataService, SecureStorageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
