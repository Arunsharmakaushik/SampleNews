import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import About from '../screens/about';
import BookMarks from '../screens/bookmarks';
import Categories from '../screens/categories';
import GetStrated from '../screens/getStarted/GetStrated';
import Home from '../screens/home';
import Login from '../screens/login';
import Splash from '../screens/splash';
import {
  AuthStackParams,
  DrawerStackParams,
  RootStackParams,
} from '../typings/route';
import DrawerContent from './DrawerContent';
import HeadBar from '../components/headBar/HeadBar';
import Search from '../screens/search';
import NewsArticle from '../screens/newsArticle';
import Profile from '../screens/profile';

const RootStack = createNativeStackNavigator<RootStackParams>();
const Auth = createNativeStackNavigator<AuthStackParams>();
const Drawer = createDrawerNavigator<DrawerStackParams>();

function AuthStack() {
  return (
    <Auth.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}>
      <Auth.Screen name="login" component={Login} />
    </Auth.Navigator>
  );
}

const screenWithoutHeader: Array<keyof DrawerStackParams> = [
  'newsArticle',
  'search',
  'profile',
];

export const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={({route}) => ({
        headerShown: !screenWithoutHeader.includes(route.name),
        header: ({navigation}) => (
          <HeadBar
            currentScreenName={route.name}
            onBackPress={() => {
              navigation.goBack();
            }}
            onMenuPress={() => navigation.openDrawer()}
            onSearchIconPress={() => {
              navigation.navigate('search');
            }}
            onProfilePress={() => navigation.navigate('profile')}
          />
        ),
      })}
      drawerContent={({navigation}) => (
        <DrawerContent navigation={navigation} />
      )}>
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="categories" component={Categories} />
      <Drawer.Screen name="bookmarks" component={BookMarks} />
      <Drawer.Screen name="about" component={About} />
      <Drawer.Screen name="search" component={Search} />
      <Drawer.Screen name="newsArticle" component={NewsArticle} />
      <Drawer.Screen name="profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export function Routing() {
  return (
    <RootStack.Navigator
      initialRouteName="splash"
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="splash" component={Splash} />
      <RootStack.Screen name="getStarted" component={GetStrated} />
      <RootStack.Screen name="authStack" component={AuthStack} />
      <RootStack.Screen name="mainStack" component={DrawerStack} />
    </RootStack.Navigator>
  );
}
