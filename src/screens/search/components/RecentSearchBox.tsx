import React, {FC} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FONTS from '../../../assets/fonts/indec';
import {GoToIcon, LinkIcon} from '../../../assets/icons';
import COLORS from '../../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';

type IRecentSerchProps = {
  onItemPress: () => void;
};

const RecentSearchBox: FC<IRecentSerchProps> = ({onItemPress}) => {
  const keyExtractor = (item: string, index: number) => item + index;

  const renderItem = ({item}: {item: string}) => {
    return (
      <TouchableOpacity onPress={onItemPress} style={styles.itemCont}>
        <LinkIcon />
        <Text style={styles.itemText}>{item}</Text>
        <GoToIcon />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <FlatList
        data={['FootBall', 'Sports', 'Crime', 'Music', 'Style']}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listCont}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RecentSearchBox;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    gap: verticalScale(20),
  },
  listCont: {gap: horizontalScale(15), paddingBottom: verticalScale(5)},
  itemCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(15),
  },
  itemText: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: responsiveFontSize(15),
    color: COLORS.Grey,
  },
});
