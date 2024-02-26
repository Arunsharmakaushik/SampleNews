import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP
} from 'react-native-responsive-screen';
import FONTS from '../../../assets/fonts/indec';
import { INewsData } from '../../../typings/common';
import { DrawerStackParams } from '../../../typings/route';
import COLORS from '../../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale
} from '../../../utils/METRIC';

const BookMarkedItem = React.memo(
  ({item, onPress}: {item: INewsData; onPress: () => void}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.itemCont}>
        <ImageBackground
          source={{
            uri:
              item.image ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSSu2i1o3fCtG2SLCH2_Xyr87h9__hrn9eQ&usqp=CAUs',
          }}
          style={styles.imageCont}
        />
        <Text style={styles.heading}>{item.title}</Text>
      </TouchableOpacity>
    );
  },
);

const BookmarkedList = ({
  navigation,
  data,
}: {
  navigation: DrawerNavigationProp<DrawerStackParams>;
  data: INewsData[];
}) => {
  const keyExtractor = React.useCallback(
    (item: INewsData, index: number) => `${item.title + index}`,
    [],
  );

  const renderItem = ({item}: {item: INewsData}) => (
    <BookMarkedItem
      item={item}
      onPress={() => navigation.navigate('newsArticle', {id: item._id})}
    />
  );

  return (
    <FlatList
      data={data}
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
    borderWidth:0.3,
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
