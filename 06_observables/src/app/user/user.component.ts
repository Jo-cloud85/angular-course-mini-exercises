import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  id!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    /* This is using an observable params to which we subscribe. 
    
    Observables are constructs to which you subscribe to be informed about changes in data. Because 
    remember, observables are that stream of data and whenever a new data piece is emitted, our subscription 
    will know about it. So in this case here, params is the observable. It's a stream of route parameters and
    that stream gives us a new route parameter whenever we go to a new page i.e. whenever that parameter in 
    the URL changes and then here in this function we pass to subscribe, we get the new params and we can
    extract our ID param. */

    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }
}
