import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  submitted = false;
  passwordHidden = true;
  confirmPasswordHidden = true;

  constructor(private formBuilder: FormBuilder,public apiSeervice:ApiService, private router:Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.matchPasswords('password', 'confirmPassword'),
    });
  }

  // Getter for easy access to form controls
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // Custom Validator to match password and confirm password
  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl) => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (confirmPasswordControl?.errors && !confirmPasswordControl.errors['matching']) {
        return;
      }

      if (passwordControl?.value !== confirmPasswordControl?.value) {
        confirmPasswordControl?.setErrors({ matching: true });
      } else {
        confirmPasswordControl?.setErrors(null);
      }
    };
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
      this.apiSeervice.register(this.form.value).subscribe((result: any)=> {
        if(result && result.status ===  200){
          setTimeout(() => {
            this.router.navigate(["Login"])
          },2000)
        }
        else {
          if(result.status === "401"){
          }
        }
      },(err) => {
        // this.toastr.error(err.error.message);
      });
    } else {
      alert('Please correct the errors in the form.');
    }
  }

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordHidden = !this.confirmPasswordHidden;
  }
}
