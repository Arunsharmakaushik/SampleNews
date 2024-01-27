import React from 'react';
import {Image, Pressable, TouchableOpacity, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {MenuIcon, SearchIcon} from '../../assets/icons';
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
  return (
    <View style={Styles.main}>
      {isBack ? (
        <TouchableOpacity onPress={onBackPress}>
          <AntIcon name="arrowleft" size={25} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onMenuPress}>
          <MenuIcon height={15} width={15} />
        </TouchableOpacity>
      )}
      <View style={Styles.profileandSearchCont}>
        <Pressable onPress={onSearchIconPress}>
          <SearchIcon height={25} width={25} />
        </Pressable>

        <TouchableOpacity onPress={onProfilePress}>
          <Image
            source={require('../../assets/images/Ellipse.png')}
            style={Styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeadBar;
