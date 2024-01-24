import React from 'react';
import { StyleSheet, Text } from 'react-native';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import COLORS from '../../utils/COLORS';

const Home = ({ navigation }) => {


  return (
    <ScreenWrapper
      StatusBarColor={COLORS.white}
      contentColor="dark-content"
      Styles={Styles.main}>
      <Text onPress={() => { navigation.openDrawer(); }}>Open Drawer</Text>
      <Text>Home</Text>
    </ScreenWrapper>
  );
};

export default Home;

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
