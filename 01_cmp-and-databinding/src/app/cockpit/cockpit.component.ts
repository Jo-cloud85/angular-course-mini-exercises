import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent {

  /* Instead of using @Input() (for properties you can mark outside), we want to do the opposite for both 
  properties: serverCreated and blueprintCreated. We want to make sure that both are events we can emit.
  And to make them events, we have to assign a new value to these properties i.e. new Subject. And new 
  Subject is a generic type and we add () at the end, to call the constructor to create a new 
  Subject object. */
  @Output() serverCreated = new Subject<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new Subject<{serverName: string, serverContent: string}>();

  /* With the 2 methods below, we are emitting our own events and passing the data. By adding the @Output() 
  annotation, we are allowing the 2 properties: serverCreated and blueprintCreated, to be listenable from
  outside. Rmb, it is @Output(), not @Input(), because we are passing our own event out of the component. */


  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Method 1 - Using two-way binding - no need to pass in local references from the HTML 
  /* Once you use local reference and pass in a parameter into your methods or you use @ViewChild, you don't
  need these variables anymore */
  // newServerName = ''; 
  // newServerContent = '';

  // onAddServer() {
  //   this.serverCreated.next({
  //     serverName: this.newServerName,
  //     serverContent: this.newServerContent
  //   });
  // }

  // onAddBlueprint() {
  //   this.blueprintCreated.next({
  //     serverName: this.newServerName,
  //     serverContent: this.newServerContent
  //   });
  // }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Method 2 - Using local references 
  /* Using @ViewChild and then get the nativeElement, we get direct access to elements in our DOM, in our 
  template. So basically w/o using two-way binding, but with local references passed to methods or local 
  references fetched through @ViewChild. */

  // links to the cockpit.component.html
  @ViewChild('serverContentInput', {static: true}) serverContentInput !: ElementRef;

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.next({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.next({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
}
