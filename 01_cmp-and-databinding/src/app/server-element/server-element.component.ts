import { 
    AfterContentChecked, 
    AfterContentInit, 
    AfterViewChecked, 
    AfterViewInit, 
    Component, 
    ContentChild, 
    DoCheck, 
    ElementRef, 
    Input, 
    OnChanges, 
    OnDestroy, 
    OnInit, 
    SimpleChanges, 
    ViewChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css'
})
export class ServerElementComponent implements 
  OnInit, 
  OnChanges, 
  DoCheck, 
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  // By default, all properties of components are only accessible inside these components
  // You have to be explicit about the properties you want to expose to the outside world
  // You want the parent components, in this case app.component, to be able to bind to this property, you need to add @Input().
  @Input('srvElement') element: {type: string, name: string, content:string} = {
    type: 'server', 
    name: 'Testserver', 
    content: 'This is a test server'
  };

  @Input() name: string = '';

  @ViewChild('heading', {static:true}) header: ElementRef = {} as ElementRef;

  /* This is to get access to content which is stored in another component but then passed on via ng-content. */
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef = {} as ElementRef;

  // Understanding component lifecycle
  // Get called 1st -------------
  constructor() {
    console.log('1. constructor is called');
  }

  // Get called 2nd -------------
  ngOnChanges(changes: SimpleChanges): void {
    console.log('2. ngOnChanges is called');
    // this will be the 'element' object above that we created at the start
    console.log(changes); 
  }

  // Get called 3rd -------------
  ngOnInit(): void {
    console.log('3. ngOnInit is called');
    console.log('>>> Text content: ' + this.header.nativeElement.textContent);
    console.log('>>>>>>> Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  // Get called 4th -------------
  ngDoCheck(): void {
      console.log('4. ngDoCheck is called');
  }

  // Get called 5th -  called only once -------------
  ngAfterContentInit(): void {
      console.log('5. ngAfterContentInit is called');
      console.log('>>>>>>> Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  // Get called 6th -------------
  // Also get called everytime after ngDoCheck gets called again
  ngAfterContentChecked(): void {
      console.log('6. ngAfterContentChecked is called');
  }

  // Get called 7th -------------
  // Gives you access to the template elements. You can then access them and use their 
  // values and so on. Before this hook is reached, you cannot do that. Thats why, the 
  // this.header.nativeElement.textContent under ngOnInit() prints nothing
  ngAfterViewInit(): void {
      console.log('7. ngAfterViewInit is called');
      console.log('>>> Text content: ' + this.header.nativeElement.textContent);
  }

  // Get called 8th  -------------
  ngAfterViewChecked(): void {
      console.log('8. ngAfterViewChecked is called --------- ');
  }

  // Get called last -------------
  // only when we click the button to destroy
  ngOnDestroy(): void {
      console.log('9. ngOnDestroy is called');
  }
}
