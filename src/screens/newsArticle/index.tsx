import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FONTS from '../../assets/fonts/indec';
import {BackIcon, BlueBookmarkIcon, BlueShareIcon} from '../../assets/icons';
import {INewsData} from '../../typings/common';
import {DrawerStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import {formatDateCustom} from '../../utils/Helpers';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';
import {storage} from '../../utils/Storage';

const ArticleHeader = React.memo(({onPressBack}: {onPressBack: () => void}) => (
  <View style={styles.headerCont}>
    <TouchableOpacity onPress={onPressBack}>
      <BackIcon />
    </TouchableOpacity>
  </View>
));

const NewsArticle: FC<DrawerScreenProps<DrawerStackParams, 'newsArticle'>> = ({
  navigation,
  route,
}) => {
  const {id} = route.params;
  const [articleData, setArticleData] = useState<INewsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchArticleData = async () => {
    setIsLoading(true);
    fetch(`https://news-node-beta.vercel.app/api/article/${id}`)
      .then(res => res.json())
      .then(res => setArticleData(res))
      .catch(() => {
        setError('No Data Available');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchArticleData();
    return () => {
      setArticleData(null);
    };
  }, [id]);

  const handleToggleBookmark = () => {
    if (storage.getBookmarks()?.includes(id)) {
      const updatedBookmarks = storage
        .getBookmarks()
        ?.filter(bookmarkId => bookmarkId !== id);
      console.log(updatedBookmarks);

      storage.updateBookmarks(updatedBookmarks!);
    } else {
      console.log(id);
      storage.setBookmarks(id);
    }
  };

  const isBookmarked = useMemo(
    () => storage.getBookmarks()?.includes(id),
    [storage.getBookmarks()],
  );

  const renderBookmarkIcon = useMemo(() => {
    return (
      <TouchableOpacity onPress={handleToggleBookmark}>
        {isBookmarked ? (
          <IonIcons name="bookmark" color={COLORS.blue} size={25} />
        ) : (
          <BlueBookmarkIcon />
        )}
      </TouchableOpacity>
    );
  }, [isBookmarked]);

  if (isLoading)
    return (
      <View style={styles.loadingCont}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </View>
    );

  if (error) return <Text>{error}</Text>;

  return (
    <ScrollView style={styles.scrollContainer}>
      <ArticleHeader onPressBack={() => navigation.goBack()} />
      <View style={styles.mainContainer}>
        <Image
          source={{
            uri:
              articleData?.image ||
              'https://c.biztoc.com/p/290cf493be42d48a/og.webp',
          }}
          style={styles.imageContainer}
        />
        <View style={styles.utilsContainer}>
          <Text style={styles.categoryText}>{articleData?.category_id}</Text>
          <View style={styles.actionContainer}>
            <TouchableOpacity>
              <BlueShareIcon />
            </TouchableOpacity>
            {renderBookmarkIcon}
          </View>
        </View>
        <Text style={styles.headerText}>{articleData?.title}</Text>
        <Text style={styles.subHeaderText}>
          {articleData?.author && `By ${articleData.author}-`}
          {articleData?.published_at &&
            formatDateCustom(articleData.published_at)}
        </Text>
        <Text style={styles.paraText}>{articleData?.description}</Text>
      </View>
    </ScrollView>
  );
};

export default NewsArticle;

const styles = StyleSheet.create({
  scrollContainer: {flex: 1},
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    alignItems: 'center',
    gap: verticalScale(10),
  },
  loadingCont: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    height: heightPercentageToDP(35),
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 2,
  },
  utilsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: verticalScale(10),
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(20),
  },

  categoryText: {
    backgroundColor: COLORS.blue,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(25),
    color: COLORS.white,
    borderRadius: 20,
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: responsiveFontSize(20),
    color: COLORS.black,
    paddingRight: horizontalScale(60),
  },
  subHeaderText: {
    fontFamily: FONTS.regular,
    fontSize: responsiveFontSize(11),
    color: COLORS.blue,
    alignSelf: 'flex-start',
  },

  paraText: {
    fontFamily: FONTS.regular,
    fontSize: responsiveFontSize(12),
    color: COLORS.Grey,
    textAlign: 'justify',
  },
});
