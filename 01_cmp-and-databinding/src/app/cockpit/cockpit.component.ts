import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent {

  /* Instead of using @Input() (for properties you can mark outside), we want to do the opposite for both properties: serverCreated and blueprintCreated. We want to make sure that both are events we can emit.
  And to make them events, we have to assign a new value to these properties i.e. new EventEmitter. And new EventEmitter is a generic type and we add () at the end, to call the constructor to create a new EventEmitter object. */
  @Output()
  serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') // adding alias - optional
  blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // once you use local reference and pass in a paramter into your methods, you don't need this variable anymore
  // newServerName = ''; 
  // newServerContent = '';

  @ViewChild('serverContentInput', {static: true}) // links to the html
  serverContentInput: ElementRef;

  
  /* With the 2 methods below, we are emitting our own events and passing the data. By adding the @Output() annotation, we are allowing the 2 properties: serverCreated and blueprintCreated, listenable fromm the outside. Rmb, it is @Output, not @Input, because we are passing our own event out of the component. */


  /* Using @ViewChild and then get the nativeElement, we get direct access to elements in our DOM, in our template. So basically w/o using two-way binding, but with local references passed to methods or local references fetched through @ViewChild. */
    

  onAddServer(nameInput: HTMLInputElement) {
    // This will emit a new event of this type i.e. serverCreated type

    // console.log(nameInput);
    // console.log(this.serverContentInput);

    this.serverCreated.emit({
      // serverName: this.newServerName,
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}
