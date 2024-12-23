import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private ngxtoastr:ToastrService,
    private router:Router,private ngxService: NgxUiLoaderService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailOrUsername: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public userList(user_id:any){
    this.apiservice.user_Profile(user_id).subscribe({
      next:(result: any)=> {
      if(result){
      localStorage.setItem("user-name",result.data.user_data.name);
      }
    },error:(err: any)=>{
      this.ngxtoastr.error('An error occurred. Please try again.','error',{positionClass:'toast-top-center'});
    }});
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
      this.ngxService.start();
      this.apiservice.login(this.form.value).subscribe((result: any)=> {
        if(result && result.status ===  200){
          this.isLoading = false;
          this.userList(result.data.user_id);
          localStorage.setItem("UserId",result.data.user_id);
          this.ngxService.stop();
          this.router.navigate(["Organization"]);
          this.ngxtoastr.success('login is successfull.','succcess',{positionClass:'toast-top-center'});
        }
      },(err:any) => {
        console.log(err)
        this.ngxService.stop();
        this.ngxtoastr.error('An error occurred. Please try again.','error',{positionClass:'toast-top-center'});
        this.isLoading = false;
      })

    } else {
      this.ngxService.stop();
      this.isLoading = false;
      this.ngxtoastr.error('Please correct the errors in the form.','error',{positionClass:'toast-top-center'});
    }
  }

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }
  navigator(){
    this.router.navigate(["Signup"])
  }
}
;