import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FONTS from '../../../assets/fonts/indec';
import {ProfileData} from '../../../seeds/ProfileData';
import {IProfileBottomCard} from '../../../typings/common';
import COLORS from '../../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';

const BottomCardItem = React.memo(({item}: {item: IProfileBottomCard}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.itemCont}>
      {item.icon}
      <Text style={styles.itemText}>{item.title}</Text>
      <AntIcon name="right" size={20} color={COLORS.blue} />
    </TouchableOpacity>
  );
});

const BottomCard = () => {
  const keyExtractor = useCallback(
    (item: IProfileBottomCard, index: number) => item.title.toString() + index,
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: IProfileBottomCard}) => <BottomCardItem item={item} />,
    [],
  );

  return (
    <FlatList
      data={ProfileData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listCont}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default BottomCard;

const styles = StyleSheet.create({
  listCont: {gap: horizontalScale(15), paddingBottom: verticalScale(5)},
  itemCont: {
    flexDirection: 'row',
    borderRadius: 10,
    width: widthPercentageToDP(90),
    backgroundColor: COLORS.lightBlue,
    padding: horizontalScale(16),
    gap: horizontalScale(15),
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: responsiveFontSize(14),
  },
});
