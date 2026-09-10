import { inject, InjectionToken, Service } from '@angular/core';
import { defer, from } from 'rxjs';

import type { Observable } from 'rxjs';

import type { DesktopClient } from './desktop-client';
import type { IElectronAPI } from '../types/interface';

export const ELECTRON_API_TOKEN = new InjectionToken<IElectronAPI>(
  'electronAPI'
);

@Service()
export class ElectronClient implements DesktopClient {
  private readonly api = inject(ELECTRON_API_TOKEN);

  get<T>(url: string): Observable<T> {
    return defer(() => from(this.api.get<T>(url)));
  }

  post<T>(url: string, data: unknown): Observable<T> {
    return defer(() => from(this.api.post<T>(url, data)));
  }

  put<T>(url: string, body: unknown): Observable<T> {
    return defer(() => from(this.api.put<T>(url, body)));
  }

  patch<T>(url: string, body: unknown): Observable<T> {
    return defer(() => from(this.api.patch<T>(url, body)));
  }

  delete<T>(url: string): Observable<T> {
    return defer(() => from(this.api.delete<T>(url)));
  }
}
