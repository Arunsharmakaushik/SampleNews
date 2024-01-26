import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {BlueBookmarkIcon, BlueShareIcon} from '../../assets/icons';
import COLORS from '../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';
import FONTS from '../../assets/fonts/indec';

const NewsArticle = () => {
  return (
    <ScrollView style={styles.scrollCont}>
      <View style={styles.main}>
        <Image
          source={{
            uri: 'https://c.biztoc.com/p/290cf493be42d48a/og.webp',
          }}
          style={styles.imageCont}
        />
        <View style={styles.utilsCont}>
          <Text style={styles.categoryText}>Sports</Text>
          <View style={styles.actionCont}>
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt
          expedita eius, cum sint quaerat culpa, dolore non quas voluptatem
          dolor voluptates natus voluptate fuga ipsa autem facere dignissimos,
          nihil adipisci distinctio minima amet delectus aliquam. Facilis
          officia, quas in magnam autem pariatur repudiandae ullam similique
          nesciunt natus, obcaecati rerum minus suscipit nihil unde officiis.
          Incidunt obcaecati maxime minima nesciunt saepe et, in illo reiciendis
          quasi explicabo accusantium quaerat, praesentium facere quisquam
          cumque sunt hic blanditiis, amet fugit ipsa? Quo blanditiis facilis
          minus! Exercitationem deserunt cumque fuga accusantium voluptatum
          incidunt culpa ex vitae dolore corrupti ut quae ipsum itaque quasi
          quos, aliquid totam fugit odio in sequi iusto molestiae libero
          nostrum. Necessitatibus, repellendus! Perspiciatis officiis dolorum
          saepe veniam, quas asperiores rem cum illum nemo libero accusantium
          voluptas nihil voluptatum deserunt vel delectus dignissimos, iusto
          ullam nobis qui ratione. Voluptatem, soluta esse obcaecati maiores,
          eaque assumenda labore porro, quod non suscipit incidunt odit
          perferendis numquam quia odio quo corrupti sint voluptate nemo eum
          deserunt? Nobis consectetur inventore ex ipsum ratione reprehenderit
          quis facere molestiae deserunt quibusdam. Perferendis modi beatae
          consequuntur, deleniti eius ipsam ipsa possimus nulla. Voluptatibus
          vitae commodi, excepturi laborum quas, sapiente aspernatur harum illo
          debitis a consequuntur beatae! Exercitationem, quam.
        </Text>
      </View>
    </ScrollView>
  );
};

export default NewsArticle;

const styles = StyleSheet.create({
  scrollCont: {flex: 1},
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    alignItems: 'center',
    gap: verticalScale(10),
  },
  imageCont: {
    height: heightPercentageToDP(35),
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },

  utilsCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  actionCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
