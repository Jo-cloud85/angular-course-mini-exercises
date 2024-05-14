import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = '00_understanding-basics';

  // For assignment 2
  username: string = '';

  // For assignment 3
  showSecret: boolean = false;
  log: any = [];

  onToggleDetails() {
    this.showSecret = !this.showSecret;
    // this.log.push(this.log.length + 1);
    this.log.push(new Date())
  }
}
