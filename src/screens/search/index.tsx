import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {FC, useCallback, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FONTS from '../../assets/fonts/indec';
import {BackIcon, SearchIcon} from '../../assets/icons';
import {DrawerStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';
import RecentSearchBox from './components/RecentSearchBox';
import SearchedList from './components/SearchedList';

type NewsArticleProps = DrawerScreenProps<DrawerStackParams, 'search'>;

const Search: FC<NewsArticleProps> = ({navigation}) => {
  const [searchWord, setSearchWord] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const handleSearchPress = useCallback(() => setIsSearched(true), []);
  const handleBackPress = useCallback(() => navigation.goBack(), [navigation]);
  const handleSearchChange = useCallback(
    (text: string) => setSearchWord(text),
    [],
  );
  const handleRecentSearchPress = useCallback(() => setIsSearched(true), []);
  const handleSearchedItemPress = useCallback(
    () => navigation.navigate('newsArticle'),
    [navigation],
  );

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
            There are <Text style={styles.ListheaderBoldText}>99+</Text> news
            results for <Text style={styles.ListheaderBoldText}>Football</Text>
          </Text>
        )}
        {isSearched ? (
          <SearchedList onItemPress={handleSearchedItemPress} />
        ) : (
          <RecentSearchBox onItemPress={handleRecentSearchPress} />
        )}
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
});
