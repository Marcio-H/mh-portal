import {
  type EnvironmentProviders,
  type Provider,
  type Type
} from '@angular/core';
import { InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { type Observable } from 'rxjs';
import { ELECTRON_API_TOKEN, ElectronClient } from './electron-client';
import { type IElectronAPI } from '../types/interface';

export interface DesktopClient {
  get<T>(url: string): Observable<T>;
  post<T>(url: string, data: unknown): Observable<T>;
  put<T>(url: string, body: unknown): Observable<T>;
  patch<T>(url: string, body: unknown): Observable<T>;
  delete<T>(url: string): Observable<T>;
}

export const DESKTOP_CLIENT_TOKEN = new InjectionToken<DesktopClient>(
  'DesktopClient'
);

export type IElectronAPIProvider = () => Provider;

export function withCustomElectronAPI(electronAPIFactory: {
  useFactory: () => IElectronAPI;
}): IElectronAPIProvider;
export function withCustomElectronAPI(electronAPIClass: {
  useClass: Type<IElectronAPI>;
}): IElectronAPIProvider;
export function withCustomElectronAPI(
  electronAPIProviderConfiguration:
    { useFactory: () => IElectronAPI } | { useClass: Type<IElectronAPI> }
): IElectronAPIProvider {
  return () => ({
    provide: ELECTRON_API_TOKEN,
    ...electronAPIProviderConfiguration
  });
}

export function provideDesktopClient(): EnvironmentProviders;
export function provideDesktopClient(
  customProvider: IElectronAPIProvider
): EnvironmentProviders;
export function provideDesktopClient(
  customProvider?: IElectronAPIProvider
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: DESKTOP_CLIENT_TOKEN, useClass: ElectronClient },
    customProvider
      ? customProvider()
      : { provide: ELECTRON_API_TOKEN, useFactory: () => window.electron }
  ]);
}
