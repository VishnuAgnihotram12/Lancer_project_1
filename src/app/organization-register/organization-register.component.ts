import { Component, Renderer2 } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.scss']
})
export class OrganizationRegisterComponent {
  isProfileCardVisible = false;
  private globalClickUnlistener: (() => void) | null = null;
   public attendanceData:any = [];
   public organisationName:any;
  constructor(public apiService:ApiService,private router:Router,  private renderer: Renderer2){

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

  toggleProfileCard(): void {
    this.isProfileCardVisible = !this.isProfileCardVisible;

    // If the card is visible, add a global click listener
    if (this.isProfileCardVisible) {
      this.addGlobalClickListener();
    } else {
      this.removeGlobalClickListener();
    }
  }

  private addGlobalClickListener(): void {
    this.globalClickUnlistener = this.renderer.listen('document', 'click', (event) => {
      const target = event.target as HTMLElement;

      // Close the card if the click is outside the card and the profile icon
      if (!target.closest('.profile-icon-container')) {
        this.isProfileCardVisible = false;
        this.removeGlobalClickListener();
      }
    });
  }

  private removeGlobalClickListener(): void {
    if (this.globalClickUnlistener) {
      this.globalClickUnlistener(); // Remove the listener
      this.globalClickUnlistener = null;
    }
  }

  viewProfile(): void {
    console.log('View Profile clicked');
    // Add logic for "View Profile"
  }

  logout(): void {
    this.router.navigate(['Login']); 
  }

  ngOnDestroy(): void {
    this.removeGlobalClickListener(); // Cleanup the listener when the component is destroyed
  }
}
