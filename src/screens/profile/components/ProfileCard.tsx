import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import FONTS from '../../../assets/fonts/indec';
import {DrawerStackParams, RootStackParams} from '../../../typings/route';
import COLORS from '../../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';
import {storage} from '../../../utils/Storage';

type ProfileCardProps = {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<DrawerStackParams, 'profile'>,
    NativeStackNavigationProp<RootStackParams, 'createProfile'>
  >;
};

const ProfileCard: FC<ProfileCardProps> = ({navigation}) => {
  const user = storage.getUser();

  return (
    <View style={styles.main}>
      <View style={styles.newsDetailCont}>
        <Text style={styles.name}>{user?.Name || 'User'}</Text>
        <Text style={styles.desc}>Football Enthusiast</Text>
        <TouchableOpacity
          style={styles.editProfileCont}
          onPress={() => {
            navigation.navigate('createProfile');
          }}>
          <Text style={styles.editProfileBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    width: '100%',
    flexDirection: 'row',
    gap: horizontalScale(20),
  },
  imageCont: {
    height: heightPercentageToDP(20),
    width: widthPercentageToDP(45),
    resizeMode: 'cover',
    borderRadius: 100,
  },

  newsDetailCont: {
    flex: 1,
    justifyContent: 'center',
    gap: verticalScale(10),
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: responsiveFontSize(22),
    color: COLORS.black,
  },
  desc: {
    fontFamily: FONTS.medium,
    fontSize: responsiveFontSize(12),
    color: COLORS.blue,
  },
  editProfileCont: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    backgroundColor: COLORS.blue,
    textAlign: 'center',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  editProfileBtnText: {
    fontFamily: FONTS.medium,
    fontSize: responsiveFontSize(12),
    color: COLORS.white,
  },
});
