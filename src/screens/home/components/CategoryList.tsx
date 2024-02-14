import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {
  horizontalScale,
  responsiveFontSize,
  verticalScale,
} from '../../../utils/METRIC';
import {CategoryType} from '../../../seeds/CategoryData';
import FONTS from '../../../assets/fonts/indec';
import COLORS from '../../../utils/COLORS';
import {Categories, ICategoryType} from '../../../typings/common';

type ICategoryListProps = {
  category: Categories;
  setCategory: Dispatch<SetStateAction<Categories>>;
};

const CategoryList: FC<ICategoryListProps> = ({category, setCategory}) => {
  const keyExtractor = (item: ICategoryType) => item.name;

  const renderList = ({item}: {item: ICategoryType}) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity
          onPress={() => setCategory(item.name)}
          style={[
            styles.itemIconCont,
            {
              backgroundColor:
                category === item.name ? COLORS.blue : COLORS.lightGrey,
            },
          ]}>
          {category === item.name ? item.selectedIcon : item.icon}
        </TouchableOpacity>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={CategoryType}
      renderItem={renderList}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listCont}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  listCont: {
    gap: horizontalScale(25),
    paddingHorizontal: horizontalScale(15),
    backgroundColor: COLORS.white,
    paddingBottom: verticalScale(30),
  },
  listItem: {
    flex: 1,
    alignItems: 'center',
    gap: verticalScale(5),
  },
  itemIconCont: {
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(15),
    borderRadius: 10,
  },
  itemText: {
    fontSize: responsiveFontSize(12),
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
  },
});
