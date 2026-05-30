import { Injectable } from '@angular/core';
import { ColorPalette } from '../models/types';

const STORAGE_KEY = 'palette-saved';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getPalettes(): ColorPalette[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  savePalette(palette: ColorPalette): void {
    const list = this.getPalettes();
    list.unshift(palette);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  deletePalette(id: string): void {
    const list = this.getPalettes().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}
