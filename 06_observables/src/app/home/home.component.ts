import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription!: Subscription;

  constructor() {}

  ngOnInit() {
    /* interval is an observable we import from rxjs.

    The idea of storing the subscription here simply is that we can now implement onDestroy here, and
    inside of ngOnDestroy, we can now use our subscription and call unsubscribe. And that means whenever
    we leave that component i.e. navigate away like clicking on another link so that we leave the current
    component, we clear that subscription, therefore preventing memory leaks because we are not keeping
    old subscriptions around. 
    
    The next question you might ask is why we don't have to unsubscribe the params observable in 
    user.component.ts? params is an observable provided by Angular (it is not from rxjs), thus, Angular
    will automatically do the unsubscribing for us once we leave the component. */

    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    })

    /* Customizing our own observable - although it is very rare that we do so, this is just to understand
    how observables work behind the scenes. For example, any errors will cancel observer.complete(),. */
    const customIntervalObservable = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });


    this.firstObsSubscription = customIntervalObservable.pipe(
      filter((data: any) => {
        return data > 0;
      }), 
      map((data: number) => {
        return 'Round: ' + (data + 1);
      }))
      .subscribe((data: any) => {
        console.log(data);
      }, (error: any) => {
        console.log(error);
        alert(error.message);
      }, () => {
        console.log('Completed!');
      });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
