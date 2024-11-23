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
}
