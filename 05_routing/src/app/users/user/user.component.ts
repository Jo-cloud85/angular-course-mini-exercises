import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  /* The ActivatedRoute object we injected will give us access to the id passed in the URL i.e. 
  selected user */
  constructor(private route: ActivatedRoute) { }

  /* Snapshot is only for initialization but to be able to react to subsequent changes, we need 
  to use observables */
  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    /* This will update our user object whenever the parameter changes, and only when it changes. 
    Nothing will happen except just setting up the subscription when the ngOnInit() is first invoked. */
    this.route.params.subscribe(
      (params: Params) => {
        this.user.id=params['id'];
        this.user.name=params['name'];
      }
    )
  }
}

/*
More on the params.subscribe() method 
If you know that the component you're on may never be reloaded from within that component as we're 
doing it here, then you might not need this, this addition. You might simply use the snapshot
because if you know your component will 100% of the time be recreated when it is reached, because 
there's no other way of reaching it, there is no way of reaching it while it's being on that 
component, if you know that, you don't need to subscribe.
*/