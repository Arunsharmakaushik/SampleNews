import React, {FC} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FONTS from '../../assets/fonts/indec';
import {BackIcon} from '../../assets/icons';
import ScreenWrapper from '../../components/wrapper/ScreenWrapper';
import COLORS from '../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';
import {DrawerStackParams} from '../../typings/route';
import {DrawerScreenProps} from '@react-navigation/drawer';

type AboutProps = DrawerScreenProps<DrawerStackParams, 'about'>;

const About: FC<AboutProps> = ({navigation}) => {
  return (
    <ScreenWrapper
      StatusBarColor={COLORS.white}
      contentColor="dark-content"
      Styles={Styles.main}>
      <View style={Styles.headerCont}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={Styles.centerText}>About Us</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={Styles.paraText}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi dicta
          esse ex! Incidunt, nam quaerat! Animi porro minus quis ad amet magni
          repudiandae officia voluptatem aliquid ipsum non vel cum quasi fugiat
          modi, nostrum eveniet odio dolore dolorum? Nemo, minima? Repellat esse
          ipsum totam minus, cum suscipit obcaecati laudantium, deleniti
          corporis voluptatum nobis quis? Et quas atque tempore quibusdam
          aliquam iure exercitationem pariatur culpa quo quos laboriosam,
          numquam quam debitis consequatur quaerat distinctio reiciendis, magni
          nobis accusamus assumenda, veritatis officia impedit enim. Quasi
          dolores vero error fugiat exercitationem. Quasi aliquid corporis
          voluptas voluptatum itaque voluptatibus ipsa quia suscipit vitae ea!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          suscipit praesentium ex neque illo sunt incidunt autem aliquam aliquid
          provident id inventore maiores natus ullam possimus quasi architecto,
          iure soluta? Odio ab nemo unde excepturi ullam assumenda sunt libero
          architecto. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Expedita quod fugiat, obcaecati nisi maxime pariatur eum, voluptates
          mollitia ab ratione eligendi nemo vero. Praesentium perspiciatis,
          error eligendi recusandae fugiat corporis ipsa quia odit mollitia
          alias unde eum, animi harum aliquam officiis temporibus, ex
          exercitationem debitis aliquid! Iste voluptatum ea fuga nisi
          consectetur? Quia nam animi nobis tempora accusamus error mollitia
          quam. Dolorem ratione nam deserunt amet excepturi unde ad! Consequatur
          alias quae modi dolor nobis unde repellendus distinctio reprehenderit
          cupiditate molestiae, itaque, cumque pariatur vel suscipit provident
          nostrum repudiandae numquam quam sint eaque, a similique possimus in
          voluptatum! Aliquam, corrupti.
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default About;

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    gap: verticalScale(20),
    backgroundColor: COLORS.white,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
  },

  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  centerText: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: responsiveFontSize(18),
    color: COLORS.black,
    textAlign: 'center',
  },
  paraText: {
    fontFamily: FONTS.regular,
    fontSize: responsiveFontSize(15),
  },
});
