import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css'
})
export class ServerElementComponent implements OnInit, OnChanges{
  // By default, all properties of components are only accessible inside these components
  // You have to be explicit about the properties you want to expose to the outside world
  // You want the parent components, in this case app.component, to be able to bind to this property, you need to add @Input().
  @Input('srvElement')
  element: {type: string, name: string, content:string};

  // Understanding component lifecycle
  // Get called 1st
  constructor() {
    console.log('Constructor is called');
  }

  // Get called 2nd
  ngOnChanges(changes: SimpleChanges): void {
      console.log('ngOnChanges is called');
      // this will be the 'element' object above that we created at the start
      console.log(changes); 
  }

  // Get called 3rd
  ngOnInit(): void {
      console.log('ngOnInit is called');
  }
}
