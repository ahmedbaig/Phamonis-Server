import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import { PiService } from 'src/app/services/pi.service';
import {filter, map, chunk, sortBy} from 'lodash'
import * as moment from 'moment'
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import Swal from 'sweetalert2';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: any = {} 
  firstName: String = "";
  lastName: String = "";
  device: any = []
  sessions: any = []
  showQualification:Boolean = false
  images: any = []
  degree: string = ""
  grade: string = ""
  institute: string = ""
  
  qualification:String = "";
  imageSelected: Boolean = false; 
  uploadData = new FormData();

  constructor(public sanitizer: DomSanitizer, private user_service:UserService, private geolocation:GeolocationService, private pi_services:PiService, private data_service: DataService, private secureStorage:SecureStorageService, public _auth:AuthServiceService) { }

  ngOnInit() {
    this.user_service.getUser(this.secureStorage.getUserId()!, JSON.parse(this.secureStorage.getItem('session_t')).jwt!).subscribe(res=>{
      this.user = res.user
      this.sessions = chunk( map( sortBy(res.sessions, [function(o:any){return o.lastUsed}]), (session)=>{
        let body = {
          src: this.geolocation.getMapSrc(session.geoLocationData.latitude, session.geoLocationData.longitude),
          location: `${session.geoLocationData.city} ${session.geoLocationData.region} ${session.geoLocationData.country_name}`,
          route: `${session.geoLocationData.asn.route}`,
          timeStamp: moment(session.lastUsed).format('LLLL'),
          token: session._id,
          current: JSON.parse(this.secureStorage.getItem('session_t')).jwt!=session._id?false:true
        } 
        return body
      }), 3 )
      
      console.log(this.sessions)
      if(this.user.qualification.length != 0){
        this.user.qualification.forEach((q: { _id: string | number; path: String; }) => {
          this.images[q._id] = this.data_service.getUserQualification(q.path)
        });
      }
      this.pi_services.getAll(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
        this.device = filter(res.devices, o=>{return o.user == this.secureStorage.getUserId()})
      })
    })
  }

  logoutSession(token:String){
    this.data_service.logout(token).subscribe(res=>{
      if(res.success){
        this.user_service.getUser(this.secureStorage.getUserId()!, JSON.parse(this.secureStorage.getItem('session_t')).jwt!).subscribe(res=>{
          this.user = res.user
          this.sessions = chunk( map(res.sessions, (session)=>{
            let body = {
              src: this.geolocation.getMapSrc(session.geoLocationData.latitude, session.geoLocationData.longitude),
              location: `${session.geoLocationData.city} ${session.geoLocationData.region} ${session.geoLocationData.country_name}`,
              route: `${session.geoLocationData.asn.route}`,
              timeStamp: moment(session.timeStamp).format('LLLL'),
              token: session._id,
              current: JSON.parse(this.secureStorage.getItem('session_t')).jwt!=session._id?false:true
            }
            return body
          }), 3 ) 
          console.log(this.sessions)
        })
      }
    })
  }

  showQualificationForm(){
    this.showQualification = !this.showQualification
  }
  
  onSelectFile(event:any) { // called each time file input changes 
    if(this.degree==""){
      Swal.fire("Opps", "Please enter a degree name", "error")
      return 
    }
    if(this.grade==""){
      Swal.fire("Opps", "Please enter a grade", "error")
      return 
    }
    if(this.institute==""){
      Swal.fire("Opps", "Please enter a institute name", "error")
      return 
    }
    this.imageSelected = true 
    this.uploadData.append('image', event.target.files[0], event.target.files[0].name);
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event:any) => { // called once readAsDataURL is completed
      this.qualification = event.target.result;
    }
  }

  save(){
    this.user_service.addQualification(this.uploadData, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      if(res.success){
        this.ngOnInit()
        Swal.fire("Success", res.message, 'success')
      }else{
        Swal.fire("Opps", res.message, 'error')
      }
    })
  }

}
