import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import {Categories} from '../../typings/common';
import {DrawerStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import {verticalScale} from '../../utils/METRIC';
import CategoryList from './components/CategoryList';
import LatestNews from './components/LatestNews';
import NewsToday from './components/NewsToday';

type HomeProps = DrawerScreenProps<DrawerStackParams, 'home'>;

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<Categories>('Sports');

  const MemoizedCategoryList = React.memo(() => (
    <CategoryList
      category={selectedCategory}
      setCategory={setSelectedCategory}
    />
  ));
  const MemoizedNewsToday = React.memo(() => (
    <NewsToday navigation={navigation} />
  ));
  const MemoizedLatestNews = React.memo(() => (
    <LatestNews navigation={navigation} />
  ));

  return (
    <ScreenWrapper
      StatusBarColor={COLORS.white}
      contentColor="dark-content"
      Styles={styles.main}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <MemoizedCategoryList />
        <MemoizedNewsToday />
        <MemoizedLatestNews />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    gap: verticalScale(15),
  },
});
