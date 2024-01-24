import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
  DrawerActions,
  useNavigation,
  useNavigationState
} from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerStackParams } from '../typings/route';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale
} from '../utils/METRIC';

import { heightPercentageToDP } from 'react-native-responsive-screen';
import FONTS from '../assets/fonts/indec';
import { BulbIcon, CloseIcon } from '../assets/icons';
import COLORS from '../utils/COLORS';

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
    route: 'About',
  },
];

const DrawerContent = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackParams>>();
  const navState = useNavigationState(state => state);
  const currentRoute =
    navState.routes[0].state?.routeNames![navState.routes[0].state?.index ?? 0];

  const renderItem = (item: DrawerItems) => {
    const isSelected = item.route === currentRoute;

    return (
      <TouchableOpacity
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
        style={styles.closeIcon}
        onPress={() => {
          navigation.closeDrawer();
  
          // navigation.dispatch(DrawerActions.closeDrawer());
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
        style={styles.bulbIcon}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
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
    paddingVertical: verticalScale(10),
    justifyContent: 'center',
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 10,
    top: heightPercentageToDP(10),
    left: horizontalScale(25),
  },
  bulbIcon: {
    position: 'absolute',
    bottom: heightPercentageToDP(3),
    left: horizontalScale(25),
  },
  drawerHeadText: {
    fontSize: responsiveFontSize(20),
  },
  drawerItemListCont: {
    flex: 1,
    justifyContent: 'center',
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
