import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import FONTS from '../../assets/fonts/indec';
import { BackIcon, SearchIcon } from '../../assets/icons';
import { DrawerStackParams } from '../../typings/route';
import COLORS from '../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale
} from '../../utils/METRIC';
import { storage } from '../../utils/Storage';
import RecentSearchBox from './components/RecentSearchBox';
import SearchedList from './components/SearchedList';

type NewsArticleProps = DrawerScreenProps<DrawerStackParams, 'search'>;

const Search: FC<NewsArticleProps> = ({navigation}) => {
  const [searchWord, setSearchWord] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const [currentSearchedText, setCurrentSearchedText] = useState('');

  const [filteredArticles, setFilteredArticles] = useState([]);

  const handleSearchPress = () => {
    storage.setRecentSearches(searchWord);

    setCurrentSearchedText(searchWord);
    if (searchWord.length === 0) {
      setFilteredArticles(articles);
    }
    setFilteredArticles(
      articles.filter(item => item?.title.includes(searchWord)),
    );
    setIsSearched(true);
  };

  const handleBackPress = useCallback(() => {
    setIsSearched(false);
    setSearchWord('');
    setCurrentSearchedText('');
    navigation.goBack();
  }, [navigation]);
  const handleSearchChange = useCallback(
    (text: string) => setSearchWord(text),
    [],
  );
  const handleRecentSearchPress = (recentWord: string) => {
    setCurrentSearchedText(recentWord);
    setFilteredArticles(
      articles.filter(item => item?.title.includes(recentWord)),
    );
    setIsSearched(true);
  };
  const handleSearchedItemPress = useCallback(
    () => navigation.navigate('newsArticle', {id: '658ee2c1772a5ede92efb5f5'}),
    [navigation],
  );

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
      console.log('dfdfsd');

      setIsSearched(false);
      isCurrent = false;
    };
  }, []);

  if (isLoading)
    return (
      <View style={styles.loadingCont}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </View>
    );

  const MemoizedLatestNews = React.memo(() => {
    return isSearched ? (
      <SearchedList
        articles={filteredArticles}
        onItemPress={handleSearchedItemPress}
      />
    ) : (
      <RecentSearchBox
        recentSearches={storage.getRecentSearches()!}
        onItemPress={(item: string) => handleRecentSearchPress(item)}
      />
    );
  }, [isSearched, filteredArticles, searchWord]);

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={styles.scrollView}>
      <View style={styles.main}>
        <View style={styles.headerCont}>
          <TouchableOpacity onPress={handleBackPress}>
            <BackIcon />
          </TouchableOpacity>
        </View>
        {!isSearched && (
          <Text style={styles.headerText}>Looking for something today?</Text>
        )}
        <View style={styles.searchBar}>
          <TextInput
            autoFocus
            value={searchWord}
            onFocus={() => handleSearchPress}
            onChangeText={handleSearchChange}
            placeholder="Search for news"
            style={styles.inputBox}
          />
          <TouchableOpacity onPress={handleSearchPress}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
        {isSearched && (
          <Text style={styles.ListText}>
            There are{' '}
            <Text style={styles.ListheaderBoldText}>
              {filteredArticles.length}{' '}
            </Text>
            {currentSearchedText.length > 0
              ? 'news results for '
              : 'news articles'}
            <Text style={styles.ListheaderBoldText}>{currentSearchedText}</Text>
          </Text>
        )}
        <MemoizedLatestNews />
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(15),
  },
  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: responsiveFontSize(25),
    color: COLORS.black,
    paddingRight: horizontalScale(60),
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGrey,
    alignItems: 'center',
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(5),
    borderRadius: 10,
    marginVertical: verticalScale(10),
  },
  inputBox: {
    flex: 1,
    paddingVertical:5
  },
  ListText: {
    fontFamily: FONTS.medium,
    fontSize: responsiveFontSize(25),
    color: COLORS.black,
    paddingRight: horizontalScale(60),
  },
  ListheaderBoldText: {
    fontFamily: FONTS.extraBold,
    fontSize: responsiveFontSize(26),
    color: COLORS.black,
  },
  loadingCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
