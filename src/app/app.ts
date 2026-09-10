import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { DESKTOP_CLIENT_TOKEN } from '../service/desktop-client';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly desktopClient = inject(DESKTOP_CLIENT_TOKEN);

  url = signal('mh-portal');

  resource = rxResource({
    params: () => ({ url: this.url(), body: { count: 1, name: 'Bob' } }),
    stream: (resource) =>
      this.desktopClient.post(resource.params.url, resource.params.body)
  });
}
