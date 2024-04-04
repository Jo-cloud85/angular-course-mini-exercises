import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  // @HostBinding('class.show') // Does not work
  isOpen=false;
  dropdownMenu: HTMLElement | null = null;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  // We use this lifecycle hook to set the dropdownMenu property to the correct value after
  // the view has been initialized
  ngAfterViewInit(){
    this.dropdownMenu = this.elRef.nativeElement.nextElementSibling;
  }

  @HostListener('click') toggleOpen() {
    if (!this.dropdownMenu) {
      return;
    }

    if (this.isOpen) {
      this.renderer.removeClass(this.dropdownMenu, 'show');
    } else {
      this.renderer.addClass(this.dropdownMenu, 'show');
    }

    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event']) onClickPage(event: Event) {
    const isButtonClicked = this.elRef.nativeElement.contains(event.target);
    if (isButtonClicked) {
      // click occured inside the dropdown or dropdown menu is not initialized, do nothing
      return;
    }

    if (this.isOpen) {
      this.renderer.removeClass(this.dropdownMenu, 'show');
    }

    this.isOpen =false;
  }
}
