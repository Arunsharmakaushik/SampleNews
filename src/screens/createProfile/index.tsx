import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
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
  ViewStyle,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {BackIcon} from '../../assets/icons';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import {User} from '../../typings/common';
import {RootStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import ENDPOINTS from '../../utils/ENDPOINTS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';
import {storage} from '../../utils/Storage';
import EntypoIcon from 'react-native-vector-icons/Entypo';

type createProfileProps = NativeStackScreenProps<
  RootStackParams,
  'createProfile'
>;

interface InputFieldProps {
  item: keyof User; // Assuming item is a string, adjust if necessary
  userDetails: User;
  handleChange: (key: keyof User, value: string) => void;
  error: string;
  showPassowrd: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}
const InputField: FC<InputFieldProps> = React.memo(
  ({item, userDetails, handleChange, error, setShowPassword, showPassowrd}) => {
    return (
      <View style={styles.inputFieldView}>
        <TextInput
          value={userDetails[item]}
          onChangeText={text => handleChange(item, text)}
          placeholder={
            item.charAt(0).toUpperCase() + item.slice(1, item.length)
          }
          style={styles.inputField}
          secureTextEntry={item === 'password' && !showPassowrd}
        />
        {item === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassowrd)}>
            <EntypoIcon
              name={showPassowrd ? 'eye-with-line' : 'eye'}
              size={20}
              color="grey"
            />
          </TouchableOpacity>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
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
  const [errors, setErrors] = useState<User>({
    fullname: '',
    email: '',
    username: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key: keyof User, value: string) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const keyExtractor = (item: any, index: any) => item + index;

  const validateForm = () => {
    const {email, phone} = userDetails;
    let newErrors = {
      fullname: '',
      email: '',
      username: '',
      phone: '',
      password: '',
    };
    let isValid = true;

    // Check for empty fields and set errors
    Object.keys(newErrors).forEach(key => {
      if (!userDetails[key as keyof User]) {
        newErrors[key as keyof User] = 'This field is required.';
        isValid = false;
      }
    });

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    const phoneRegex = /^\+?\d{10,15}$/; // Adjust regex as needed for your use case
    if (phone && !phoneRegex.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;
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
              error={errors[item as keyof User]}
              showPassowrd={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listCont}
          style={styles.main}
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
    flex: 1,
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

  inputFieldView: {
    paddingHorizontal: horizontalScale(12),
    backgroundColor: COLORS.lightGrey,
    fontSize: responsiveFontSize(15),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
  },

  btnCont: {
    gap: verticalScale(10),
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.white,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});
