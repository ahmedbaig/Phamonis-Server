import { Component, OnInit } from '@angular/core';
import { PiService } from 'src/app/services/pi.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import { filter } from 'lodash'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-hardware',
  templateUrl: './list-hardware.component.html',
  styleUrls: ['./list-hardware.component.css']
})
export class ListHardwareComponent implements OnInit {

  devices: any = []
  inactive: any = []
  active: any = []
  constructor(private secureStorage:SecureStorageService, private pi_service: PiService) { }

  ngOnInit() {
    this.pi_service.getAll(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      this.devices = res.devices
      this.inactive = filter(res.devices, o=>{return o.status==false})
      this.active = filter(res.devices, o=>{return o.status==true})
    })
  }

  remove(item:String){
    this.pi_service.removeDevice(JSON.parse(this.secureStorage.getItem('session_t')).jwt, item).subscribe(res=>{
      if(res.success){
        this.ngOnInit()
      }else{
        Swal.fire("Opps", res.message, "error")
      }
    })
  }

}
