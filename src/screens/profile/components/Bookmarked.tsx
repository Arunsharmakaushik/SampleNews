import {DrawerNavigationProp} from '@react-navigation/drawer';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import FONTS from '../../../assets/fonts/indec';
import ThreeDotButton from '../../../components/buttons/ThreeDotButton';
import {DrawerStackParams} from '../../../typings/route';
import COLORS from '../../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';
import BookmarkedList from './BookmarkedList';
import {storage} from '../../../utils/Storage';
import {INewsData} from '../../../typings/common';

type BookMarkedProps = {
  navigation: DrawerNavigationProp<DrawerStackParams>;
};

const Bookmarked: FC<BookMarkedProps> = ({navigation}) => {
  const [isOptionMenu, setIsOptionMenu] = useState(false);
  const [bookmarkList, setBookmarkList] = useState<INewsData[]>([]);
  const toggleOptionMenu = useCallback(() => {
    setIsOptionMenu(prevState => !prevState);
  }, []);

  useEffect(() => {
    let isCurrent = true;
    fetch('https://news-node-beta.vercel.app/api/article')
      .then(res => res.json())
      .then((res: INewsData[]) => {
        if (isCurrent) {
          const bookmarkedNews = res.filter(news =>
            storage.getBookmarks()?.includes(news._id),
          );
          setBookmarkList(bookmarkedNews);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const OptionMenu = (
    <View>
      <Text>OPTION MENU</Text>
    </View>
  );

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.title}>News Today</Text>
        <ThreeDotButton
          menuVisible={isOptionMenu}
          toggleMenu={toggleOptionMenu}
          menuChildren={OptionMenu}
          menuStyles={styles.optionMenu}
        />
      </View>
      <BookmarkedList navigation={navigation} data={bookmarkList} />
    </View>
  );
};

export default Bookmarked;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(15),
    gap: verticalScale(25),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: responsiveFontSize(25),
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  optionMenu: {
    top: verticalScale(30),
    right: 0,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(20),
    height: heightPercentageToDP(20),
    width: widthPercentageToDP(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
