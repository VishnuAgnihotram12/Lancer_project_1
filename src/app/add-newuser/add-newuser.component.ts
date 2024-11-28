import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-newuser',
  templateUrl: './add-newuser.component.html',
  styleUrls: ['./add-newuser.component.scss']
})
export class AddNewuserComponent {
  addUserForm: FormGroup;
  isProfileCardVisible = false;
  private globalClickUnlistener: (() => void) | null = null;

  constructor(private fb: FormBuilder,public apiService:ApiService,private router:Router, private renderer: Renderer2) {
    this.addUserForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      userId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      console.log('Form Submitted', this.addUserForm.value);
      this.apiService.add_user(this.addUserForm.value).subscribe((result:any)=>{
       if(result && result.status === 200){
        this.router.navigate(["Organization-register"])
       }
      });
    } else {
      console.log('Form is invalid');
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
