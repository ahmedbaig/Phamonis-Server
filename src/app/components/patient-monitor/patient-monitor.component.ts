import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import { filter,delay,sortBy,reverse } from 'lodash'
import { ConnectionsService } from 'src/app/services/connections.service';

@Component({
  selector: 'app-patient-monitor',
  templateUrl: './patient-monitor.component.html',
  styleUrls: ['./patient-monitor.component.css']
})
export class PatientMonitorComponent implements OnInit {
  users:any = []
  patients: any = []
  doctors: any = []
  nurses: any = []
  constructor(private _user:UserService, private _connection:ConnectionsService, private secureStorage:SecureStorageService, public _auth:AuthServiceService) { }

  ngOnInit() {
    delay(()=>{
      this._connection.staffConnection(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        console.log(res.requests)
        this.patients = filter(res.requests, {declined:false, status: true})
        console.log(this.patients)
      })
    },1000)
  }

}
