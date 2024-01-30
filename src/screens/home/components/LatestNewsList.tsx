import {DrawerNavigationProp} from '@react-navigation/drawer';
import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import {getTimeDifference} from '../../../utils/Helpers';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';

const NewsListItem = React.memo(
  ({item, onPress}: {item: INewsData; onPress: () => void}) => {
    const timeDiff = getTimeDifference(item.published_at);
    const categoryName =
      item.category_id.charAt(0).toUpperCase() + item.category_id.slice(1);

    return (
      <TouchableOpacity onPress={onPress} style={styles.itemCont}>
        <Image
          source={{
            uri:
              item.image || 'https://c.biztoc.com/p/290cf493be42d48a/og.webp',
          }}
          style={styles.imageCont}
        />
        <View style={styles.newsDetailCont}>
          <Text style={styles.heading}>{item.title}</Text>
          <View style={styles.categoryTimeCont}>
            <Text style={styles.category}>{categoryName}</Text>
            <Text>{timeDiff}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const LatestNewsList = ({
  navigation,
  latestArticles,
}: {
  navigation: DrawerNavigationProp<DrawerStackParams>;
  latestArticles: INewsData[];
}) => {
  const [data, setData] = useState<INewsData[]>(latestArticles);
  const [loading, setLoading] = useState(false);

  const loadMoreData = useCallback(async () => {
    if (loading || data.length >= 15) return;

    setLoading(true);

    setTimeout(async () => {
      setData(prevData => {
        const availableSpace = 15 - prevData.length;
        const itemsToAdd = NewsData.slice(0, availableSpace);

        return [...prevData, ...itemsToAdd];
      });

      setLoading(false);
    }, 3000);
  }, [loading, data.length]);

  const keyExtractor = useCallback(
    (item: INewsData, index: number) => item.title.toString() + index,
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: INewsData}) => (
      <NewsListItem
        item={item}
        onPress={() => navigation.navigate('newsArticle')}
      />
    ),
    [],
  );

  const footerComponent = useMemo(
    () => (loading ? <ActivityIndicator size="large" /> : null),
    [loading],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listCont}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={footerComponent}
    />
  );
};

export default LatestNewsList;

const styles = StyleSheet.create({
  listCont: {gap: horizontalScale(15), paddingBottom: verticalScale(5)},
  itemCont: {
    flexDirection: 'row',
    borderRadius: 15,
    width: widthPercentageToDP(90),
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    padding: horizontalScale(16),
    gap: horizontalScale(15),
  },
  imageCont: {
    height: heightPercentageToDP(12),
    width: widthPercentageToDP(25),
    resizeMode: 'cover',
    borderRadius: 10,
  },

  newsDetailCont: {
    flex: 1,
    justifyContent: 'space-between',
  },

  categoryTimeCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  heading: {
    fontSize: responsiveFontSize(14),
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },

  category: {
    fontSize: responsiveFontSize(10),
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    backgroundColor: COLORS.blue,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(5),
    borderRadius: 50,
  },
});
