import { StyleSheet } from 'react-native';
import COLORS from '../../utils/COLORS';
import {
  horizontalScale, verticalScale
} from '../../utils/METRIC';

const Styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(15),
    paddingBottom: verticalScale(15),
    paddingTop: verticalScale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
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
    height:30,
    width:30,
    borderRadius:100,
  },
});

export default Styles;
