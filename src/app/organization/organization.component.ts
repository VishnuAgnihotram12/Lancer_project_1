import { Component, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder,public apiService:ApiService,private router:Router, private renderer: Renderer2) {}

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
    this.apiService.oragnisationList(user_id).subscribe((result: any)=> {
      if(result){
        this.organizationOptions = result;
      }
    });
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  apply(): void {
    if (this.selectedOrganizationId) {
      alert(`Selected Organization ID: ${this.selectedOrganizationId}`);
      const foundName = this.organizationOptions.find(item => item.id === Number(this.selectedOrganizationId))?.name;
      localStorage.setItem("org-name",foundName);
      this.router.navigate(["Organization-register"])
    } else {
      alert('Please select an organization.');
    }
  }

  organizationRegister(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.apiService.addOragnisation(this.form.value).subscribe((result:any)=>{
        if(result && result.status === 200){
          this.organisationList()
          this.form.reset();
           this.submitted = false;
          alert(result.message);
        }
      })
    } else {
      alert('Please correct the errors in the form.');
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
