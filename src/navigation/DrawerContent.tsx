import {useNavigationState} from '@react-navigation/native';
import React, {FC} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DrawerStackParams} from '../typings/route';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../utils/METRIC';

import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import FONTS from '../assets/fonts/indec';
import {BulbIcon, CloseIcon} from '../assets/icons';
import COLORS from '../utils/COLORS';
import {heightPercentageToDP} from 'react-native-responsive-screen';

type DrawerItems = {
  name: string;
  route: keyof DrawerStackParams;
};

export const DrwaerData: DrawerItems[] = [
  {
    name: 'Home',
    route: 'home',
  },
  {
    name: 'Categories',
    route: 'categories',
  },
  {
    name: 'Bookmarks',
    route: 'bookmarks',
  },
  {
    name: 'About',
    route: 'about',
  },
];

type IDrawerContentProps = {
  navigation: DrawerNavigationHelpers;
};

const DrawerContent: FC<IDrawerContentProps> = ({navigation}) => {
  const navState = useNavigationState(state => state);
  const currentRoute =
    navState.routes[0].state?.routeNames![navState.routes[0].state?.index ?? 0];

  const renderItem = (item: DrawerItems) => {
    const isSelected = item.route === currentRoute;

    return (
      <TouchableOpacity
        key={item.name}
        onPress={() => {
          navigation.navigate(item.route);
        }}
        style={styles.drawerItems}>
        <Text
          style={
            isSelected ? styles.drawerItemSelectedText : styles.drawerItemText
          }>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainCont}>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <CloseIcon height={25} width={25} />
      </TouchableOpacity>
      <FlatList
        data={DrwaerData}
        renderItem={({item}) => renderItem(item)}
        scrollEnabled
        contentContainerStyle={styles.drawerItemListCont}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
        }}>
        <BulbIcon height={25} width={25} />
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    paddingLeft: horizontalScale(25),
    paddingTop: heightPercentageToDP(10),
    paddingBottom: heightPercentageToDP(5),
    justifyContent: 'center',
  },
  drawerHeadText: {
    fontSize: responsiveFontSize(20),
  },
  drawerItemListCont: {
    flex: 1,
    paddingTop: heightPercentageToDP(5),
  },
  drawerItems: {marginVertical: verticalScale(10)},
  drawerItemText: {
    fontSize: responsiveFontSize(25),
    fontFamily: FONTS.regular,
    color: COLORS.Grey,
  },
  drawerItemSelectedText: {
    fontSize: responsiveFontSize(25),
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
});
