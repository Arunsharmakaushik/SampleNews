import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
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
  const userId = storage.getUserId();
  return (
    <View style={styles.main}>
      {userId ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingVertical: verticalScale(20),
            borderRadius: 15,
            backgroundColor: COLORS.white,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 2,
            justifyContent: 'space-around',
          }}>
          <Image
            source={require('../../../assets/icons/user.png')}
            style={{
              width: horizontalScale(120),
              height: verticalScale(120),
              resizeMode: 'contain',
            }}
          />
          <View style={styles.newsDetailCont}>
            <Text style={styles.name}>{user?.fullname || 'User'}</Text>
            {/* <Text style={styles.desc}>Football Enthusiast</Text> */}
            <TouchableOpacity
              style={styles.editProfileCont}
              onPress={() => {
                navigation.navigate('createProfile');
              }}>
              <Text style={styles.editProfileBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('createProfile')}
          style={styles.createbtn}>
          <Text style={styles.createBtnText}>Create your Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  main: {
    paddingVertical: verticalScale(10),
    gap: horizontalScale(20),
    alignItems: 'center',
  },

  newsDetailCont: {
    justifyContent: 'flex-start',
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

  createbtn: {
    paddingVertical: verticalScale(18),
    backgroundColor: COLORS.blue,
    borderRadius: 30,
    width: widthPercentageToDP(90),
  },
  createBtnText: {
    fontSize: responsiveFontSize(15),
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
