export interface IElectronAPI {
  post: <T>(url: string, data: unknown) => Promise<T>;
  get: <T>(url: string) => Promise<T>;
  put: <T>(url: string, data: unknown) => Promise<T>;
  patch: <T>(url: string, data: unknown) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
