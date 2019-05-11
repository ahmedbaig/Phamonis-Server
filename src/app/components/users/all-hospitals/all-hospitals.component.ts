import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';
import Swal from 'sweetalert2';
import { sortBy } from 'lodash'
@Component({
  selector: 'app-all-hospitals',
  templateUrl: './all-hospitals.component.html',
  styleUrls: ['./all-hospitals.component.css']
})
export class AllHospitalsComponent implements OnInit {

  hospitals:any = []
  constructor(private _service:HospitalService, private secureStorage:SecureStorageService) { }

  ngOnInit() {
    this._service.getAll(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      this.hospitals = sortBy(res.hospitals, [function(o:any){return o.name}])
    })
  }

  delete(id:String){
    let body = {
      id:id
    }
    this._service.deleteHospital(body, JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      if(res.success){
        this.ngOnInit()
      }else{
        Swal.fire("Opps", res.message, 'error')
      }
    })
  }

}
