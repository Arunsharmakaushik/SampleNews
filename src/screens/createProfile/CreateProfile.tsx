import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {BackIcon} from '../../assets/icons';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import {User} from '../../typings/common';
import {RootStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';
import {storage} from '../../utils/Storage';

type createProfileProps = NativeStackScreenProps<
  RootStackParams,
  'createProfile'
>;

const CreateProfile: FC<createProfileProps> = ({navigation}) => {
  const user = storage.getUser();

  const [userDetails, setUserDetails] = useState<User>({
    Name: '',
    Email: '',
    Username: '',
    Phone: '',
    Password: '',
  });

  const handleChange = (key: keyof User, value: string) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const renderList = ({item}: any) => {
    return (
      <TextInput
        value={userDetails[item as keyof User]}
        onChangeText={text => handleChange(item as keyof User, text)}
        placeholder={`Enter your ${item}`}
        style={styles.inputField}
      />
    );
  };
  const keyExtractor = (item: any, index: any) => item + index;

  useEffect(() => {
    if (navigation.canGoBack()) {
      if (user) {
        setUserDetails({
          Name: user.Name || '',
          Email: user.Email || '',
          Password: user.Password || '',
          Phone: user.Phone || '',
          Username: user.Username || '',
        });
      }
    }
  }, [navigation]);

  return (
    <ScreenWrapper
      StatusBarColor={COLORS.white}
      contentColor="dark-content"
      Styles={
        [
          styles.main,
          {
            paddingTop: navigation.canGoBack() ? 0 : verticalScale(25),
          },
        ] as ViewStyle
      }>
      {navigation.canGoBack() && (
        <View style={styles.headerCont}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.heading}>
        {navigation.canGoBack() ? 'Edit Details' : 'Add Details'}
      </Text>
      <Text style={styles.subHeading}>
        Create your profile to save your favourite news aricle
      </Text>
      <KeyboardAvoidingView
        style={styles.KeyboarAvoidingCont}
        behavior="padding">
        <FlatList
          data={Object.keys(userDetails)}
          renderItem={renderList}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listCont}
        />
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() => {
          storage.setUser({
            Name: userDetails.Name,
            Email: userDetails.Email,
            Username: userDetails.Username,
            Phone: userDetails.Phone,
            Password: userDetails.Password,
          });
          navigation.replace('mainStack', {
            screen: 'home',
          });
        }}
        style={styles.savebtn}>
        <Text style={styles.saveBtnText}>
          {navigation.canGoBack() ? 'Update Profile' : 'Create Details'}
        </Text>
      </TouchableOpacity>
      {!navigation.canGoBack() && (
        <TouchableOpacity
          onPress={() => {
            navigation.replace('getStarted');
          }}
          style={styles.skipbtn}>
          <Text style={styles.skipBtnText}>Skip</Text>
        </TouchableOpacity>
      )}
    </ScreenWrapper>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: horizontalScale(25),
    paddingBottom: verticalScale(25),
    gap: verticalScale(20),
  },
  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthPercentageToDP(100),
  },

  KeyboarAvoidingCont: {flex: 1},

  heading: {
    fontSize: responsiveFontSize(25),
    color: COLORS.black,
    fontWeight: 'bold',
  },

  subHeading: {
    fontSize: responsiveFontSize(18),
    color: COLORS.Grey,
    fontWeight: 'bold',
  },

  listCont: {gap: horizontalScale(25)},

  inputField: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(8),
    backgroundColor: COLORS.lightGrey,
    fontSize: responsiveFontSize(15),
    borderRadius: 5,
  },
  savebtn: {
    paddingVertical: verticalScale(18),
    backgroundColor: COLORS.blue,
    borderRadius: 30,
    width: widthPercentageToDP(90),
  },
  saveBtnText: {
    fontSize: responsiveFontSize(15),
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipbtn: {
    paddingVertical: verticalScale(18),
    backgroundColor: COLORS.white,
    borderRadius: 30,
    width: widthPercentageToDP(90),
    borderWidth: 2,
    borderColor: COLORS.blue,
  },
  skipBtnText: {
    fontSize: responsiveFontSize(15),
    color: COLORS.blue,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
