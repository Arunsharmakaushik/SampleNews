import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParams = {
  splash: undefined;
  getStarted: undefined;
  createProfile: undefined;
  mainStack: NavigatorScreenParams<DrawerStackParams>;
};

export type AuthStackParams = {
  login: undefined;
};

export type DrawerStackParams = {
  home: undefined;
  categories: undefined;
  bookmarks: undefined;
  about: undefined;
  ourapp: undefined;
  search: undefined;
  newsArticle: {id: string};
  profile: undefined;
};
