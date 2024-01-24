import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import {storage} from '../../utils/Storage';
import Styles from './Styles';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import {AppLogo} from '../../assets/icons/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Text} from 'react-native';
type SplashProps = NativeStackScreenProps<RootStackParams, 'splash'>;

const Splash: React.FC<SplashProps> = ({navigation}) => {
  const isOnBoarded = storage.getIsOnBoarded();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (isOnBoarded) {
        navigation.replace('mainStack');
      } else {
        navigation.replace('getStarted');
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isOnBoarded]);

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
