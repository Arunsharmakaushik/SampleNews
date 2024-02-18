import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import COLORS from '../../utils/COLORS';
import {responsiveFontSize} from '../../utils/METRIC';

type IThreeDotsButtonProps = {
  toggleMenu: () => void;
  menuVisible: boolean;
  menuChildren: React.ReactNode;
  menuStyles: ViewStyle;
};

const ThreeDotButton: FC<IThreeDotsButtonProps> = ({
  menuVisible,
  toggleMenu,
  menuChildren,
  menuStyles,
}) => {
  return (
    <View style={styles.main}>
      <TouchableOpacity disabled onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuText}>•••</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={[styles.menu, menuStyles]}>{menuChildren}</View>
      )}
    </View>
  );
};

export default ThreeDotButton;

const styles = StyleSheet.create({
  main: {position: 'relative'},
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: responsiveFontSize(20),
    lineHeight: 20,
  },
  menu: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
    zIndex: 10000,
  },
});
