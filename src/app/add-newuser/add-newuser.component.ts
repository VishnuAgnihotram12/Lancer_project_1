import { Component } from '@angular/core';
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

  constructor(private fb: FormBuilder,public apiService:ApiService,private router:Router) {
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
}
