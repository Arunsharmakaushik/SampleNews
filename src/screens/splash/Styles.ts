import {StyleSheet} from 'react-native';
import COLORS from '../../utils/COLORS';
import {responsiveFontSize} from '../../utils/METRIC';
import FONTS from '../../assets/fonts/indec';

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
  },
  text: {
    fontSize: responsiveFontSize(35),
    fontWeight: 'bold',
    color: COLORS.white,
    fontFamily: FONTS.extraBold,
  },
});

export default Styles;
