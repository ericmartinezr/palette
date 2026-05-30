import { Component, input, effect, ElementRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { GradientConfig } from '../models/types';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-gradient-preview',
  template: `
    <div class="preview-wrap">
      <div class="preview" #preview [style.background]="bgStyle()"></div>
    </div>
  `,
  styles: [`
    .preview-wrap {
      width: 100%;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 40px rgba(0,0,0,0.3);
    }
    .preview {
      width: 100%;
      aspect-ratio: 16 / 9;
      transition: background 0.5s ease;
    }
  `],
})
export class GradientPreview implements AfterViewInit {
  config = input.required<GradientConfig>();
  protected bgStyle: () => string;
  private anim: gsap.core.Tween | null = null;

  constructor(
    private colorService: ColorService,
    private elementRef: ElementRef,
  ) {
    this.bgStyle = () => this.colorService.gradientCss(this.config());
  }

  ngAfterViewInit() {
    const el = this.elementRef.nativeElement.querySelector('.preview') as HTMLElement;
    this.anim = gsap.to(el, {
      backgroundPosition: '100% 50%',
      duration: 8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}
