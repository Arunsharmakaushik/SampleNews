import React, {FC, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FONTS from '../../assets/fonts/indec';
import {SearchIcon} from '../../assets/icons';
import COLORS from '../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';
import RecentSearchBox from './components/RecentSearchBox';
import SearchedList from './components/SearchedList';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerStackParams} from '../../typings/route';

type NewsArticleProps = DrawerScreenProps<DrawerStackParams, 'search'>;

const Search: FC<NewsArticleProps> = ({navigation}) => {
  const [searchWord, setSearchWord] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={styles.scrollView}>
      <View style={styles.main}>
        {!isSearched && (
          <Text style={styles.headerText}>Looking for something today?</Text>
        )}
        <View style={styles.serchBar}>
          <TextInput
            value={searchWord}
            onFocus={({}) => setIsSearched(false)}
            onChangeText={text => setSearchWord(text)}
            placeholder="Search for news"
            style={styles.inputBox}
          />
          <TouchableOpacity onPress={() => setIsSearched(true)}>
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
          <SearchedList
            onItemPress={() => navigation.navigate('newsArticle')}
          />
        ) : (
          <RecentSearchBox onItemPress={() => setIsSearched(true)} />
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
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: responsiveFontSize(25),
    color: COLORS.black,
    paddingRight: horizontalScale(60),
  },
  serchBar: {
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
