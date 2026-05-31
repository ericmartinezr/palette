import { Component, signal, output, AfterViewInit, ElementRef, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ColorPalette } from '../models/types';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-saved-colors',
  template: `
    <div class="saved-panel" #panel>
      <h3 class="title">Guardadas</h3>

      @if (palettes().length === 0) {
        <p class="empty">Aún no has guardado ninguna paleta</p>
      }

      <div class="list">
        @for (p of palettes(); track p.id) {
          <div class="palette-item" #items>
            <div class="palette-info">
              <span class="palette-name">{{ p.name }}</span>
              <span class="palette-type">{{ p.type }}</span>
            </div>
            <div class="mini-colors">
              @for (c of p.colors; track c) {
                <span class="mini-dot" [style.background]="c" [attr.aria-label]="c"></span>
              }
            </div>
            <button class="delete-btn" (click)="removePalette(p.id)" [attr.aria-label]="'Eliminar ' + p.name">✕</button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .saved-panel {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      padding: 1.5rem;
    }
    .title {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: rgba(255,255,255,0.9);
    }
    .empty {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.4);
      font-style: italic;
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .palette-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      background: rgba(255,255,255,0.04);
      border-radius: 12px;
      transition: background 0.2s;
    }
    .palette-item:hover {
      background: rgba(255,255,255,0.08);
    }
    .palette-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .palette-name {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(255,255,255,0.8);
    }
    .palette-type {
      font-size: 0.7rem;
      color: rgba(255,255,255,0.4);
      text-transform: capitalize;
    }
    .mini-colors {
      display: flex;
      gap: 4px;
    }
    .mini-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .delete-btn {
      background: none;
      border: none;
      color: rgba(255,255,255,0.3);
      cursor: pointer;
      font-size: 0.8rem;
      padding: 4px;
      border-radius: 50%;
      transition: color 0.2s, background 0.2s;
    }
    .delete-btn:hover {
      color: #ff6b6b;
      background: rgba(255,107,107,0.1);
    }
  `],
})
export class SavedColors implements AfterViewInit {
  palettes = signal<ColorPalette[]>([]);
  paletteDeleted = output<string>();
  private storage = inject(StorageService);

  constructor() {
    this.palettes.set(this.storage.getPalettes());
  }

  ngAfterViewInit() {
    gsap.from('.saved-panel', {
      opacity: 0,
      x: 30,
      duration: 0.6,
      ease: 'power3.out',
    });
  }

  removePalette(id: string) {
    this.storage.deletePalette(id);
    this.palettes.set(this.storage.getPalettes());
    this.paletteDeleted.emit(id);
  }
}
