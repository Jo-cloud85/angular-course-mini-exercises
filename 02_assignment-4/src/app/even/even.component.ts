import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent {
  // We use @Input() since the data should be passed from outside into this component
  @Input() 
  number: number;
}
