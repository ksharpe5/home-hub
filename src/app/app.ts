import { Component, signal } from '@angular/core';
import { Layout } from "./layout/layout";

@Component({
  selector: 'app-root',
  imports: [Layout],
  template: `
    <app-layout/>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('home-hub');
}
