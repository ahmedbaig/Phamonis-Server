import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-activition',
  templateUrl: './account-activition.component.html',
  styleUrls: ['./account-activition.component.css']
})
export class AccountActivitionComponent implements OnInit {

  message: String = "";

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    
    this.route.params.subscribe(params => {
      this.dataService.activateAccount(params.token).subscribe((res)=>{
        if(res.success){
          Swal.fire("Success", res.message, 'success')
        }
      })  
    });
   }

  ngOnInit() {  

  }
}
