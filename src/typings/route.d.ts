import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParams = {
  splash: undefined;
  getStarted: undefined;
  authStack: NavigatorScreenParams<AuthStackParams>;
  mainStack: NavigatorScreenParams<DrawerStackParams>;
};

export type AuthStackParams = {
  login: undefined;
};

export type DrawerStackParams = {
  home: undefined;
  categories: undefined;
  bookmarks: undefined;
  About: undefined;
  ourapp: undefined;
};
