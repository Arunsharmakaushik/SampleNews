import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP
} from 'react-native-responsive-screen';
import { BackIcon } from '../../assets/icons';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import { User } from '../../typings/common';
import { RootStackParams } from '../../typings/route';
import COLORS from '../../utils/COLORS';
import ENDPOINTS from '../../utils/ENDPOINTS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale
} from '../../utils/METRIC';
import { storage } from '../../utils/Storage';

type createProfileProps = NativeStackScreenProps<
  RootStackParams,
  'createProfile'
>;

interface InputFieldProps {
  item: keyof User; // Assuming item is a string, adjust if necessary
  userDetails: User;
  handleChange: (key: keyof User, value: string) => void;
}
const InputField: FC<InputFieldProps> = React.memo(
  ({item, userDetails, handleChange}) => {
    return (
      <TextInput
        value={userDetails[item]}
        onChangeText={text => handleChange(item, text)}
        placeholder={item.charAt(0).toUpperCase() + item.slice(1, item.length)}
        style={styles.inputField}
      />
    );
  },
);

const CreateProfile: FC<createProfileProps> = ({navigation}) => {
  const user = storage.getUser();
  const userId = storage.getUserId();

  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<User>({
    fullname: '',
    email: '',
    username: '',
    phone: '',
    password: '',
  });

  const handleChange = (key: keyof User, value: string) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const keyExtractor = (item: any, index: any) => item + index;

  const handleCreateUser = async () => {
    setIsLoading(true);
    try {
      const method = userId ? 'PUT' : 'POST';
      const apiUrl = userId
        ? `${ENDPOINTS.API_URL_USER}/${userId}`
        : ENDPOINTS.API_URL_USER;

      const {data, status} = await axios({
        method: method,
        url: apiUrl,
        data: {
          fullname: userDetails.fullname,
          email: userDetails.email,
          phone: userDetails.phone,
          password: userDetails.password,
          username: userDetails.username,
        },
        headers: {'Content-Type': 'application/json'},
      });

      if (status === 201 || status === 200) {
        storage.setUser({
          fullname: data.fullname,
          email: data.email,
          username: data.username,
          password: data.password,
          phone: data.phone,
        });
        storage.setUserId(data._id);
        navigation.canGoBack()
          ? navigation.replace('mainStack', {screen: 'profile'})
          : navigation.replace('mainStack', {screen: 'home'});
      }
    } catch (error: any) {
      Alert.alert('Sorry, Something went wrong. ', error?.error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (navigation.canGoBack() && user) {
      setUserDetails({...user});
    }
  }, [navigation, user]);

  return (
    <ScreenWrapper
      StatusBarColor={COLORS.white}
      contentColor="dark-content"
      Styles={[styles.main] as ViewStyle}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollCont}>
        <FlatList
          ListHeaderComponent={
            <>
              {navigation.canGoBack() && (
                <View style={styles.headerCont}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon />
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.heading}>
                {userId ? 'Update your Profile' : 'Create your Profile'}
              </Text>
              <Text style={styles.subHeading}>
                Create your profile to save your favourite news article
              </Text>
            </>
          }
          data={Object.keys(userDetails)}
          renderItem={({item}) => (
            <InputField
              item={item as keyof User}
              userDetails={userDetails}
              handleChange={handleChange}
            />
          )}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listCont}
          style={{flex:1}}
        />

       
      </ScrollView>
      <View style={styles.btnCont}>
          <TouchableOpacity onPress={handleCreateUser} style={styles.savebtn}>
            <Text style={styles.saveBtnText}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : userId ? (
                'Update Profile'
              ) : (
                'Create Details'
              )}
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
        </View>
    </ScreenWrapper>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  main: {flex: 1},

  scrollCont: {
    flex:1,
    backgroundColor: COLORS.white,
    paddingHorizontal: horizontalScale(15),
    paddingBottom: verticalScale(10),
    gap: verticalScale(20),
    justifyContent: 'space-between',
    minHeight: heightPercentageToDP(100),
  },

  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthPercentageToDP(100),
    marginBottom: verticalScale(10),
  },
  heading: {
    fontSize: responsiveFontSize(25),
    color: COLORS.black,
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  subHeading: {
    fontSize: responsiveFontSize(18),
    color: COLORS.Grey,
    fontWeight: 'bold',
  },

  listCont: {
    flex: 1,
    gap: horizontalScale(25),
    paddingTop: verticalScale(15),
  },

  inputField: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    backgroundColor: COLORS.lightGrey,
    fontSize: responsiveFontSize(15),
    borderRadius: 5,
  },

  btnCont: {gap: verticalScale(10), alignItems: 'center'},

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
