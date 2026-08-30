import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DESKTOP_CLIENT_TOKEN } from '../service/desktop-client';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  url = signal('mh-portal');

  private readonly desktopClient = inject(DESKTOP_CLIENT_TOKEN);

  resource = rxResource({params: () => ({ url: this.url(), body: { count: 1, name: 'Bob' }}), stream: resource => this.desktopClient.post(resource.params.url, resource.params.body) });
}
