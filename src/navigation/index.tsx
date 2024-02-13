import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HeadBar from '../components/headBar/HeadBar';
import About from '../screens/about';
import BookMarks from '../screens/bookmarks';
import Categories from '../screens/categories';
import CreateProfile from '../screens/createProfile/CreateProfile';
import GetStrated from '../screens/getStarted/GetStrated';
import Home from '../screens/home';
import NewsArticle from '../screens/newsArticle';
import Profile from '../screens/profile';
import Search from '../screens/search';
import Splash from '../screens/splash';
import {DrawerStackParams, RootStackParams} from '../typings/route';
import DrawerContent from './DrawerContent';

const RootStack = createNativeStackNavigator<RootStackParams>();
const Drawer = createDrawerNavigator<DrawerStackParams>();

const screenWithoutHeader: Array<keyof DrawerStackParams> = [
  'newsArticle',
  'search',
  'profile',
];

export const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'home'}
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
      <RootStack.Screen name="createProfile" component={CreateProfile} />
      <RootStack.Screen name="mainStack" component={DrawerStack} />
    </RootStack.Navigator>
  );
}
