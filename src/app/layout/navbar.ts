import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar" #navbar>
      <a routerLink="/" class="logo">
        <span class="logo-icon">◈</span>
        <span class="logo-text">Palette</span>
      </a>

      <div class="links">
        <a
          routerLink="/palette"
          routerLinkActive="active"
          class="link"
          #links
        >
          Paletas
        </a>
        <a
          routerLink="/gradient"
          routerLinkActive="active"
          class="link"
          #links
        >
          Gradientes
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background: rgba(15,12,41,0.6);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: #fff;
    }
    .logo-icon {
      font-size: 1.5rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .logo-text {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      font-weight: 700;
    }
    .links {
      display: flex;
      gap: 2rem;
    }
    .link {
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.5);
      text-decoration: none;
      padding: 0.4rem 0;
      position: relative;
      transition: color 0.2s;
    }
    .link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transition: width 0.3s;
    }
    .link:hover, .link.active {
      color: rgba(255,255,255,0.9);
    }
    .link:hover::after, .link.active::after {
      width: 100%;
    }
  `],
})
export class Navbar implements AfterViewInit {
  private elementRef = inject(ElementRef);

  ngAfterViewInit() {
    gsap.from(this.elementRef.nativeElement.querySelector('.navbar'), {
      y: -40,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }
}
