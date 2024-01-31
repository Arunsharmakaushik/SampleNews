import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import COLORS from '../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';
import {RootStackParams} from '../../typings/route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {storage} from '../../utils/Storage';

type GetStartedProps = NativeStackScreenProps<RootStackParams, 'getStarted'>;

const GetStrated: React.FC<GetStartedProps> = ({navigation}) => {
  return (
    <ScreenWrapper
      StatusBarColor={'rgba(0,0,0,0.6)'}
      contentColor="light-content"
      Styles={styles.main}>
      <Text style={styles.heading}>Discover More About World</Text>
      <Text style={styles.subHeading}>
        You can read the hottest and popular news anywhere and anytime for free,
        let's start
      </Text>
      <TouchableOpacity
        onPress={() => {
          storage.setIsOnBoarded(true);
          navigation.replace('mainStack', {screen: 'home'});
        }}
        style={styles.btn}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default GetStrated;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(25),
    justifyContent: 'flex-end',
    gap: verticalScale(20),
    alignItems: 'flex-start',
  },
  heading: {
    fontSize: responsiveFontSize(40),
    color: COLORS.white,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: responsiveFontSize(15),
    color: COLORS.Grey,
    fontWeight: 'bold',
  },
  btn: {
    paddingHorizontal: horizontalScale(50),
    paddingVertical: verticalScale(18),
    backgroundColor: COLORS.blue,
    borderRadius: 10,
  },
  btnText: {
    fontSize: responsiveFontSize(15),
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
