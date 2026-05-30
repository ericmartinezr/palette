import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="hero">
      <div class="orb o1"></div>
      <div class="orb o2"></div>
      <div class="orb o3"></div>

      <div class="content" #content>
        <div class="badge" #badge>✨ Herramienta visual</div>

        <h1 class="title" #title>
          <span class="gradient-text">Paletas</span> que
          <br>inspiran
        </h1>

        <p class="subtitle" #subtitle>
          Genera combinaciones de color armoniosas, crea gradientes
          impresionantes y guarda tus paletas favoritas.
        </p>

        <div class="actions" #actions>
          <a routerLink="/palette" class="btn primary">
            Generar paletas
          </a>
          <a routerLink="/gradient" class="btn secondary">
            Crear gradientes
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      padding: 2rem;
    }
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      pointer-events: none;
    }
    .o1 {
      width: 600px; height: 600px;
      background: #667eea;
      opacity: 0.15;
      top: -200px; right: -100px;
    }
    .o2 {
      width: 500px; height: 500px;
      background: #764ba2;
      opacity: 0.12;
      bottom: -150px; left: -100px;
    }
    .o3 {
      width: 300px; height: 300px;
      background: #f093fb;
      opacity: 0.08;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
    }
    .content {
      text-align: center;
      max-width: 700px;
      position: relative;
      z-index: 1;
    }
    .badge {
      display: inline-block;
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.6);
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 0.4rem 1rem;
      border-radius: 999px;
      margin-bottom: 2rem;
    }
    .title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 700;
      line-height: 1.15;
      margin-bottom: 1.5rem;
      color: #fff;
    }
    .gradient-text {
      background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .subtitle {
      font-family: 'Inter', sans-serif;
      font-size: clamp(0.95rem, 2vw, 1.1rem);
      color: rgba(255,255,255,0.5);
      line-height: 1.7;
      margin-bottom: 2.5rem;
      max-width: 520px;
      margin-left: auto;
      margin-right: auto;
    }
    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn {
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      padding: 0.85rem 2rem;
      border-radius: 999px;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn:hover {
      transform: translateY(-2px);
    }
    .primary {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: #fff;
      box-shadow: 0 4px 20px rgba(102,126,234,0.3);
    }
    .primary:hover {
      box-shadow: 0 8px 30px rgba(102,126,234,0.4);
    }
    .secondary {
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.7);
      border: 1px solid rgba(255,255,255,0.12);
    }
    .secondary:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
    }
  `],
})
export class Home implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const el = this.elementRef.nativeElement;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(el.querySelector('.badge'), { opacity: 0, y: 20, duration: 0.5 }, 0.2)
      .from(el.querySelector('.title'), { opacity: 0, y: 30, duration: 0.7 }, 0.4)
      .from(el.querySelector('.subtitle'), { opacity: 0, y: 20, duration: 0.6 }, 0.6)
      .from(el.querySelectorAll('.btn'), { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, 0.8);

    gsap.to(el.querySelectorAll('.orb'), {
      scale: 1.1,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}
