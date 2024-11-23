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
    const storedArray = localStorage.getItem("AttendanceData");
    const parsedArray = storedArray ? JSON.parse(storedArray) : [];
    this.attendanceData = parsedArray;
    this.organisationName = localStorage.getItem("org-name");
  }
  public take_attendance(){
   this.apiService.attendanceAPI().subscribe((result:any)=>{
    if(result && result.status === 200){
      this.attendanceData = result.data.attendance;
      localStorage.setItem("AttendanceData",JSON.stringify(result.data.attendance));
    }
   });
  }
  public add_User(){
    this.router.navigate(["Add-user"])
  }
  private convertToCSV(data: any[]): string {
    if (!data.length) return '';
    const headers = Object.keys(data[0])
    .map(header => header.charAt(0).toUpperCase() + header.slice(1))
    .join(',');
    const rows = data.map(row => Object.values(row).join(',')); 
    return [headers, ...rows].join('\n'); 
  }

  public downloadExcel(){
    const csvData = this.convertToCSV(this.attendanceData); 
    const blob = new Blob([csvData], { type: 'text/csv' }); 
    const url = window.URL.createObjectURL(blob); 
    const link = document.createElement('a');
    link.href = url;
    link.download = 'attendanceData.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
