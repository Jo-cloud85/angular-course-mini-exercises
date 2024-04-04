import { 
  Directive, 
  HostListener, 
  OnInit, 
  ElementRef, 
  Renderer2, 
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() defaultBGColor: string = 'transparent';
  @Input() defaultColor: string = 'black';

  @Input() highlightBGColor: string = 'lightgray';
  @Input() highlightColor: string = 'white';

  /* You can either use @HostBinding or renderer.setStyle */
  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.color') color: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue', false);
    this.backgroundColor = this.defaultBGColor;
    this.color = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue', RendererStyleFlags2.DashCase);
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white', RendererStyleFlags2.DashCase);
    this.backgroundColor = this.highlightBGColor;
    this.color = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent', RendererStyleFlags2.DashCase);
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black', RendererStyleFlags2.DashCase);
    this.backgroundColor = this.defaultBGColor;
    this.color = this.defaultColor;
  }
}
