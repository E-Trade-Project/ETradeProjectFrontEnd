import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signnavi',
  templateUrl: './signnavi.component.html',
  styleUrls: ['./signnavi.component.css']
})
export class SignnaviComponent {
  showSignButton: boolean = false;
  faUser=faUser;
  showSignButtons() {
    this.showSignButton = true;
  }
    hideSignButtons() {
      this.showSignButton = false;
    }
}
