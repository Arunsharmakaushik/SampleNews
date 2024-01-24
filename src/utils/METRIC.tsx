import { Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

//These are likely the width and height of the screen used by the designer for creating the app's UI
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const IS_TABLET = isTablet();

// . It's useful for scaling widths and horizontal margins/paddings.
const horizontalScale = (size: number) =>
  (deviceWidth / guidelineBaseWidth) * size;

// . It's useful for heights and vertical margins/paddings.
const verticalScale = (size: number) =>
  (deviceHeight / guidelineBaseHeight) * size;

// Adjusts the font size for different screen sizes. It starts with a base size and increases it slightly on larger screens.
const responsiveFontSize = (size: number) => {
  const factor = 0.5;
  return size + (horizontalScale(size) - size) * factor;
};

// Returns different sizes based on whether the device is a tablet or not.
// This is useful when you want a larger size on tablets and a smaller one on phones.
const deviceSpecificSize = (tabletSize: number, mobileSize: number) => {
  return IS_TABLET ? tabletSize : mobileSize;
};

export {
  responsiveFontSize,
  horizontalScale,
  verticalScale,
  deviceSpecificSize,
  deviceHeight,
  deviceWidth,
};