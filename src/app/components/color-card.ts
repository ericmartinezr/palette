import { Component, input, AfterViewInit, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-color-card',
  template: `
    <div
      class="card"
      [style.background]="color()"
      (click)="copyColor()"
      #card
    >
      <div class="overlay">
        <span class="hex">{{ color() }}</span>
        <span class="copy-hint">{{ copied ? '✓ Copiado' : 'Copiar' }}</span>
      </div>
    </div>
  `,
  styles: [`
    .card {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 16px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .card:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    }
    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(2px);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .card:hover .overlay {
      opacity: 1;
    }
    .hex {
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      color: #fff;
      text-shadow: 0 1px 4px rgba(0,0,0,0.5);
      letter-spacing: 0.05em;
    }
    .copy-hint {
      font-family: 'Inter', sans-serif;
      font-size: 0.7rem;
      color: rgba(255,255,255,0.7);
    }
  `],
})
export class ColorCard implements AfterViewInit {
  color = input.required<string>();
  index = input(0);
  copied = false;
  private el!: HTMLElement;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.el = this.elementRef.nativeElement.querySelector('.card')!;
    gsap.from(this.el, {
      opacity: 0,
      y: 30,
      scale: 0.8,
      duration: 0.5,
      delay: (this.index() ?? 0) * 0.08,
      ease: 'back.out(1.7)',
    });
  }

  async copyColor() {
    try {
      await navigator.clipboard.writeText(this.color());
      this.copied = true;
      setTimeout(() => (this.copied = false), 1200);
    } catch {
      // fallback
    }
  }
}
