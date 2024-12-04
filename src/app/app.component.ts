import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AI_Project';
  router: any;
  navigateToSignup() {
    this.router.navigate(['/signup']);
}
  constructor(private formBuilder: FormBuilder,public apiService:ApiService,
    private router:Router, private renderer: Renderer2,
    public toastr:ToastrService,private ngxService: NgxUiLoaderService) {}
  
  public userList(){
    const user_id  = localStorage.getItem("UserId")
    this.apiService.oragnisationList(user_id).subscribe({
      next:(result: any)=> {
      if(result){
      
      }
    },error:(err: any)=>{
      this.toastr.error('An error occurred. Please try again.','error',{positionClass:'toast-top-center'});
    }});
  }
}
