import React, { ReactNode } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import COLORS from '../../utils/COLORS';

interface IScreenWrapperProps {
  children: ReactNode;
  StatusBarColor?: string;
  contentColor?: StatusBarStyle;
  Styles: ViewStyle;
  SafeAreaStyles?: ViewStyle;
}

const ScreenWrapper: React.FC<IScreenWrapperProps> = ({
  children,
  StatusBarColor = COLORS.white,
  contentColor = 'dark-content',
  Styles = { backgroundColor: COLORS.white, flex: 1 },
  SafeAreaStyles,
}) => {
  return (
    <SafeAreaView style={[SafeAreaStyles, DefaultStyles.safeArea]}>
      <View style={Styles}>
        <StatusBar backgroundColor={StatusBarColor} barStyle={contentColor} />
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const DefaultStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});