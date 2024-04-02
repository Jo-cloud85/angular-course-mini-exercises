import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css'
})
export class ServerElementComponent {
  // By default, all properties of components are only accessible inside these components
  // You have to be explicit about the properties you want to expose to the outside world
  // You want the parent components, in this case app.component, to be able to bind to this property, you need to add @Input().
  @Input('srvElement')
  element: {type: string, name: string, content:string};
}
