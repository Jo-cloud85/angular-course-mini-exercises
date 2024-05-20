import { Injectable } from "@angular/core";
import { Post, ResponseData } from "./post.model";
import { AbstractControl } from "@angular/forms";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject, Subscription, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {
  // The .json is a firebase requirement
  firebaseURL: string = 'https://ng-backend-6367e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

  error = new Subject<string>();
  private sub !: Subscription;

  constructor(private http: HttpClient) {}

  /* Note that Http requests are also managed via observables thats why we can wrap the Http requests
  and we can then subscribe to them to get informed about the response and to handle errors and so on.
  If you are not subscribing to the requests, then Angular and rxjs know that no one's interested in the
  response and therefore the requests don't even get sent. 
  
  So here, the post request returns an observable that wraps our request and to get access to the response,
  you have to call subscribe and then can you get your response data. */

  createAndStorePosts(ctrl: AbstractControl): void {
    if (ctrl.value) {
      const postData: Post = ctrl.value;

      this.sub = this.http
        .post<ResponseData>(this.firebaseURL, postData, { observe: 'response' })
        .subscribe({
          next: (response) => {
            console.log(response.body);
          },
          error: (err: HttpErrorResponse) => {
            this.error.next(err.message);
          },
          complete: () => {
            this.sub.unsubscribe();
          }
        });
    }
  }

  /* Similar to post request, for get request you must also subscribe to the returned observable 
  but in this case, we do the subscribe inside app.component.ts because of of the 2 variables
  isFetching and loadedPosts. */
  fetchPosts(): Observable<any> {
    let searchParams=new HttpParams()
      .set('print', 'pretty')
      .set('custom', 'key');

    return this.http
      .get<ResponseData>(this.firebaseURL, {
        headers: new HttpHeaders({'Custom-Header': 'Hello'}),
        params: searchParams
      })
      .pipe(
        map((responseData: ResponseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key})
            }
          }
          return postsArray;
        }),
        catchError((errorRes: HttpErrorResponse) => {
          return throwError(() => new Error(errorRes.message));
        })
      )
  }

  // 'body' is actually the default, compared to 'response', 'events'
  deletePosts(): Observable<any> {
    return this.http.delete(this.firebaseURL, {observe: 'body'});
  }
}