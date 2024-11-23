import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  organizationOptions: any[] = [];
  selectedOrganizationId!: string;
  form: FormGroup = new FormGroup({
    organizationName: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder,public apiService:ApiService,private router:Router) {}

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
}
