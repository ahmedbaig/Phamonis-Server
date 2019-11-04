import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { PiService } from 'src/app/services/pi.service';
import { UserService } from 'src/app/services/user.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import { delay, filter, map, chunk, clone } from 'lodash' 
import { getOrigin } from 'src/app/origin';
import * as moment from 'moment';
import Swal from 'sweetalert2';
declare var $:any
declare var M:any
@Component({
  selector: 'app-edit-hardware',
  templateUrl: './edit-hardware.component.html',
  styleUrls: ['./edit-hardware.component.css']
})
export class EditHardwareComponent implements OnInit {
  model:String = ""
  serial_number:String = ""
  active: Boolean = false;
  status:Boolean = false
  user:String = ""
  users:any = []
  threshold:number = 0
  poses: any = []
  sessions: any = []
  origin: String = getOrigin()
  constructor(private router:Router, private route:ActivatedRoute, private _piService: PiService, private _userService: UserService, private secureStorage:SecureStorageService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        _piService.getDevice(JSON.parse(secureStorage.getItem('session_t')).jwt, route.snapshot.params['id']).subscribe(res=>{
          this.model = res.device.model
          this.serial_number = res.device.serial_number
          this.active = res.device.active
          this.status = res.device.status
          this.threshold = res.device.threshold 
          let sessions = res.device.sessions.reverse()
          sessions.splice(8,sessions.length)
          map(sessions, session=>{
            let body = {
              routeIp: session.routeIp,
              timeStamp: moment(session.timeStamp).format("LLLL") 
            }
            this.sessions.push(clone(body))
          })
          console.log(res.device.sessions)
          if(res.device.user != null){
            this.user = res.device.user
          }
          Promise.all(map(res.device.poses, pose=>{
            let body = {
              pose: this.origin+`/dist-pose/${pose.item}`,
              name: pose.item,
              createdt: moment(pose.timestamp).format("LLLL")
            }
            this.poses.push(body)
          })).then(()=>{
            this.poses = chunk(this.poses, 3)
            console.log(this.poses)
          })
        }) 
      }
    });
   }

  ngOnInit() {
    this._userService.getAllUsers(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      this.users = filter(res.users, o=>{return o.role=='user'}) 
      delay(()=>{
        M.AutoInit();
        $('#users').formSelect();
        $('#threshold').formSelect();
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this._piService.getDevice(JSON.parse(this.secureStorage.getItem('session_t')).jwt, this.route.snapshot.params['id']).subscribe(res=>{
              this.model = res.device.model
              this.serial_number = res.device.serial_number
              this.active = res.device.active
              this.status = res.device.status
              let sessions = res.device.sessions.reverse()
              sessions.splice(8,sessions.length)
              map(sessions, session=>{
                let body = {
                  routeIp: session.routeIp,
                  timestamp: moment(session.timestamp).format("LLLL") 
                }
                this.sessions.push(clone(body))
              })
              console.log(res.device.sessions)
              this.threshold = res.device.threshold
              if(res.device.user != null){
                this.user = res.device.user
              }
              Promise.all(map(res.device.poses, pose=>{
                let body = {
                  pose: this.origin+`/dist-pose/${pose.item}`,
                  name: pose.item,
                  createdt: moment(pose.timestamp).format("LLLL")
                }
                this.poses.push(body)
              })).then(()=>{
                this.poses = chunk(this.poses, 3)
                console.log(this.poses)
              })
            }) 
          }
        });
      }, 1000)
    }) 
  }

  userChange(event:any){
    this.user = event.target.value
  } 

  save(){
    if(this.model == ""){
      Swal.fire("Opps", "Model name cannot be blank", "error")
      return 
    }
    if(this.serial_number == ""){
      Swal.fire("Opps", "Serial number cannot be blank", "error")
      return 
    }
    if(this.threshold == 0){
      Swal.fire("Opps", "Still threshold cannot be 0", "error")
      return 
    }
    let body = {model: this.model, serial_number: this.serial_number, active: this.active, status: this.status, user: this.user, threshold: this.threshold}
    this._piService.updateDevice(body, JSON.parse(this.secureStorage.getItem('session_t')).jwt, this.route.snapshot.params['id']).subscribe(res=>{
      if(res.success){
        Swal.fire("Success", res.message, "success")
        this.router.navigate(['/pi'])
      }else{
        Swal.fire("Opps", res.message, "error")
      }
    })
  }
}
