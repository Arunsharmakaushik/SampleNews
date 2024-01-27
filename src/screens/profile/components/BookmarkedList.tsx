import {DrawerNavigationProp} from '@react-navigation/drawer';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import FONTS from '../../../assets/fonts/indec';
import {NewsData} from '../../../seeds/NewsData';
import {INewsData} from '../../../typings/common';
import {DrawerStackParams} from '../../../typings/route';
import COLORS from '../../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';

const BookMarkedItem = React.memo(
  ({item, onPress}: {item: INewsData; onPress: () => void}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.itemCont}>
        <ImageBackground
          source={{uri: 'https://c.biztoc.com/p/290cf493be42d48a/og.webp'}}
          style={styles.imageCont}
        />
        <Text style={styles.heading}>{item.title}</Text>
      </TouchableOpacity>
    );
  },
);

const BookmarkedList = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<DrawerStackParams>;
}) => {
  const keyExtractor = React.useCallback(
    (item: INewsData, index: number) => `${item.title + index}`,
    [],
  );

  const renderItem = ({item}: {item: INewsData}) => (
    <BookMarkedItem
      item={item}
      onPress={() => navigation.navigate('newsArticle')}
    />
  );

  return (
    <FlatList
      data={NewsData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      contentContainerStyle={styles.listCont}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default BookmarkedList;

const styles = StyleSheet.create({
  listCont: {
    gap: horizontalScale(25),
    paddingBottom: verticalScale(5),
  },
  itemCont: {
    borderRadius: 15,
    overflow: 'hidden',
    width: widthPercentageToDP(90),
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
  imageCont: {
    height: heightPercentageToDP(20),
    resizeMode: 'cover',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
  },

  newsDetailCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(5),
  },

  blueDot: {
    height: heightPercentageToDP(1.5),
    width: widthPercentageToDP(3),
    backgroundColor: COLORS.blue,
    borderRadius: 100,
    marginRight: horizontalScale(4),
  },
  heading: {
    fontSize: responsiveFontSize(16),
    fontFamily: FONTS.medium,
    color: COLORS.black,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
  },

  category: {
    fontSize: responsiveFontSize(16),
    fontFamily: FONTS.semiBold,
    color: COLORS.Grey,
  },
});
