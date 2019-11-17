import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { StatsService } from 'src/app/services/stats.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import { ErService } from 'src/app/services/er.service';
import {map, delay,filter} from 'lodash'
import * as moment from 'moment'
import { ConnectionsService } from 'src/app/services/connections.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
declare var $:any; 
declare var jqxSchedular:any;  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  otpForm!: FormGroup; 
  submitted:boolean = false

  data: any;
  horizontalData: any;
  horizontalDataPose: any;
  donutData: any;
  lineData: any;
  requests: any = [];
  date:any = []; 
  code: Number = 0;
  codeExpire: any = 0
  connections:any = []
  connectionBar:Number = 0
  connectionsCount:Number = 0
  poses:Number = 0
  constructor(public _auth:AuthServiceService, private _connections:ConnectionsService, 
    private formBuilder: FormBuilder, private _stats:StatsService, private secureStorage:SecureStorageService, 
    private erService:ErService, private _user:UserService) { }
  ngOnInit(){
    this._stats.getDashboard(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      
      delay(()=>{
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
      
      }else if(this._auth.role=='user') { 
          this._connections.getCode(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
            this.code = res.code.code
            this.codeExpire = 60 - moment(new Date).diff(moment(res.code.timeStamp), 'seconds')
            this.getCode(moment(new Date).diff(moment(res.code.timeStamp), 'seconds'))
            setInterval(()=>{
              this.codeExpire = parseInt(this.codeExpire )- 1
            }, 1000)
          })
          this._connections.userConnections(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
            this.connections = res.requests 
            this.connectionsCount = filter(this.connections, {status:true}).length
            this.connectionBar = Math.ceil((filter(this.connections, {status:true}).length / 10 ) * 100)
          })
          this._user.getPoses(this._auth.getUser()._id,JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
            this.poses = res.items.length
          })
      }else { 
        this.otpForm = this.formBuilder.group({  
          otp: ['', [Validators.required,
            Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]], 
        }); 
        this._connections.staffConnection(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
          this.connections = res.requests
        })
      }
      
    }, 2000)
    }) 
  } 
    
  // convenience getter for easy access to form fields
  get f() { return this.otpForm.controls; }

  getCode(interval:number){
    delay(()=>{
      this._connections.getCode(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        this.code = res.code.code
        this.codeExpire = 60 - moment(new Date).diff(moment(res.code.timeStamp), 'seconds')
        this.getCode(moment(new Date).diff(moment(res.code.timeStamp), 'seconds'))
      })
    }, 60000 - (interval * 1000))
  }

  reject(id:String){
    this._connections.declineConnection(id, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{ 
      this._connections.userConnections(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        this.connections = res.requests 
        this.connectionsCount = filter(this.connections, {status:true}).length
        this.connectionBar = Math.ceil((filter(this.connections, {status:true}).length / 10 ) * 100)
        
      })
    })
  }

  unreject(id:String){
    this._connections.undeclineConnection(id, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{ 
      this._connections.userConnections(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        this.connections = res.requests 
        this.connectionsCount = filter(this.connections, {status:true}).length
        this.connectionBar = Math.ceil((filter(this.connections, {status:true}).length / 10 ) * 100)
        
      })
    })
  }

  approve(id:String){ 
    this._connections.approveConnection(id, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{ 
      this._connections.userConnections(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        this.connections = res.requests 
        this.connectionsCount = filter(this.connections, {status:true}).length
        this.connectionBar = Math.ceil((filter(this.connections, {status:true}).length / 10 ) * 100)
        
      })
    })
  }

  connect(){
    this.submitted = true
    // stop here if form is invalid
    if (this.otpForm.invalid) { 
      return;
    } 
    let body = {code: this.otpForm.value.otp, connection: this._auth.getUser()._id}
    this._connections.addConnection(body, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      if(res.success){
        Swal.fire("Success", res.message, 'success')
        this.otpForm.value.otp = ""
      }else{ 
        Swal.fire("Opps", res.message, 'error')
      }
    })

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
