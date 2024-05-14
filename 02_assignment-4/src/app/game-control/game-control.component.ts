import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  // @Output() intervalFired = new EventEmitter<number>();
  @Output() intervalFired = new Subject<number>(); //use Subject is better than EventEmitter

  interval: any;
  
  lastNumber = 0;

  onStartGame() {
    this.interval = setInterval(() => {
      this.intervalFired.next(this.lastNumber + 1); // if you use Subject, then use next() instead of emit()
      this.lastNumber++;
    }, 1000);
  }

  onPauseGame() {
    clearInterval(this.interval);
  }

}
