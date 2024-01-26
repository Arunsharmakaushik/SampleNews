import React, {FC} from 'react';
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
import FONTS from '../../../assets/fonts/indec';
import {BookmarkIcon, ShareIcon} from '../../../assets/icons';
import {NewsData} from '../../../seeds/NewsData';
import {INewsData} from '../../../typings/common';
import COLORS from '../../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';

type ISearchListProps = {
  onItemPress: () => void;
};

const SearchedList: FC<ISearchListProps> = ({onItemPress}) => {
  const keyExtractor = (item: INewsData, index: number) => item.title + index;

  const renderRightActions = () => {
    const ICON_SIZE = horizontalScale(30);

    return (
      <View style={styles.rightActionsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={[styles.actionButton, {backgroundColor: COLORS.blue}]}>
          <BookmarkIcon style={{width: ICON_SIZE, height: ICON_SIZE}} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={[styles.actionButton, {backgroundColor: COLORS.red}]}>
          <ShareIcon style={{width: ICON_SIZE, height: ICON_SIZE}} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}: {item: INewsData}) => {
    return (
      <Swipeable
        overshootRight={false}
        renderRightActions={renderRightActions}
        containerStyle={styles.swipeableCont}>
        <TouchableOpacity onPress={onItemPress} style={styles.itemCont}>
          <Image
            source={{
              uri: 'https://c.biztoc.com/p/290cf493be42d48a/og.webp',
            }}
            style={styles.imageCont}
          />
          <View style={styles.newsDetailCont}>
            <Text style={styles.heading}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };
  return (
    <FlatList
      data={NewsData}
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

  swipeableCont: {
    backgroundColor: COLORS.white,
    width: widthPercentageToDP(90),
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },

  itemCont: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    gap: horizontalScale(15),
    padding: horizontalScale(16),
    borderRadius: 35,
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
    borderTopEndRadius: 35,
    borderBottomEndRadius: 35,
    overflow: 'hidden',
  },

  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
});
