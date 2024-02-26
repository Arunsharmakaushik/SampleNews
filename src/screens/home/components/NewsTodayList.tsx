import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP
} from 'react-native-responsive-screen';
import FONTS from '../../../assets/fonts/indec';
import { INewsData } from '../../../typings/common';
import { DrawerStackParams } from '../../../typings/route';
import COLORS from '../../../utils/COLORS';
import { getTimeDifference } from '../../../utils/Helpers';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale
} from '../../../utils/METRIC';

const NewsItem = React.memo(
  ({item, onPress}: {item: INewsData; onPress: () => void}) => {
    const timeDiff = getTimeDifference(item.published_at);
    const categoryName =
      item.category_id.charAt(0).toUpperCase() + item.category_id.slice(1);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.itemCont}>
        <ImageBackground
          source={{
            uri:
              item.image ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSSu2i1o3fCtG2SLCH2_Xyr87h9__hrn9eQ&usqp=CAU',
          }}
          style={styles.imageCont}
        />
        <View style={styles.newsDetailCont}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
          <View style={styles.blueDot} /> 
          <Text style={styles.category}>
            {categoryName}
          </Text>
          </View>
      
          <Text>{timeDiff}</Text>
        </View>
        <Text style={styles.heading}>{item.title}</Text>
      </TouchableOpacity>
    );
  },
);

const NewsTodayList = ({
  navigation,
  articles,
}: {
  navigation: DrawerNavigationProp<DrawerStackParams>;
  articles: INewsData[];
}) => {
  const keyExtractor = React.useCallback(
    (item: INewsData, index: number) => `${item.title + index}`,
    [],
  );

  const renderItem = ({item}: {item: INewsData}) => (
    <NewsItem
      item={item}
      onPress={() => navigation.navigate('newsArticle', {id: item._id})}
    />
  );

  return (
    <FlatList
      data={articles}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      contentContainerStyle={styles.listCont}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default NewsTodayList;

const styles = StyleSheet.create({
  listCont: {gap: horizontalScale(25), paddingBottom: verticalScale(5)},
  itemCont: {
    borderRadius: 15,
    overflow: 'hidden',
    width: widthPercentageToDP(90),
    backgroundColor: COLORS.white,
    borderWidth:0.2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
  imageCont: {
    height: heightPercentageToDP(24),
    width: widthPercentageToDP(90),
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
    height: 12,
    width: 12,
    backgroundColor: COLORS.blue,
    borderRadius: 100,
    marginRight: 3,
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
