import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {FC} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FONTS from '../../assets/fonts/indec';
import {BackIcon, SettingsIcon} from '../../assets/icons';
import {DrawerStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';
import Bookmarked from './components/Bookmarked';
import BottomCard from './components/BottomCard';
import ProfileCard from './components/ProfileCard';

type ProfileProps = DrawerScreenProps<DrawerStackParams, 'profile'>;

const Profile: FC<ProfileProps> = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.main}>
        <View style={styles.headerCont}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.centerText}>My Profile</Text>
          <TouchableOpacity>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
        <ProfileCard />
        <Bookmarked navigation={navigation} />
        <BottomCard />
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scrollView: {flex: 1},
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
    fontFamily: FONTS.regular,
    fontSize: responsiveFontSize(18),
    color: COLORS.black,
  },
});