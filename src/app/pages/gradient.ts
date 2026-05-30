import { Component, signal, AfterViewInit, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { FormsModule } from '@angular/forms';
import { ColorService } from '../services/color.service';
import { GradientConfig, GradientStop } from '../models/types';
import { GradientPreview } from '../components/gradient-preview';

@Component({
  selector: 'app-gradient',
  imports: [FormsModule, GradientPreview],
  template: `
    <div class="page" #page>
      <div class="header">
        <h1 class="title">Constructor de gradientes</h1>
        <p class="desc">Mezcla colores y exporta el código CSS.</p>
      </div>

      <div class="layout">
        <div class="preview-section">
          <app-gradient-preview [config]="config()" />

          <div class="css-box">
            <code>{{ cssOutput() }}</code>
            <button class="copy-btn" (click)="copyCss()">
              {{ copied ? '✓ Copiado' : 'Copiar CSS' }}
            </button>
          </div>
        </div>

        <div class="controls-section">
          <div class="control-group">
            <label class="label">Tipo</label>
            <div class="toggle">
              <button
                [class.active]="config().type === 'linear'"
                (click)="setType('linear')"
              >Lineal</button>
              <button
                [class.active]="config().type === 'radial'"
                (click)="setType('radial')"
              >Radial</button>
            </div>
          </div>

          @if (config().type === 'linear') {
            <div class="control-group">
              <label class="label">
                Ángulo: {{ config().angle }}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                [ngModel]="config().angle"
                (ngModelChange)="setAngle($event)"
                class="slider"
              />
            </div>
          }

          <div class="control-group">
            <label class="label">Paradas de color</label>
            <div class="stops">
              @for (s of config().stops; track idx; let idx = $index) {
                <div class="stop-row">
                  <input
                    type="color"
                    [ngModel]="s.color"
                    (ngModelChange)="updateStop(idx, 'color', $event)"
                    class="color-picker"
                  />
                  <div class="stop-info">
                    <span class="stop-hex">{{ s.color }}</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      [ngModel]="s.offset"
                      (ngModelChange)="updateStop(idx, 'offset', $event)"
                      class="slider small"
                    />
                    <span class="stop-offset">{{ s.offset }}%</span>
                  </div>
                  @if (config().stops.length > 2) {
                    <button
                      class="remove-stop"
                      (click)="removeStop(idx)"
                    >✕</button>
                  }
                </div>
              }
            </div>
            <button class="add-stop" (click)="addStop()">+ Añadir color</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page {
      max-width: 1100px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }
    .header {
      margin-bottom: 2.5rem;
    }
    .title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .desc {
      font-family: 'Inter', sans-serif;
      color: rgba(255,255,255,0.5);
      font-size: 0.95rem;
    }
    .layout {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 2rem;
    }
    @media (max-width: 800px) {
      .layout { grid-template-columns: 1fr; }
    }
    .preview-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .css-box {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(0,0,0,0.3);
      border-radius: 12px;
      padding: 0.8rem 1rem;
      font-family: 'Inter', monospace;
      font-size: 0.78rem;
      color: rgba(255,255,255,0.6);
      overflow-x: auto;
    }
    .css-box code {
      flex: 1;
      white-space: nowrap;
      overflow-x: auto;
    }
    .copy-btn {
      flex-shrink: 0;
      font-family: 'Inter', sans-serif;
      font-size: 0.75rem;
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.6);
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .copy-btn:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
    }
    .controls-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .control-group {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 1.2rem;
    }
    .label {
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      color: rgba(255,255,255,0.6);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 0.8rem;
    }
    .toggle {
      display: flex;
      gap: 4px;
      background: rgba(255,255,255,0.04);
      border-radius: 10px;
      padding: 4px;
    }
    .toggle button {
      flex: 1;
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      padding: 0.5rem;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: rgba(255,255,255,0.4);
      cursor: pointer;
      transition: all 0.2s;
    }
    .toggle button.active {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: #fff;
    }
    .slider {
      width: 100%;
      -webkit-appearance: none;
      height: 4px;
      border-radius: 2px;
      background: rgba(255,255,255,0.15);
      outline: none;
    }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      cursor: pointer;
    }
    .slider.small {
      width: 80px;
    }
    .stops {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 0.8rem;
    }
    .stop-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .color-picker {
      width: 36px;
      height: 36px;
      border: 2px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      padding: 2px;
      cursor: pointer;
      background: none;
    }
    .color-picker::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    .color-picker::-webkit-color-swatch {
      border: none;
      border-radius: 6px;
    }
    .stop-info {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .stop-hex {
      font-family: 'Inter', monospace;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.5);
      min-width: 65px;
    }
    .stop-offset {
      font-family: 'Inter', sans-serif;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.4);
      min-width: 30px;
    }
    .remove-stop {
      background: none;
      border: none;
      color: rgba(255,255,255,0.2);
      cursor: pointer;
      font-size: 0.8rem;
      padding: 4px;
    }
    .remove-stop:hover {
      color: #ff6b6b;
    }
    .add-stop {
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      border: 1px dashed rgba(255,255,255,0.15);
      background: transparent;
      color: rgba(255,255,255,0.4);
      cursor: pointer;
      width: 100%;
      transition: all 0.2s;
    }
    .add-stop:hover {
      border-color: rgba(102,126,234,0.4);
      color: #667eea;
    }
  `],
})
export class Gradient implements AfterViewInit {
  config = signal<GradientConfig>({ type: 'linear', angle: 135, stops: [] });
  copied = false;

  protected cssOutput = () => this.colorService.gradientCss(this.config());

  constructor(private colorService: ColorService) {}

  ngAfterViewInit() {
    this.config.set(this.colorService.defaultGradient());

    gsap.from('.controls-section > *', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power3.out',
    });
  }

  setType(type: 'linear' | 'radial') {
    this.config.update(c => ({ ...c, type }));
  }

  setAngle(angle: number) {
    this.config.update(c => ({ ...c, angle }));
  }

  updateStop(idx: number, key: 'color' | 'offset', value: string | number) {
    this.config.update(c => ({
      ...c,
      stops: c.stops.map((s, i) => i === idx ? { ...s, [key]: value } : s),
    }));
  }

  addStop() {
    this.config.update(c => {
      const lastOffset = c.stops.length > 0 ? c.stops[c.stops.length - 1].offset : 0;
      const newOffset = Math.min(lastOffset + 20, 100);
      return {
        ...c,
        stops: [...c.stops, { color: this.colorService.randomHex(), offset: newOffset }],
      };
    });
  }

  removeStop(idx: number) {
    this.config.update(c => ({
      ...c,
      stops: c.stops.filter((_, i) => i !== idx),
    }));
  }

  async copyCss() {
    try {
      await navigator.clipboard.writeText(this.cssOutput());
      this.copied = true;
      setTimeout(() => (this.copied = false), 1500);
    } catch {
      // fallback
    }
  }
}
