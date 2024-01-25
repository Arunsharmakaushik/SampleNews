import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {INewsData} from '../../../typings/common';
import {NewsData} from '../../../seeds/NewsData';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';
import {getTimeDifference} from '../../../utils/Helpers';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import COLORS from '../../../utils/COLORS';
import FONTS from '../../../assets/fonts/indec';

const LatestNewsList = () => {
  const keyExtractor = (item: INewsData, index: number) => item.title + index;
  const [data, setData] = useState(NewsData);
  const [loading, setLoading] = useState(false);

  const loadMoreData = async () => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        const newData = [...data, ...data.splice(0, 2)];
        setData(newData);
        setLoading(false);
      }, 300);
    }
  };

  const renderList = ({item}: {item: INewsData}) => {
    return (
      <View style={styles.itemCont}>
        <Image
          source={{
            uri: 'https://c.biztoc.com/p/290cf493be42d48a/og.webp',
          }}
          style={styles.imageCont}
        />

        <View style={styles.newsDetailCont}>
          <Text style={styles.heading}>
            News of marathon matches during this pandemic
          </Text>
          <View style={styles.categoryTimeCont}>
            <Text style={styles.category}>
              {item.category_id.charAt(0).toUpperCase() +
                item.category_id.slice(1)}
            </Text>
            <Text>{getTimeDifference(item.published_at)}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderList}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listCont}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5} // Threshold for calling onEndReached
      ListFooterComponent={() =>
        loading ? <ActivityIndicator size="large" /> : null
      }
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
