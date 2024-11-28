import { Component, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  isProfileCardVisible = false;
  private globalClickUnlistener: (() => void) | null = null;
  organizationOptions: any[] = [];
  selectedOrganizationId!: string;
  form: FormGroup = new FormGroup({
    organizationName: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder,public apiService:ApiService,
    private router:Router, private renderer: Renderer2,
    public toastr:ToastrService,private ngxService: NgxUiLoaderService) {}

  ngOnInit(): void {
    this.organisationList()
    this.form = this.formBuilder.group({
      organizationName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      ]
    });
  }

  public organisationList(){
    const user_id  = localStorage.getItem("UserId")
    this.apiService.oragnisationList(user_id).subscribe({
      next:(result: any)=> {
      if(result){
        this.organizationOptions = result;
      }
    },error:(err: any)=>{
      this.toastr.error('An error occurred. Please try again.','error',{positionClass:'toast-top-center'});
    }});
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  apply(): void {
    this.ngxService.start();
    if (this.selectedOrganizationId) {
      this.toastr.success(`Selected Organization ID: ${this.selectedOrganizationId}`,'Success',{positionClass:'toast-top-center'});
      const foundName = this.organizationOptions.find(item => item.id === Number(this.selectedOrganizationId))?.name;
      localStorage.setItem("org-name",foundName);
      setTimeout(() => {
        this.ngxService.stop();
        this.router.navigate(["Organization-register"]);
      },2000)
    } else {
      this.ngxService.stop();
      this.toastr.error('Please select an organization.','error',{positionClass:'toast-top-center'});

    }
  }

  organizationRegister(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.ngxService.start();
      this.apiService.addOragnisation(this.form.value).subscribe({
        next:(result:any)=>{
        if(result && result.status === 200){
          this.organisationList()
          this.form.reset();
           this.submitted = false;
           this.ngxService.stop();
          this.toastr.success(result.message,'Success',{positionClass:'toast-top-center'});
        }
      },
      error:(err:any)=>{
        this.ngxService.stop();
        this.toastr.error('An error occurred. Please try again.','error',{positionClass:'toast-top-center'});
      }
    })
    } else {
      this.ngxService.stop();
      this.toastr.error('Please correct the errors in the form.','error',{positionClass:'toast-top-center'});
    }
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
