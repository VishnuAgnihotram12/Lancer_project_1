import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  submitted = false;
  passwordHidden = true;
  isLoading:boolean = false;

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService,
    private router:Router,) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailOrUsername: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for easy access to form controls
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Mark all controls as touched to trigger validation messages
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });

    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
      this.isLoading = true;
      this.apiservice.login(this.form.value).subscribe((result: any)=> {
        if(result && result.status ===  200){
          this.isLoading = false;
          localStorage.setItem("UserId",result.data.user_id);
          setTimeout(() => {
            this.router.navigate(["Organization"]);
          },2000)
        }
      },(err:any) => {
        console.log(err)
        this.isLoading = false;
      })

    } else {
      this.isLoading = false;
      alert('Please correct the errors in the form.');
    }
  }

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }
  navigator(){
    this.router.navigate(["Signup"])
  }
}
