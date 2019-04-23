import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { DataService} from './services/data.service';

import { AppComponent } from './app.component';

import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { AccountActivitionComponent } from './components/account-activition/account-activition.component';
import { RegisterComponent } from './components/register/register.component';
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
import { NewUserComponent } from './components/new-user/new-user.component';
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
import { GuardService } from './auth/guard.service';
import { AuthServiceService } from './auth/auth-service.service';

const appRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password/:token', component: ResetPasswordComponent},
      {path: 'account-activation/:token', component: AccountActivitionComponent}
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
      {path: 'profile', component: ProfileComponent},
      {path: 'schedule', children: [
        {path: 'upcoming', component: UpcomingAppointmentsComponent},
        {path: 'past', component: PastAppointmentsComponent},
        {path: 'new', component: PlaceAppointmentComponent},
        {path: 'detail/:id', component: DetailAppointmentComponent}
      ]},
      {path: 'patient-monitor', component: PatientMonitorComponent},
      {path: 'new-user', component: NewUserComponent}
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
    RegisterComponent,
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
    DetailBoardComponent
  ],
  imports: [
    NgbModule,
    LoadingBarHttpClientModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, config)
  ],
  providers: [
    DataService, AuthServiceService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
