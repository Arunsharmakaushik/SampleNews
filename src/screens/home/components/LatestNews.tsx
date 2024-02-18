import {DrawerNavigationProp} from '@react-navigation/drawer';
import React, {FC, useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import FONTS from '../../../assets/fonts/indec';
import ThreeDotButton from '../../../components/buttons/ThreeDotButton';
import {Categories, INewsData} from '../../../typings/common';
import {DrawerStackParams} from '../../../typings/route';
import COLORS from '../../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';
import LatestNewsList from './LatestNewsList';

type LatestNewsProps = {
  navigation: DrawerNavigationProp<DrawerStackParams>;
  articles: INewsData[];
  selectedCategory: Categories;
};

const LatestNews: FC<LatestNewsProps> = ({
  navigation,
  articles,
  selectedCategory,
}) => {
  const [isOptionMenu, setIsOptionMenu] = useState(false);

  const toggleOptionMenu = useCallback(() => {
    setIsOptionMenu(prevState => !prevState);
  }, []);

  const OptionMenu = (
    <View>
      <Text>OPTION MENU</Text>
    </View>
  );

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.title}>Latest News</Text>
        <ThreeDotButton
          menuVisible={isOptionMenu}
          toggleMenu={toggleOptionMenu}
          menuChildren={OptionMenu}
          menuStyles={styles.optionMenu}
        />
      </View>
      {articles.length > 0 ? (
        <LatestNewsList navigation={navigation} latestArticles={articles} />
      ) : (
        <View style={styles.emptyBoxCont}>
          <Text style={styles.emptyBoxTitle}>
            No News related to {selectedCategory}
          </Text>
        </View>
      )}
    </View>
  );
};

export default LatestNews;

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
  emptyBoxCont: {
    paddingVertical: verticalScale(80),
    borderRadius: 10,
    width: widthPercentageToDP(90),
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  emptyBoxTitle: {
    fontSize: responsiveFontSize(15),
    fontFamily: FONTS.regular,
    color: COLORS.black,
  },
});
