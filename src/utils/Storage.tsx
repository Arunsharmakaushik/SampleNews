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
  recentSearches: string[];

  // getters
  getBookmarks: () => string[] | undefined;
  getIsOnBoarded: () => boolean | undefined;
  getUser: () => User;
  getUserId: () => string | undefined;
  getRecentSearches: () => string[] | undefined;

  // setters
  setIsOnBoarded: (isOnboarded: boolean) => void;
  setBookmarks: (updatedBookmarks: string[]) => void;
  setUser: (user: User) => void;
  setUserId: (id: string) => void;
  setRecentSearches: (recentSearches: string) => void;
}

export const storage = observable<Storage>({
  bookmarks: [],
  isOnboarded: false,
  user: null,
  userId: null,
  recentSearches: [],

  // getters
  getBookmarks: () => storage.bookmarks.get(),
  getIsOnBoarded: () => storage.isOnboarded?.get(),
  getUser: () => storage.user?.get(),
  getUserId: () => storage.userId.get(),
  getRecentSearches: () => storage.recentSearches.get(),

  // setters
  setBookmarks: (updatedBookmarks: string[]) => {
    storage.bookmarks.set(updatedBookmarks);
  },
  setIsOnBoarded: (isOnboarded: boolean) =>
    storage.isOnboarded?.set?.(isOnboarded),
  setUser: (user: User) => storage.user?.set(user),
  setUserId: (id: string) => storage.userId?.set(id),

  setRecentSearches: (recentSearches: string) =>
    storage.recentSearches.set([
      ...storage.recentSearches.get(),
      recentSearches,
    ]),
}) as ObservableObject<Storage>;

persistObservable(storage, {
  local: 'store',
});
