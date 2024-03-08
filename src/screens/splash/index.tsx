import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Platform, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {AppLogo} from '../../assets/icons/index';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import {RootStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import {storage} from '../../utils/Storage';
import Styles from './Styles';
type SplashProps = NativeStackScreenProps<RootStackParams, 'splash'>;

const Splash: React.FC<SplashProps> = ({navigation}) => {
  const isOnBoarded = storage.getIsOnBoarded();

  const user = storage.getUser();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (isOnBoarded) {
        navigation.replace('mainStack', {screen: 'home'});
      } else {
        if (user === null) {
          navigation.replace('createProfile');
        } else {
          navigation.replace('getStarted');
        }
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isOnBoarded]);

  if (Platform.OS === 'ios') {
    return null;
  }

  return (
    <ScreenWrapper
      StatusBarColor={COLORS.blue}
      contentColor="light-content"
      Styles={Styles.main}>
      <AppLogo width={wp(30)} height={hp(15)} fill="red" />
      <Text style={Styles.text}>AERON</Text>
    </ScreenWrapper>
  );
};

export default Splash;
