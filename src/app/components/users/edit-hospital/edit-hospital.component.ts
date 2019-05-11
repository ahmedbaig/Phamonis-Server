import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'src/app/services/hospital.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.css']
})
export class EditHospitalComponent implements OnInit {

  name:String = ""
  phone:String = ""
  address:String = ""
  constructor(private route:ActivatedRoute, private router:Router, private _service:HospitalService, private secureStorage:SecureStorageService) { }

  ngOnInit() {
    this._service.detailHospital(this.route.snapshot.params['hospital'], JSON.parse(this.secureStorage.getItem("session_t")).jwt).subscribe(res=>{
      this.name = res.hospital.name
      this.phone = res.hospital.phone
      this.address = res.hospital.address
    })
  }

  save(){
    let body = {
      id:this.route.snapshot.params['hospital'], 
      name:this.name,
      phone:this.phone,
      address:this.address
    }
    this._service.updateHospital(body, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      if(res.success){
        this.router.navigate(['/all-hospitals'])
      }else{
        Swal.fire('Opps', res.message, 'error')
      }
    })
  }

}
