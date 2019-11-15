import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { StatsService } from 'src/app/services/stats.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import { ErService } from 'src/app/services/er.service';
import {map, delay} from 'lodash'
import * as moment from 'moment'
import { ConnectionsService } from 'src/app/services/connections.service';
declare var $:any; 
declare var jqxSchedular:any;  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    data: any;
    horizontalData: any;
    horizontalDataPose: any;
    donutData: any;
    lineData: any;
    requests: any = [];
    date:any = [];
    
    code: Number = 0;
    codeExpire: any = 0
    constructor(public _auth:AuthServiceService, private _connections:ConnectionsService, private _stats:StatsService, private secureStorage:SecureStorageService, private erService:ErService) { }
    ngOnInit(){
      this._stats.getDashboard(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        if(this._auth.role == 'admin'){
          this.horizontalDataPose = Object.create({labels: Object.keys(res.poseGroup), data: Object.keys(res.poseGroup).map(pose=>res.poseGroup[pose].length)})
          this.lineData = Object.create({labels: Object.keys(res.piGroup), data: Object.keys(res.piGroup).map(pose=>res.piGroup[pose].length)})
          this.donutData = Object.create({labels: Object.keys(res.deviceStatusGroup), data: Object.keys(res.deviceStatusGroup).map(pose=>res.deviceStatusGroup[pose].length)})
          this.horizontalData = Object.create({labels: Object.keys(res.userGroup), data: Object.keys(res.userGroup).map(pose=>res.userGroup[pose].length)})
        
          this.erService.getAll(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
            this.requests = res.requests
            map(this.requests, req=>{ 
              this.date.push(moment().diff(req.reqeust.createdt, 'minute'))
            })
          }) 
        
        }else  { 
          this._connections.getCode(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
            this.code = res.code.code
            this.codeExpire = 60 - moment(new Date).diff(moment(res.code.timeStamp), 'seconds')
            this.getCode(moment(new Date).diff(moment(res.code.timeStamp), 'seconds'))
            setInterval(()=>{
              this.codeExpire = parseInt(this.codeExpire )- 1
            }, 1000)
          })
        }
      })
        this.data = [
          {
            id: "id1",
            description: "George brings projector for presentations.",
            location: "",
            subject: "Quarterly Project Review Meeting",
            calendar: "Room 1",
            start: new Date(2017, 10, 23, 9, 0, 0),
            end: new Date(2017, 10, 23, 16, 0, 0)
          },
          {
            id: "id2",
            description: "",
            location: "",
            subject: "IT Group Mtg.",
            calendar: "Room 2",
            start: new Date(2017, 10, 24, 10, 0, 0),
            end: new Date(2017, 10, 24, 15, 0, 0)
          },
          {
             id: "id3",
            description: "",
            location: "",
            subject: "Course Social Media",
            calendar: "Room 3",
            start: new Date(2017, 10, 27, 11, 0, 0),
            end: new Date(2017, 10, 27, 13, 0, 0)
          }
        ]
    }

    getCode(interval:number){
      delay(()=>{
        this._connections.getCode(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
          this.code = res.code.code
          this.codeExpire = 60 - moment(new Date).diff(moment(res.code.timeStamp), 'seconds')
          this.getCode(moment(new Date).diff(moment(res.code.timeStamp), 'seconds'))
        })
      }, 60000 - (interval * 1000))
    }

    check(request:String){
      this.erService.check(request, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(check=>{
        this.erService.getAll(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
          this.requests = res.requests
          map(this.requests, req=>{ 
            this.date.push(moment().diff(req.reqeust.createdt, 'minute'))
          })
        }) 
      })
    }
}
