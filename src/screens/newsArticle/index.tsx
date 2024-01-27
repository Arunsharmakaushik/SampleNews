import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {FC} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import FONTS from '../../assets/fonts/indec';
import {BackIcon, BlueBookmarkIcon, BlueShareIcon} from '../../assets/icons';
import {DrawerStackParams} from '../../typings/route';
import COLORS from '../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';

type NewsArticleProps = DrawerScreenProps<DrawerStackParams, 'newsArticle'>;

const NewsArticle: FC<NewsArticleProps> = ({navigation}) => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.headerCont}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <Image
          source={{uri: 'https://c.biztoc.com/p/290cf493be42d48a/og.webp'}}
          style={styles.imageContainer}
        />
        <View style={styles.utilsContainer}>
          <Text style={styles.categoryText}>Sports</Text>
          <View style={styles.actionContainer}>
            <TouchableOpacity>
              <BlueShareIcon />
            </TouchableOpacity>
            <TouchableOpacity>
              <BlueBookmarkIcon />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.headerText}>
          Football New Pandemic-Related Rules for 2021
        </Text>
        <Text style={styles.subHeaderText}>
          Football New Pandemic-Related Rules for 2021
        </Text>
        <Text style={styles.paraText}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta esse
          odit et sint enim maxime labore omnis quaerat vitae nihil ut aliquam,
          eos amet natus distinctio alias expedita laboriosam neque eveniet, quo
          libero cupiditate. In, assumenda laudantium est natus consequuntur id.
          Iure, quos. Aperiam reprehenderit inventore dolores sequi nemo
          voluptatibus fuga veritatis magni quam, architecto est voluptas
          repudiandae quaerat iusto, minus placeat quasi iure. Voluptatem
          nostrum eaque commodi, doloribus ad quam quasi nemo unde molestias
          esse eveniet facere tempore ipsam, itaque blanditiis sed illo iure
          repellendus rem. Possimus autem consequatur quos doloremque fugit
          perspiciatis recusandae laborum eaque est id! Autem dolores possimus
          dicta velit dolorem placeat voluptatem ipsam! Blanditiis nobis animi
          dolorum a illo iste corporis explicabo nam aperiam facere sunt ipsam
          eaque atque qui repudiandae quas, provident iure quo, eius cupiditate
          dignissimos quod maiores nostrum consectetur. Obcaecati natus ut
          beatae consequuntur quo asperiores, illo vitae tempore necessitatibus
          accusamus culpa aspernatur ipsum incidunt aut dolor ea, molestiae
          mollitia cum adipisci ipsam in reiciendis! Quas deleniti, nisi modi,
          beatae reprehenderit culpa odio non dolorum rem alias eius. Hic
          accusamus earum, porro sunt possimus, vitae voluptatum vero sit omnis
          tempora suscipit necessitatibus at assumenda quaerat sed commodi
          blanditiis reiciendis, cupiditate modi nulla.{' '}
        </Text>
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
  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: horizontalScale(15),
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    height: heightPercentageToDP(35),
    width: '100%',
    resizeMode: 'contain',
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
