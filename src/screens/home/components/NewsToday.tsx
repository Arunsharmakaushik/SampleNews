import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FONTS from '../../../assets/fonts/indec';
import ThreeDotButton from '../../../components/buttons/ThreeDotButton';
import COLORS from '../../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import NewsTodayList from './NewsTodayList';

const NewsToday = () => {
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
        <Text style={styles.title}>News Today</Text>
        <ThreeDotButton
          menuVisible={isOptionMenu}
          toggleMenu={toggleOptionMenu}
          menuChildren={OptionMenu}
          menuStyles={styles.optionMenu}
        />
      </View>
      <NewsTodayList />
    </View>
  );
};

export default NewsToday;

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
