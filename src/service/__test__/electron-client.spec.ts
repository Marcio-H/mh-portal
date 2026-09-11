import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { firstValueFrom } from 'rxjs';
import { captor, mock, mockReset } from 'vitest-mock-extended';

import { ELECTRON_API_TOKEN, ElectronClient } from '../electron-client';

import type { MockProxy } from 'vitest-mock-extended';

import type { IElectronAPI } from '../../types/interface';

describe('electron client', () => {
  let client: ElectronClient;
  let api: MockProxy<IElectronAPI>;

  beforeAll(() => {
    api = mock<IElectronAPI>();

    TestBed.configureTestingModule({
      providers: [
        ElectronClient,
        { provide: ELECTRON_API_TOKEN, useValue: api }
      ]
    });

    client = TestBed.inject(ElectronClient);
  });

  beforeEach(() => {
    mockReset(api);
  });

  test('test should be configurated', () => {
    expect(client).not.toBeNull();
    expect(client).toBeInstanceOf(ElectronClient);
  });

  describe('get', () => {
    test('should delegate to the electron api', async () => {
      const url = faker.internet.url();
      const output = {
        [faker.word.adjective({ length: { min: 3, max: 15 } })]:
          faker.helpers.maybe(() => faker.datatype.boolean())
      };

      api.get.calledWith(url).mockReturnValue(Promise.resolve(output));

      const result = await firstValueFrom(client.get(url));

      expect(result).toStrictEqual(output);
    });

    test('should not call the electron api when subscribe was not called', () => {
      const url = faker.internet.url();

      api.get.mockReturnValue(Promise.resolve());

      client.get(url);

      expect(api.get).not.toHaveBeenCalled();
    });
  });

  describe('post', () => {
    test('should delegate to the electron api', async () => {
      const url = faker.internet.url();
      const input = {
        [faker.word.verb({ length: { min: 3, max: 15 } })]: faker.helpers.maybe(
          () => faker.datatype.boolean()
        )
      };
      const output = {
        [faker.word.adjective({ length: { min: 3, max: 15 } })]:
          faker.helpers.maybe(() => faker.datatype.boolean())
      };
      const inputCaptor = captor<typeof input>();

      api.post
        .calledWith(url, inputCaptor)
        .mockReturnValue(Promise.resolve(output));

      const result = await firstValueFrom(client.post(url, input));

      expect(result).toStrictEqual(output);
      expect(inputCaptor.value).toStrictEqual(input);
    });

    test('should not call the electron api when subscribe was not called', () => {
      const url = faker.internet.url();
      const input = {
        [faker.word.verb({ length: { min: 3, max: 15 } })]: faker.helpers.maybe(
          () => faker.datatype.boolean()
        )
      };

      api.post.mockReturnValue(Promise.resolve());

      client.post(url, input);

      expect(api.post).not.toHaveBeenCalled();
    });
  });

  describe('put', () => {
    test('should delegate to the electron api', async () => {
      const url = faker.internet.url();
      const input = {
        [faker.word.verb({ length: { min: 3, max: 15 } })]: faker.helpers.maybe(
          () => faker.datatype.boolean()
        )
      };
      const output = {
        [faker.word.adjective({ length: { min: 3, max: 15 } })]:
          faker.helpers.maybe(() => faker.datatype.boolean())
      };
      const inputCaptor = captor<typeof input>();

      api.put
        .calledWith(url, inputCaptor)
        .mockReturnValue(Promise.resolve(output));

      const result = await firstValueFrom(client.put(url, input));

      expect(result).toStrictEqual(output);
      expect(inputCaptor.value).toStrictEqual(input);
    });

    test('should not call the electron api when subscribe was not called', () => {
      const url = faker.internet.url();
      const input = {
        [faker.word.verb({ length: { min: 3, max: 15 } })]: faker.helpers.maybe(
          () => faker.datatype.boolean()
        )
      };

      api.put.mockReturnValue(Promise.resolve());

      client.put(url, input);

      expect(api.put).not.toHaveBeenCalled();
    });
  });

  describe('patch', () => {
    test('should delegate to the electron api', async () => {
      const url = faker.internet.url();
      const input = {
        [faker.word.verb({ length: { min: 3, max: 15 } })]: faker.helpers.maybe(
          () => faker.datatype.boolean()
        )
      };
      const output = {
        [faker.word.adjective({ length: { min: 3, max: 15 } })]:
          faker.helpers.maybe(() => faker.datatype.boolean())
      };
      const inputCaptor = captor<typeof input>();

      api.patch
        .calledWith(url, inputCaptor)
        .mockReturnValue(Promise.resolve(output));

      const result = await firstValueFrom(client.patch(url, input));

      expect(result).toStrictEqual(output);
      expect(inputCaptor.value).toStrictEqual(input);
    });

    test('should not call the electron api when subscribe was not called', () => {
      const url = faker.internet.url();
      const input = {
        [faker.word.verb({ length: { min: 3, max: 15 } })]: faker.helpers.maybe(
          () => faker.datatype.boolean()
        )
      };

      api.patch.mockReturnValue(Promise.resolve());

      client.patch(url, input);

      expect(api.patch).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    test('should delegate to the electron api', async () => {
      const url = faker.internet.url();
      const output = {
        [faker.word.adjective({ length: { min: 3, max: 15 } })]:
          faker.helpers.maybe(() => faker.datatype.boolean())
      };

      api.delete.calledWith(url).mockReturnValue(Promise.resolve(output));

      const result = await firstValueFrom(client.delete(url));

      expect(result).toStrictEqual(output);
    });

    test('should not call the electron api when subscribe was not called', () => {
      const url = faker.internet.url();

      api.delete.mockReturnValue(Promise.resolve());

      client.delete(url);

      expect(api.delete).not.toHaveBeenCalled();
    });
  });
});
