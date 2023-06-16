import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {colors} from 'src/assets';
import Divider from 'src/components/shared/Divider';

type CardRowType = {
  header: string;
  value: string | number;
};
const CardRow: React.FC<CardRowType> = ({header, value}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.cardRowContainer}>
      <Text style={styles.cardRowText}>{t(header)}</Text>
      <Text style={styles.cardRowText}>{t(value.toString())}</Text>
    </View>
  );
};

type CardInformationType = {
  title: string;
  rows: CardRowType[];
};
const CardInformation = ({title, rows}: CardInformationType) => {
  const generateCardRow = () => {
    const generatedRows = [];
    for (let i = 0; i < rows.length; i++) {
      if (i === rows.length - 1) {
        generatedRows.push(
          <CardRow key={i} header={rows[i].header} value={rows[i].value} />,
        );
      } else {
        generatedRows.push(
          <>
            <CardRow key={i} header={rows[i].header} value={rows[i].value} />
            <Divider />
          </>,
        );
      }
    }
    return generatedRows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContainer}>{generateCardRow()}</View>
    </View>
  );
};

export default CardInformation;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 20,
  },
  cardContainer: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: colors.offwhite,
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.white,
  },
  cardRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    flexGrow: 0,
  },
  cardRowText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
});
