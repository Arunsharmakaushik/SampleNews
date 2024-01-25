import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';
import FONTS from '../../../assets/fonts/indec';
import COLORS from '../../../utils/COLORS';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ThreeDotButton from '../../../components/buttons/ThreeDotButton';
import LatestNewsList from './LatestNewsList';

const LatestNews = () => {
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
      <LatestNewsList />
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
});
