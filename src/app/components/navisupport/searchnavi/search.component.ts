import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  filmIcon = faMagnifyingGlass;
  isInputGroupFocused = false;
  onInputFocus() {
    this.isInputGroupFocused = true;
  }

  onInputBlur() {
    this.isInputGroupFocused = false;
  }

}
