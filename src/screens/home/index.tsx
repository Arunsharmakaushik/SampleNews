import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import {DrawerStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import CategoryList from './components/CategoryList';
import {Categories} from '../../typings/common';
import NewsToday from './components/NewsToday';
import {verticalScale} from '../../utils/METRIC';
import LatestNews from './components/LatestNews';

type HomeProps = DrawerScreenProps<DrawerStackParams, 'home'>;

const Home: React.FC<HomeProps> = ({}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<Categories>('Sports');

  return (
    <ScreenWrapper
      StatusBarColor={COLORS.white}
      contentColor="dark-content"
      Styles={Styles.main}>
      <CategoryList
        category={selectedCategory}
        setCategory={setSelectedCategory}
      />
      <NewsToday />
      <LatestNews />
    </ScreenWrapper>
  );
};

export default Home;

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
    gap: verticalScale(15),
  },
});
