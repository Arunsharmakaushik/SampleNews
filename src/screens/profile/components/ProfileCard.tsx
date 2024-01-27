import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';
import COLORS from '../../../utils/COLORS';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import FONTS from '../../../assets/fonts/indec';

const ProfileCard = () => {
  return (
    <View style={styles.main}>
      <Image
        source={{
          uri: 'https://c.biztoc.com/p/290cf493be42d48a/og.webp',
        }}
        style={styles.imageCont}
      />

      <View style={styles.newsDetailCont}>
        <Text style={styles.name}>Jaydon Levin</Text>
        <Text style={styles.desc}>Football Enthusiast</Text>
        <TouchableOpacity style={styles.editProfileCont}>
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
