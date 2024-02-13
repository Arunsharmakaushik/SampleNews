import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../utils/METRIC';
import COLORS from '../../utils/COLORS';

const Styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginBottom: verticalScale(10),
  },
  profileandSearchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(20),
  },
  profileIocn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    paddingHorizontal: horizontalScale(14),
    paddingVertical: verticalScale(10),
    borderRadius: 100,
    color: COLORS.white,
    fontSize: responsiveFontSize(13),
  },
});

export default Styles;
