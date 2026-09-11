import { Service } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { mock } from 'vitest-mock-extended';

import {
  DESKTOP_CLIENT_TOKEN,
  provideDesktopClient,
  withCustomElectronAPI
} from '../desktop-client';
import { ELECTRON_API_TOKEN, ElectronClient } from '../electron-client';

import type { IElectronAPI } from '../../types/interface';

describe('desktop client', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('default configuration', () => {
    test('should provide electron client for DESKTOP_CLIENT_TOKEN', () => {
      const mockedElectronAPI = mock<IElectronAPI>();

      vi.stubGlobal('electron', mockedElectronAPI);

      TestBed.configureTestingModule({ providers: [provideDesktopClient()] });

      expect(TestBed.inject(DESKTOP_CLIENT_TOKEN)).toBeInstanceOf(
        ElectronClient
      );
      expect(TestBed.inject(ELECTRON_API_TOKEN)).toBe(mockedElectronAPI);
    });
  });

  describe('custom configuration', () => {
    test('should provide the electron api from a factory', () => {
      const mockedElectronAPI = mock<IElectronAPI>();

      TestBed.configureTestingModule({
        providers: [
          provideDesktopClient(
            withCustomElectronAPI({ useFactory: () => mockedElectronAPI })
          )
        ]
      });

      expect(TestBed.inject(ELECTRON_API_TOKEN)).toBe(mockedElectronAPI);
    });

    test('should provide the electron api from value', () => {
      @Service()
      class FakeElectronAPI implements IElectronAPI {
        get<T>(): Promise<T> {
          return Promise.resolve() as never;
        }
        post<T>(): Promise<T> {
          return Promise.resolve() as never;
        }
        put<T>(): Promise<T> {
          return Promise.resolve() as never;
        }
        patch<T>(): Promise<T> {
          return Promise.resolve() as never;
        }
        delete<T>(): Promise<T> {
          return Promise.resolve() as never;
        }
      }

      TestBed.configureTestingModule({
        providers: [
          provideDesktopClient(
            withCustomElectronAPI({ useClass: FakeElectronAPI })
          )
        ]
      });

      expect(TestBed.inject(ELECTRON_API_TOKEN)).toBeInstanceOf(
        FakeElectronAPI
      );
    });
  });
});
