import { Injectable } from '@angular/core';
import { PaletteType, GradientConfig, GradientStop } from '../models/types';

@Injectable({ providedIn: 'root' })
export class ColorService {
  randomHex(): string {
    const hue = Math.floor(Math.random() * 360);
    const sat = 55 + Math.floor(Math.random() * 30);
    const lit = 40 + Math.floor(Math.random() * 30);
    return this.hslToHex(hue, sat, lit);
  }

  hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  hexToHsl(hex: string): { h: number; s: number; l: number } {
    let r = 0, g = 0, b = 0;
    const h = hex.replace('#', '');
    r = parseInt(h.substring(0, 2), 16) / 255;
    g = parseInt(h.substring(2, 4), 16) / 255;
    b = parseInt(h.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let hDeg = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: hDeg = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
        case g: hDeg = ((b - r) / d + 2) * 60; break;
        case b: hDeg = ((r - g) / d + 4) * 60; break;
      }
    }
    return { h: Math.round(hDeg), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  generatePalette(type: PaletteType, baseHue?: number): string[] {
    const hue = baseHue ?? Math.floor(Math.random() * 360);
    const sat = 60 + Math.floor(Math.random() * 15);
    const lit = 45 + Math.floor(Math.random() * 15);

    if (type === 'random') {
      return Array.from({ length: 5 }, () => this.randomHex());
    }

    const hues = this.getHarmonyHues(type, hue);
    return hues.map(h => this.hslToHex(h, sat + Math.floor(Math.random() * 10 - 5), lit + Math.floor(Math.random() * 10 - 5)));
  }

  private getHarmonyHues(type: PaletteType, base: number): number[] {
    switch (type) {
      case 'analogous':
        return [base - 30, base, base + 30, base + 60].map(this.normalizeHue);
      case 'complementary':
        return [base, base + 180, base + 15, base + 195].map(this.normalizeHue);
      case 'triadic':
        return [base, base + 120, base + 240, base + 60].map(this.normalizeHue);
      case 'split-complementary':
        return [base, base + 150, base + 210, base + 30].map(this.normalizeHue);
      case 'square':
        return [base, base + 90, base + 180, base + 270].map(this.normalizeHue);
      case 'tetradic':
        return [base, base + 60, base + 180, base + 240].map(this.normalizeHue);
      default:
        return [base, base + 72, base + 144, base + 216, base + 288].map(this.normalizeHue);
    }
  }

  private normalizeHue(h: number): number {
    return ((h % 360) + 360) % 360;
  }

  defaultGradient(): GradientConfig {
    return {
      type: 'linear',
      angle: 135,
      stops: [
        { color: '#667eea', offset: 0 },
        { color: '#764ba2', offset: 100 },
      ],
    };
  }

  gradientCss(config: GradientConfig): string {
    const stops = config.stops
      .sort((a, b) => a.offset - b.offset)
      .map(s => `${s.color} ${s.offset}%`)
      .join(', ');

    if (config.type === 'radial') {
      return `radial-gradient(circle at center, ${stops})`;
    }
    return `linear-gradient(${config.angle}deg, ${stops})`;
  }
}
