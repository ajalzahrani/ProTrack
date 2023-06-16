import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from 'src/assets';
import Divider from 'src/components/shared/Divider';

import CardRowCP from './CardRowCP';
import CardRowDate from './CardRowDate';
import CardRowText from './CardRowText';

type CardInformationHCType = {
  title: string;
  rows: {
    picker: 'picker' | 'date' | 'text';
    header: string;
    items?: string[];
    value?: string | string[] | Date;
    setValue?: (value: string) => void;
    message?: string;
  }[];
};
const CardInformationHC = ({title, rows}: CardInformationHCType) => {
  const generateRows = () => {
    const generatedRows = rows.map((row, i) => {
      switch (row.picker) {
        case 'picker':
          return (
            <CardRowCP
              key={i}
              header={row.header}
              items={row.items ? row.items : []}
              value={typeof row.value === 'string' ? row.value : ''}
              setValue={row.setValue ? row.setValue : () => {}}
            />
          );
        case 'date':
          if (row.value !== undefined && row.value instanceof Date) {
            return <CardRowDate key={i} header={row.header} dob={row.value} />;
          }
        case 'text':
          if (row.value !== undefined && typeof row.value === 'string') {
            return (
              <CardRowText
                key={i}
                header={row.header}
                text={row.value}
                message={row.message ? row.message : ''}
              />
            );
          }
      }
    });
    const finalRows = Array.from({length: generatedRows.length * 2 - 1});
    for (let i = 0; i < generatedRows.length; i++) {
      finalRows[i * 2] = generatedRows[i];
      if (i !== generatedRows.length - 1) {
        finalRows[i * 2 + 1] = <Divider key={`divider-${i}`} />;
      }
    }

    return finalRows;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContainer}>{generateRows()}</View>
    </View>
  );
};

export default CardInformationHC;

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
  containerr: {
    flex: 1,
    // height: '100%',
    // width: '100%',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
