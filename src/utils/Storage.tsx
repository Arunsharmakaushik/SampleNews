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
  bookmarks?: string[];
  isOnboarded: boolean;
  // getters
  getBookmarks: () => string[] | undefined;
  getIsOnBoarded: () => boolean | undefined;
  // setters
  setBookmarks: (id: string) => void;
  setIsOnBoarded: (isOnboarded: boolean) => void;
  updateBookmarks: (updatedBookmarks: string[]) => void;
}

export const storage = observable<Storage>({
  bookmarks: [],
  isOnboarded: false,

  // getters
  getBookmarks: () => storage.bookmarks.get(),
  getIsOnBoarded: () => storage.isOnboarded?.get(),

  // setters
  //   setAuthenticated: (authenticated: boolean) =>
  //     storage.authenticated?.set?.(authenticated),
  //   setToken: (token: string) => storage.token?.set?.(token),
  setBookmarks: (id: string) => {
    storage.bookmarks.set([...storage.bookmarks.get(), id]);
  },
  updateBookmarks: (updatedBookmarks: string[]) => {
    storage.bookmarks.set(updatedBookmarks);
  },
  setIsOnBoarded: (isOnboarded: boolean) =>
    storage.isOnboarded?.set?.(isOnboarded),
}) as ObservableObject<Storage>;

persistObservable(storage, {
  local: 'store',
});
