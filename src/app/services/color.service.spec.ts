import { ColorService } from './color.service';

describe('ColorService', () => {
  let service: ColorService;

  beforeEach(() => {
    service = new ColorService();
  });

  describe('hslToHex', () => {
    it('should convert HSL to hex string', () => {
      expect(service.hslToHex(0, 100, 50)).toBe('#ff0000');
      expect(service.hslToHex(120, 100, 50)).toBe('#00ff00');
      expect(service.hslToHex(240, 100, 50)).toBe('#0000ff');
    });

    it('should handle grayscale', () => {
      expect(service.hslToHex(0, 0, 0)).toBe('#000000');
      expect(service.hslToHex(0, 0, 100)).toBe('#ffffff');
      expect(service.hslToHex(0, 0, 50)).toBe('#808080');
    });
  });

  describe('hexToHsl', () => {
    it('should convert hex to HSL', () => {
      const red = service.hexToHsl('#ff0000');
      expect(red.h).toBe(0);
      expect(red.s).toBe(100);
      expect(red.l).toBe(50);
    });

    it('should handle black and white', () => {
      const black = service.hexToHsl('#000000');
      expect(black.h).toBe(0);
      expect(black.s).toBe(0);
      expect(black.l).toBe(0);

      const white = service.hexToHsl('#ffffff');
      expect(white.h).toBe(0);
      expect(white.s).toBe(0);
      expect(white.l).toBe(100);
    });

    it('should be approximately reversible for many colors', () => {
      const colors = ['#667eea', '#764ba2', '#f093fb', '#ff6b6b', '#4ecdc4'];
      for (const hex of colors) {
        const hsl = service.hexToHsl(hex);
        const result = service.hslToHex(hsl.h, hsl.s, hsl.l);
        const origR = parseInt(hex.slice(1, 3), 16);
        const origG = parseInt(hex.slice(3, 5), 16);
        const origB = parseInt(hex.slice(5, 7), 16);
        const resR = parseInt(result.slice(1, 3), 16);
        const resG = parseInt(result.slice(3, 5), 16);
        const resB = parseInt(result.slice(5, 7), 16);
        expect(Math.abs(origR - resR)).toBeLessThanOrEqual(2);
        expect(Math.abs(origG - resG)).toBeLessThanOrEqual(2);
        expect(Math.abs(origB - resB)).toBeLessThanOrEqual(2);
      }
    });
  });

  describe('randomHex', () => {
    it('should return a valid hex color', () => {
      const hex = service.randomHex();
      expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should generate different values on successive calls', () => {
      const results = new Set(Array.from({ length: 20 }, () => service.randomHex()));
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe('generatePalette', () => {
    it('should return 5 colors for random type', () => {
      const palette = service.generatePalette('random');
      expect(palette).toHaveLength(5);
    });

    it('should return valid hex colors', () => {
      const types = ['analogous', 'complementary', 'triadic', 'split-complementary', 'square', 'tetradic'] as const;
      for (const type of types) {
        const palette = service.generatePalette(type, 200);
        expect(palette).toHaveLength(4);
        for (const color of palette) {
          expect(color).toMatch(/^#[0-9a-f]{6}$/);
        }
      }
    });

    it('should produce valid hex colors with a given baseHue', () => {
      const palette = service.generatePalette('analogous', 180);
      for (const color of palette) {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      }
    });
  });

  describe('defaultGradient', () => {
    it('should return a linear gradient with 2 stops', () => {
      const g = service.defaultGradient();
      expect(g.type).toBe('linear');
      expect(g.angle).toBe(135);
      expect(g.stops).toHaveLength(2);
    });
  });

  describe('gradientCss', () => {
    it('should generate linear-gradient CSS', () => {
      const css = service.gradientCss({
        type: 'linear',
        angle: 90,
        stops: [{ color: '#ff0000', offset: 0 }, { color: '#0000ff', offset: 100 }],
      });
      expect(css).toBe('linear-gradient(90deg, #ff0000 0%, #0000ff 100%)');
    });

    it('should generate radial-gradient CSS', () => {
      const css = service.gradientCss({
        type: 'radial',
        angle: 0,
        stops: [{ color: '#fff', offset: 0 }, { color: '#000', offset: 100 }],
      });
      expect(css).toBe('radial-gradient(circle at center, #fff 0%, #000 100%)');
    });

    it('should sort stops by offset', () => {
      const css = service.gradientCss({
        type: 'linear',
        angle: 0,
        stops: [
          { color: '#000', offset: 100 },
          { color: '#fff', offset: 0 },
        ],
      });
      expect(css).toContain('#fff 0%');
      expect(css).toContain('#000 100%');
    });
  });
});
