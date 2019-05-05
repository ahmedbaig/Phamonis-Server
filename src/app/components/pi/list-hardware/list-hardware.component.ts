import { Component, OnInit } from '@angular/core';
import { PiService } from 'src/app/services/pi.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';

@Component({
  selector: 'app-list-hardware',
  templateUrl: './list-hardware.component.html',
  styleUrls: ['./list-hardware.component.css']
})
export class ListHardwareComponent implements OnInit {

  devices: any = []
  constructor(private secureStorage:SecureStorageService, private pi_service: PiService) { }

  ngOnInit() {
    this.pi_service.getAll(JSON.parse(this.secureStorage.getItem('session_t')).jwt).subscribe(res=>{
      this.devices = res.devices
    })
  }

}
