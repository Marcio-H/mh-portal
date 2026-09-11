import { TestBed } from '@angular/core/testing';
import { mock } from 'vitest-mock-extended';

import { App } from './app';
import {
  provideDesktopClient,
  withCustomElectronAPI
} from '../service/desktop-client';

import type { StaticProvider } from '@angular/core';

import type { IElectronAPI } from '../types/interface';

function setup(providers: StaticProvider[] = []) {
  TestBed.configureTestingModule({
    providers: [
      provideDesktopClient(
        withCustomElectronAPI({ useFactory: () => mock<IElectronAPI>() })
      ),
      ...providers
    ]
  });

  const fixture = TestBed.createComponent(App);
  const component = fixture.componentInstance;

  return { fixture, component };
}

describe('App', () => {
  it('should create the app', () => {
    const { component } = setup();

    expect(component).toBeTruthy();
  });
});
