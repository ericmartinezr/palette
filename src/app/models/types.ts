export type PaletteType =
  | 'analogous'
  | 'complementary'
  | 'triadic'
  | 'split-complementary'
  | 'square'
  | 'tetradic'
  | 'random';

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  type: PaletteType;
  createdAt: number;
}

export interface GradientStop {
  color: string;
  offset: number;
}

export interface GradientConfig {
  type: 'linear' | 'radial';
  angle: number;
  stops: GradientStop[];
}

export const PALETTE_TYPE_LABELS: Record<PaletteType, string> = {
  analogous: 'Análoga',
  complementary: 'Complementaria',
  triadic: 'Tríadica',
  'split-complementary': 'Complementaria dividida',
  square: 'Cuadrada',
  tetradic: 'Tetrádica',
  random: 'Aleatoria',
};
