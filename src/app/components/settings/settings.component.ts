import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
import { SecureStorageService } from 'src/app/auth/secure-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: any = {}
  image: String = ""
  firstName: String = "";
  lastName: String = "";
  device: any = {}
  constructor(private user_service:UserService, private data_service: DataService, private secureStorage:SecureStorageService) { }

  ngOnInit() {
    this.user_service.getUser(this.secureStorage.getUserId()!, JSON.parse(this.secureStorage.getItem('session_t')).jwt!).subscribe(res=>{
      this.user = res.user 
      
    })
  }
}
