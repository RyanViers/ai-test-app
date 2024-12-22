import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = signal<boolean>(false);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      this.darkMode.set(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));
      this.updateTheme();
    }
  }

  isDarkMode() {
    return this.darkMode;
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.darkMode.update(dark => !dark);
      this.updateTheme();
    }
  }

  private updateTheme() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.darkMode()) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}
