import { Component, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AI_Project';
  navigateToSignup() {
    this.router.navigate(['/signup']);
}
  constructor(private formBuilder: FormBuilder,public apiService:ApiService,
    private router:Router, private renderer: Renderer2,
    public toastr:ToastrService,private ngxService: NgxUiLoaderService) {}

  
  

}
