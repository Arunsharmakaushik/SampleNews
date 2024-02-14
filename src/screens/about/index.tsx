import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FONTS from '../../assets/fonts/indec';
import {BackIcon} from '../../assets/icons';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import COLORS from '../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';
import {DrawerStackParams} from '../../typings/route';
import {DrawerScreenProps} from '@react-navigation/drawer';

type AboutProps = DrawerScreenProps<DrawerStackParams, 'about'>;

const About: FC<AboutProps> = ({navigation}) => {
  return (
    <ScreenWrapper
      StatusBarColor={COLORS.white}
      contentColor="dark-content"
      Styles={Styles.main}>
      <View style={Styles.headerCont}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={Styles.centerText}>About Us</Text>
      </View>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi dicta
        esse ex! Incidunt, nam quaerat! Animi porro minus quis ad amet magni
        repudiandae officia voluptatem aliquid ipsum non vel cum quasi fugiat
        modi, nostrum eveniet odio dolore dolorum? Nemo, minima? Repellat esse
        ipsum totam minus, cum suscipit obcaecati laudantium, deleniti corporis
        voluptatum nobis quis? Et quas atque tempore quibusdam aliquam iure
        exercitationem pariatur culpa quo quos laboriosam, numquam quam debitis
        consequatur quaerat distinctio reiciendis, magni nobis accusamus
        assumenda, veritatis officia impedit enim. Quasi dolores vero error
        fugiat exercitationem. Quasi aliquid corporis voluptas voluptatum itaque
        voluptatibus ipsa quia suscipit vitae ea!
      </Text>
    </ScreenWrapper>
  );
};

export default About;

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    gap: verticalScale(20),
    backgroundColor: COLORS.white,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
  },

  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  centerText: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: responsiveFontSize(18),
    color: COLORS.black,
    textAlign: 'center',
  },
});
