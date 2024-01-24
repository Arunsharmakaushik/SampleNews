import {observable, ObservableObject} from '@legendapp/state';
import {
  configureObservablePersistence,
  persistObservable,
} from '@legendapp/state/persist';
import {ObservablePersistMMKV} from '@legendapp/state/persist-plugins/mmkv';

// Global configuration
configureObservablePersistence({
  pluginLocal: ObservablePersistMMKV,
});

interface Storage {
  //   authenticated?: boolean;
  //   token?: string;
  isOnboarded: boolean;
  // getters
  //   getAuthenticated: () => boolean | undefined;
  //   getToken: () => string | undefined;
  getIsOnBoarded: () => boolean | undefined;
  // setters
  //   setAuthenticated: (authenticated: boolean) => void;
  //   setToken: (token: string) => void;
  setIsOnBoarded: (isOnboarded: boolean) => void;
}

export const storage = observable<Storage>({
  //   authenticated: false,
  //   token: '',``
  isOnboarded: false,
  // getters
  //   getAuthenticated: () => storage.authenticated?.get(),
  //   getToken: () => storage.token?.get(),
  getIsOnBoarded: () => storage.isOnboarded?.get(),
  // setters
  //   setAuthenticated: (authenticated: boolean) =>
  //     storage.authenticated?.set?.(authenticated),
  //   setToken: (token: string) => storage.token?.set?.(token),
  setIsOnBoarded: (isOnboarded: boolean) =>
    storage.isOnboarded?.set?.(isOnboarded),
}) as ObservableObject<Storage>;

persistObservable(storage, {
  local: 'store',
});
