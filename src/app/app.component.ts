import { Component,OnInit } from '@angular/core';
import { FirstOperationsService } from './service/first-operations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private firstOperation:FirstOperationsService) {}
  ngOnInit(): void {
    this.firstOperation.guestControl();
  }
  title = 'ETradeProject';
}
