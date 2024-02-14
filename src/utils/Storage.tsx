import {observable, ObservableObject} from '@legendapp/state';
import {
  configureObservablePersistence,
  persistObservable,
} from '@legendapp/state/persist';
import {ObservablePersistMMKV} from '@legendapp/state/persist-plugins/mmkv';
import {User} from '../typings/common';

// Global configuration
configureObservablePersistence({
  pluginLocal: ObservablePersistMMKV,
});

interface Storage {
  bookmarks?: string[];
  isOnboarded: boolean;
  user: User | null;
  userId: string | null;
  // getters
  getBookmarks: () => string[] | undefined;
  getIsOnBoarded: () => boolean | undefined;
  getUser: () => User;
  getUserId: () => string | undefined;

  // setters
  setBookmarks: (id: string) => void;
  setIsOnBoarded: (isOnboarded: boolean) => void;
  updateBookmarks: (updatedBookmarks: string[]) => void;
  setUser: (user: User) => void;
  setUserId: (id: string) => void;
}

export const storage = observable<Storage>({
  bookmarks: [],
  isOnboarded: false,
  user: null,
  userId: null,

  // getters
  getBookmarks: () => storage.bookmarks.get(),
  getIsOnBoarded: () => storage.isOnboarded?.get(),
  getUser: () => storage.user?.get(),
  getUserId: () => storage.userId.get(),

  // setters
  setBookmarks: (id: string) => {
    storage.bookmarks.set([...storage.bookmarks.get(), id]);
  },
  updateBookmarks: (updatedBookmarks: string[]) => {
    storage.bookmarks.set(updatedBookmarks);
  },
  setIsOnBoarded: (isOnboarded: boolean) =>
    storage.isOnboarded?.set?.(isOnboarded),
  setUser: (user: User) => storage.user?.set(user),
  setUserId: (id: string) => storage.userId?.set(id),
}) as ObservableObject<Storage>;

persistObservable(storage, {
  local: 'store',
});
