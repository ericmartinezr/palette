import { Component, signal, AfterViewInit, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ColorService } from '../services/color.service';
import { StorageService } from '../services/storage.service';
import { PaletteType, PALETTE_TYPE_LABELS, ColorPalette } from '../models/types';
import { ColorCard } from '../components/color-card';

@Component({
  selector: 'app-palette',
  imports: [ColorCard],
  template: `
    <div class="page" #page>
      <div class="header">
        <h1 class="title">Generador de paletas</h1>
        <p class="desc">Elige un tipo de armonía y genera combinaciones únicas.</p>
      </div>

      <div class="type-picker" #picker>
        @for (t of types; track t) {
          <button
            class="type-btn"
            [class.active]="t === selectedType()"
            (click)="selectType(t)"
          >
            {{ PALETTE_TYPE_LABELS[t] }}
          </button>
        }
      </div>

      <div class="actions-bar">
        <button class="btn primary" (click)="generate()">
          ✦ Generar
        </button>
        <button class="btn secondary" (click)="randomize()">
          🎲 Aleatorio
        </button>
        <button class="btn save" (click)="save()">
          💾 Guardar
        </button>
      </div>

      @if (savedMessage()) {
        <div class="toast">{{ savedMessage() }}</div>
      }

      <div class="palette-grid" #grid>
        @for (c of colors(); track c; let i = $index) {
          <app-color-card [color]="c" [index]="i" />
        }
      </div>
    </div>
  `,
  styles: [`
    .page {
      max-width: 900px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }
    .header {
      margin-bottom: 2rem;
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
    .type-picker {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 2rem;
    }
    .type-btn {
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.5);
      cursor: pointer;
      transition: all 0.2s;
    }
    .type-btn:hover {
      background: rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.8);
    }
    .type-btn.active {
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-color: transparent;
      color: #fff;
    }
    .actions-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    .btn {
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0.7rem 1.5rem;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn:hover {
      transform: translateY(-2px);
    }
    .btn.primary {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: #fff;
      box-shadow: 0 4px 15px rgba(102,126,234,0.3);
    }
    .btn.secondary {
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.7);
      border: 1px solid rgba(255,255,255,0.12);
    }
    .btn.save {
      background: rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.8);
      margin-left: auto;
    }
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 16px;
    }
    .toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.15);
      padding: 0.75rem 1.5rem;
      border-radius: 999px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: #fff;
      z-index: 200;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(-50%) translateY(10px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  `],
})
export class Palette implements AfterViewInit {
  protected readonly PALETTE_TYPE_LABELS = PALETTE_TYPE_LABELS;
  protected readonly types: PaletteType[] = [
    'analogous', 'complementary', 'triadic',
    'split-complementary', 'square', 'tetradic', 'random',
  ];

  selectedType = signal<PaletteType>('analogous');
  colors = signal<string[]>([]);
  savedMessage = signal('');

  constructor(
    private colorService: ColorService,
    private storage: StorageService,
  ) {}

  ngAfterViewInit() {
    this.generate();
  }

  selectType(t: PaletteType) {
    this.selectedType.set(t);
    this.generate();
  }

  generate() {
    this.colors.set(this.colorService.generatePalette(this.selectedType()));
  }

  randomize() {
    const types: PaletteType[] = [
      'analogous', 'complementary', 'triadic',
      'split-complementary', 'square', 'tetradic', 'random',
    ];
    const t = types[Math.floor(Math.random() * types.length)];
    this.selectedType.set(t);
    this.colors.set(this.colorService.generatePalette(t));
  }

  save() {
    const palette: ColorPalette = {
      id: crypto.randomUUID(),
      name: `Paleta ${PALETTE_TYPE_LABELS[this.selectedType()]}`,
      colors: this.colors(),
      type: this.selectedType(),
      createdAt: Date.now(),
    };
    this.storage.savePalette(palette);
    this.savedMessage.set('✓ Paleta guardada');
    setTimeout(() => this.savedMessage.set(''), 2000);
  }
}
