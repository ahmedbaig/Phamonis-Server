import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { PiService } from 'src/app/services/pi.service';
import { UserService } from 'src/app/services/user.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import { delay, filter, map, chunk, clone, reverse } from 'lodash' 
import { getOrigin } from 'src/app/origin';
import * as moment from 'moment';
import Swal from 'sweetalert2';
declare var $:any
declare var M:any

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit { 
  poses: any = [] 
  origin: String = getOrigin()
  constructor(private router:Router, private route:ActivatedRoute, private _piService: PiService, private _userService: UserService, private secureStorage:SecureStorageService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        _piService.getDeviceUser(JSON.parse(secureStorage.getItem('session_t')).jwt).subscribe(res=>{ 
          Promise.all(map(res.device.poses, pose=>{
            let body = {
              pose: this.origin+`/dist-pose/${pose.item}`,
              name: pose.item,
              createdt: moment(pose.timestamp).format("LLLL")
            }
            this.poses.push(body)
          })).then(()=>{
            this.poses = chunk(reverse(this.poses), 3) 
            console.log(this.poses)
          })
        }) 
      }
    });
   }

  ngOnInit() {
    this._userService.getAllUsers(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{ 
      delay(()=>{
        M.AutoInit();
        $('#users').formSelect();
        $('#threshold').formSelect();
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this._piService.getDevice(JSON.parse(this.secureStorage.getItem('session_t')).jwt, this.route.snapshot.params['id']).subscribe(res=>{ 
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
}
