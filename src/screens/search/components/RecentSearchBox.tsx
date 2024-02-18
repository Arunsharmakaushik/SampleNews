import React, {FC, useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FONTS from '../../../assets/fonts/indec';
import {GoToIcon, LinkIcon} from '../../../assets/icons';
import COLORS from '../../../utils/COLORS';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';

type IRecentSearchProps = {
  recentSearches: string[];
  onItemPress: (searchWord: string) => void;
};

const RecentSearchBox: FC<IRecentSearchProps> = ({
  recentSearches,
  onItemPress,
}) => {
  const renderItem = useCallback(
    ({item}: {item: string}) => (
      <TouchableOpacity
        onPress={() => {
          onItemPress(item);
        }}
        style={styles.itemCont}>
        <LinkIcon />
        <Text style={styles.itemText}>{item}</Text>
        <GoToIcon />
      </TouchableOpacity>
    ),
    [onItemPress],
  );

  const keyExtractor = useCallback((item: string) => item, []);

  return (
    <View style={styles.main}>
      <FlatList
        data={recentSearches.reverse().slice(0, 5)}
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
