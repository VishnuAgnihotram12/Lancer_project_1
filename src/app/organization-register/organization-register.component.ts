import { Component, Renderer2 } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.scss']
})
export class OrganizationRegisterComponent {
  isProfileCardVisible = false;
  attendanceForm = new FormGroup({
    subject: new FormControl('', [
      Validators.required,
      // Validators.pattern('^[a-zA-Z]+$'), // Only letters allowed
    ]),
  });
  private globalClickUnlistener: (() => void) | null = null;
   public attendanceData:any = [];
   public organisationName:any;
  public userName:any;
  constructor(public apiService:ApiService,private router:Router, 
     private renderer: Renderer2,public toastr:ToastrService,
     private ngxService: NgxUiLoaderService,){

  }
  ngOnInit(){
    const storedArray = localStorage.getItem("AttendanceData");
    const parsedArray = storedArray ? JSON.parse(storedArray) : [];
    this.attendanceData = parsedArray;
    this.organisationName = localStorage.getItem("org-name");
    this.userName=localStorage.getItem("user-name");
  }
  public take_attendance(){
    this.toastr.success('Please go beside screen and click on the esc btn!','',{positionClass:'toast-top-center'});
    this.ngxService.start();
    const subject = this.attendanceForm.get('subject')?.value;
   this.apiService.attendanceAPI(subject).subscribe({
    next:(result:any)=>{
    if(result && result.status === 200){
      this.ngxService.stop();
      this.toastr.success('Attendance successful!','Success',{positionClass:'toast-top-center'});
      this.attendanceData = result.data.attendance;
      localStorage.setItem("AttendanceData",JSON.stringify(result.data.attendance));
    } else {
      this.ngxService.stop();
      this.toastr.error('error in taking attendance','error',{positionClass:'toast-top-center'});
    }
   },
   error:(error) => {
    console.error('Error:', error);
    this.ngxService.stop();
    if (error.status === 500) {
      this.toastr.error('Server error occurred. Please try again later.','error',{positionClass:'toast-top-center'});
    } else {
      this.toastr.error('An error occurred. Please try again.','error',{positionClass:'toast-top-center'});
    }
  },
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
    this.ngxService.start();
    const csvData = this.convertToCSV(this.attendanceData); 
    const blob = new Blob([csvData], { type: 'text/csv' }); 
    this.toastr.success('Data Downloaded Successful!','Success',{positionClass:'toast-top-center'});
    const url = window.URL.createObjectURL(blob); 
    const link = document.createElement('a');
    link.href = url;
    link.download = 'attendanceData.csv';
    setTimeout(() => {
      this.ngxService.stop();
      link.click();
    },2000)
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
