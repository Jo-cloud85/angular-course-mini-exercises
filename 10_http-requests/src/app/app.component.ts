import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  postForm !: FormGroup;
  isFetching: boolean = false;
  loadedPosts: Post[] = [];
  error:string = '';
  private errorSub !: Subscription;

  constructor(
    private formbuilder: FormBuilder,
    private postSvc: PostsService) {}

  ngOnInit(): void {
    this.errorSub = this.postSvc.error.subscribe(errMsg => {
      this.error=errMsg;
    });
    this.isFetching=true;
    this.postForm = this.formbuilder.group({
      title: this.formbuilder.control<string>('', [Validators.required, Validators.minLength(5)]),
      content: this.formbuilder.control<string>('', [Validators.required, Validators.maxLength(250)])
    })
    this.fetchAndSubscribe(); 
  }

  onCreatePost() {
    this.postSvc.createAndStorePosts(this.postForm)
    this.postForm.reset();
  }

  onFetchPosts() {
    this.isFetching=true;
    this.fetchAndSubscribe();
  }

  onClearPosts() {
    this.postSvc.deletePosts().subscribe(()=> {
      this.loadedPosts=[];
    })
  }

  private fetchAndSubscribe(): void {
    this.postSvc.fetchPosts().subscribe(
      posts => {
        this.isFetching=false;
        this.loadedPosts=posts;
      }, 
      error => {
        this.isFetching=false;
        this.error=error.message;
      }
    );
  }

  onHandleError() {
    this.error="";
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
