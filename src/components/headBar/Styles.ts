import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/METRIC';
import COLORS from '../../utils/COLORS';

const Styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
  },
  profileandSearchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(20),
  },
  profileImage: {
    height: verticalScale(40),
    width: horizontalScale(40),
    resizeMode: 'cover',
  },
});

export default Styles;
