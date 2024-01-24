import React from 'react';
import {StyleSheet, Text} from 'react-native';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import COLORS from '../../utils/COLORS';

const BookMarks = () => {
  return (
    <ScreenWrapper
      StatusBarColor={COLORS.white}
      contentColor="dark-content"
      Styles={Styles.main}>
      <Text>BOOKMARKS</Text>
    </ScreenWrapper>
  );
};

export default BookMarks;

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
