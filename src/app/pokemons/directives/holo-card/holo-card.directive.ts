import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoloCard]'
})
export class HoloCardDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'card-holo');
    // Set default rarity to amazing rare for maximum effect
    this.renderer.setAttribute(this.el.nativeElement, 'data-rarity', 'amazing rare');
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('touchmove', ['$event'])
  onMove(e: any) {
    const el = this.el.nativeElement;
    const rect = el.getBoundingClientRect();

    let clientX, clientY;
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Natural tilt: Side under cursor tilts "towards" the camera
    const rotateY = ((x - centerX) / centerX) * 20;
    const rotateX = ((centerY - y) / centerY) * 20;

    el.style.setProperty('--pointer-x', `${px}%`);
    el.style.setProperty('--pointer-y', `${py}%`);
    el.style.setProperty('--rotate-x', `${rotateX}deg`);
    el.style.setProperty('--rotate-y', `${rotateY}deg`);
    el.style.setProperty('--background-x', `${px}%`);
    el.style.setProperty('--background-y', `${py}%`);
    el.style.setProperty('--card-opacity', '1');
    el.style.setProperty('--card-scale', '1.05');

    this.renderer.addClass(el, 'interacting');
  }

  @HostListener('mouseleave')
  @HostListener('touchend')
  onLeave() {
    const el = this.el.nativeElement;
    el.style.setProperty('--card-opacity', '0');
    el.style.setProperty('--rotate-x', '0deg');
    el.style.setProperty('--rotate-y', '0deg');
    el.style.setProperty('--card-scale', '1');
    this.renderer.removeClass(el, 'interacting');
  }
}
