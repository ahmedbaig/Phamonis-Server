import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';

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
  constructor(private user_service:UserService, private data_service: DataService) { }

  ngOnInit() {
    this.user_service.getUser(localStorage.getItem('session_u')!, localStorage.getItem('session_t')!).subscribe(res=>{
      this.user = res.user
      this.image = this.data_service.getUserImage(res.user.profilePicture)
    })
  }
}
