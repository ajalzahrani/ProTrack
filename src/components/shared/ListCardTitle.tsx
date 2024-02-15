import {Text, StyleSheet, ViewStyle, View} from 'react-native';
import React from 'react';
import ListCard from 'src/components/shared/ListCard';
import {colors} from 'src/assets';

type propType = {
  title: string;
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

const ListCardTitle = ({title, children, style}: propType) => {
  return (
    <ListCard style={style}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
      {children}
    </ListCard>
  );
};

export default ListCardTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
    color: colors.white,
  },
});
