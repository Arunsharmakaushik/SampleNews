import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {MenuIcon, SearchIcon} from '../../assets/icons';
import {storage} from '../../utils/Storage';
import Styles from './Styles';

interface IHeadBarProps {
  currentScreenName: string;
  isBack?: boolean;
  onBackPress?: () => void;
  isRightView?: boolean;
  onRightPress?: () => void;
  isLeftView?: boolean;
  onLeftPress?: () => void;
  onMenuPress?: () => void;
  onSearchIconPress?: () => void;
  onProfilePress?: () => void;
}

const HeadBar: React.FC<IHeadBarProps> = ({
  isBack,
  onBackPress,
  onMenuPress,
  onSearchIconPress,
  onProfilePress,
}) => {
  const user = storage.getUser();
  console.log(user, 'LLLLL');

  return (
    <View style={Styles.main}>
      {isBack ? (
        <TouchableOpacity onPress={onBackPress}>
          <AntIcon name="arrowleft" size={25} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onMenuPress}>
          <MenuIcon height={20} width={20} />
        </TouchableOpacity>
      )}
      <View style={Styles.profileandSearchCont}>
        <Pressable onPress={onSearchIconPress}>
          <SearchIcon height={25} width={25} />
        </Pressable>

        <TouchableOpacity onPress={onProfilePress}>
          <Text style={Styles.profileIocn}>
            {user?.fullname?.charAt(0).toUpperCase() ?? 'U'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeadBar;
