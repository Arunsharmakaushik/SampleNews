import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import {Categories, INewsData} from '../../typings/common';
import {DrawerStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import {verticalScale} from '../../utils/METRIC';
import CategoryList from './components/CategoryList';
import LatestNews from './components/LatestNews';
import NewsToday from './components/NewsToday';
import {heightPercentageToDP} from 'react-native-responsive-screen';

type HomeProps = DrawerScreenProps<DrawerStackParams, 'home'>;

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<Categories>('All');

  const MemoizedCategoryList = React.memo(() => (
    <CategoryList
      category={selectedCategory}
      setCategory={setSelectedCategory}
    />
  ));
  const MemoizedNewsToday = React.memo(() => (
    <NewsToday navigation={navigation} articles={filterNewsByToday(articles)} />
  ));
  const MemoizedLatestNews = React.memo(
    () => (
      <LatestNews
        navigation={navigation}
        articles={
          selectedCategory === 'All' ? articles : filternewsByCategory(articles)
        }
        selectedCategory={selectedCategory}
      />
    ),
    [selectedCategory],
  );

  const filterNewsByToday = (data: INewsData[]) => {
    const currentTime = new Date();

    const twentyFourHoursAgo = new Date(
      currentTime.getTime() - 24 * 60 * 60 * 1000,
    );

    return data.filter(item => {
      const publishedDate = new Date(item.published_at);
      return publishedDate >= twentyFourHoursAgo;
    });
  };

  const filternewsByCategory = (data: INewsData[]) => {
    const category: Categories = selectedCategory.toLowerCase();

    return data.filter(item => {
      const categorisedNews = item.category_id === category;
      return categorisedNews;
    });
  };

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    fetch('https://news-node-beta.vercel.app/api/article')
      .then(res => res.json())
      .then(res => {
        if (isCurrent) {
          setArticles(res);
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      isCurrent = false;
    };
  }, []);

  if (isLoading)
    return (
      <View style={styles.loadingCont}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </View>
    );

  return (
    <ScreenWrapper
      StatusBarColor={COLORS.white}
      contentColor="dark-content"
      Styles={styles.main}>
      <MemoizedCategoryList />
      <ScrollView contentContainerStyle={styles.scrollView}>
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
  },
  scrollView: {
    gap: verticalScale(15),
    backgroundColor: COLORS.white,
    minHeight: heightPercentageToDP(100),
  },
  loadingCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
