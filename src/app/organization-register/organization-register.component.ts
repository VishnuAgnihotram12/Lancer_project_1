import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.scss']
})
export class OrganizationRegisterComponent {
   public attendanceData:any = [];
   public organisationName:any;
  constructor(public apiService:ApiService,private router:Router){

  }
  ngOnInit(){
    this.attendanceData = localStorage.getItem("AttendanceData");
    this.organisationName = localStorage.getItem("org-name");
  }
  public take_attendance(){
   this.apiService.attendanceAPI().subscribe((result:any)=>{
    if(result && result.status === 200){
      this.attendanceData = result.data.attendance;
      localStorage.setItem("AttendanceData",result.data.attendance);
    }
   });
  }
  public add_User(){
    this.router.navigate(["Add-user"])
  }
}
