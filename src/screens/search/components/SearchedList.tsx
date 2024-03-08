import React, {FC, useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FONTS from '../../../assets/fonts/indec';
import {BlueBookmarkIcon, ShareIcon} from '../../../assets/icons';
import {INewsData} from '../../../typings/common';
import COLORS from '../../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';
import {storage} from '../../../utils/Storage';

type ISearchListProps = {
  articles: INewsData[];
  onItemPress: (id: string) => void;
};

const ICON_SIZE = horizontalScale(30);

const SearchedList: FC<ISearchListProps> = ({articles, onItemPress}) => {
  const keyExtractor = useCallback((item: INewsData) => item.title, []);

  const [bookmarkedArticle, setbookmarkedArticle] = useState(
    storage.getBookmarks(),
  );

  const renderRightActions = useCallback(
    (isBookmarked: () => any, id: string) => {
      const handleToggleBookmark = (articleId: string) => {
        if (bookmarkedArticle?.includes(articleId)) {
          const updatedBookmarks = bookmarkedArticle.filter(
            bookmarkId => bookmarkId !== articleId,
          );

          setbookmarkedArticle(updatedBookmarks);
          storage.setBookmarks(updatedBookmarks);
        } else {
          const updatedBookmarks = [...bookmarkedArticle!, articleId];

          storage.setBookmarks(updatedBookmarks);
          setbookmarkedArticle(updatedBookmarks);
        }
      };
      return (
        <View style={styles.rightActionsContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleToggleBookmark(id)}
            style={[
              styles.actionButton,
              {backgroundColor: isBookmarked() ? COLORS.blue : COLORS.white},
            ]}>
            {isBookmarked() ? (
              <IonIcons name="bookmark" color={COLORS.white} size={25} />
            ) : (
              <BlueBookmarkIcon />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={[styles.actionButton, {backgroundColor: COLORS.red}]}>
            <ShareIcon style={{width: ICON_SIZE, height: ICON_SIZE}} />
          </TouchableOpacity>
        </View>
      );
    },
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: INewsData}) => {
      const isBookmarked = () => bookmarkedArticle?.includes(item._id);

      return (
        <Swipeable
          overshootRight={false}
          renderRightActions={() => renderRightActions(isBookmarked, item._id)}
          containerStyle={styles.swipeableCont}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onItemPress(item._id)}
            style={styles.itemCont}>
            <Image
              source={{
                uri:
                  item.image ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSSu2i1o3fCtG2SLCH2_Xyr87h9__hrn9eQ&usqp=CAU',
              }}
              style={styles.imageCont}
            />
            <View style={styles.newsDetailCont}>
              <Text style={styles.heading}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        </Swipeable>
      );
    },
    [onItemPress, renderRightActions, bookmarkedArticle],
  );

  return (
    <FlatList
      data={articles}
      style={styles.listStyle}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listCont}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SearchedList;

const styles = StyleSheet.create({
  listCont: {gap: horizontalScale(15), paddingBottom: verticalScale(5)},
  listStyle: {flex: 1},

  swipeableCont: {
    backgroundColor: COLORS.white,
    width: widthPercentageToDP(90),
    borderRadius: 20,
    borderWidth: 0.3,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },

  itemCont: {
    flexDirection: 'row',
    gap: horizontalScale(15),
    margin: horizontalScale(10),
    // borderRadius: 35,
  },

  imageCont: {
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(22),
    resizeMode: 'cover',
    borderRadius: 10,
  },

  newsDetailCont: {
    flex: 1,
    justifyContent: 'center',
  },

  heading: {
    fontSize: responsiveFontSize(14),
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },

  rightActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 0.5,
    overflow: 'hidden',
  },

  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
});
