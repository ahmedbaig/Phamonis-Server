import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-hospital',
  templateUrl: './new-hospital.component.html',
  styleUrls: ['./new-hospital.component.css']
})
export class NewHospitalComponent implements OnInit {

  name:String = ""
  phone:String = ""
  address:String = ""

  constructor(private _service:HospitalService, private secureStorage:SecureStorageService, private router:Router) { }

  ngOnInit() {

  }

  save(){
    let body = {
      name:this.name,
      phone:this.phone,
      address:this.address
    }
    this._service.createHospital(body, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      if(res.success){
        this.router.navigate(['/all-hospitals'])
      }else{
        Swal.fire('Opps', res.message, 'error')
      }
    })
  }

}
