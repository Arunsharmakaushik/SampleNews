import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import {Categories, INewsData} from '../../typings/common';
import {DrawerStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import {verticalScale} from '../../utils/METRIC';
import CategoryList from './components/CategoryList';
import LatestNews from './components/LatestNews';
import NewsToday from './components/NewsToday';

type HomeProps = DrawerScreenProps<DrawerStackParams, 'home'>;

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Categories>('Sports');

  const MemoizedCategoryList = React.memo(() => (
    <CategoryList
      category={selectedCategory}
      setCategory={setSelectedCategory}
    />
  ));
  const MemoizedNewsToday = React.memo(() => (
    <NewsToday navigation={navigation} articles={articles} />
  ));
  const MemoizedLatestNews = React.memo(() => (
    <LatestNews
      navigation={navigation}
      articles={filterNewsByToday(articles)}
    />
  ));

  const filterNewsByToday = (data: INewsData[]) => {
    const currentTime = new Date();

    const twentyFourHoursAgo = new Date(
      currentTime.getTime() - 24 * 60 * 60 * 1000,
    ); // Subtract 24 hours

    return data.filter(item => {
      const publishedDate = new Date(item.published_at);
      return publishedDate >= twentyFourHoursAgo;
    });
  };

  useEffect(() => {
    let isCurrent = true;
    fetch('https://news-node-beta.vercel.app/api/article')
      .then(res => res.json())
      .then(res => {
        if (isCurrent) {
          setArticles(res);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

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
