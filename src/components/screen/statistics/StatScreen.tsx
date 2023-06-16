import {View, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {colors} from 'src/assets/theme';
import ProgressView from './components/ProgressView';
import HistoryView from './components/HistoryView';
import StatisticView from './components/StatisticView';
import ScreenContainer from 'src/components/shared/ScreenContainer';

const StatScreen = () => {
  // FIXME: Adjust the design
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderView = () => {
    if (selectedIndex == 0) {
      return <HistoryView />;
    } else if (selectedIndex == 1) {
      return <ProgressView />;
    } else if (selectedIndex == 2) {
      return <StatisticView />;
    }
  };

  return (
    <ScreenContainer children={''}>
      {/* <SegmentedControl
        values={['History', 'Progress', 'Statistic']}
        selectedIndex={selectedIndex}
        onChange={event => {
          // FIXME: maybe because of bellow line
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        backgroundColor={colors.offwhite}
        appearance="light"
        tabStyle={{marginTop: 10, marginHorizontal: 50, marginBottom: 15}}
      /> */}
      {renderView()}
    </ScreenContainer>
  );
};

export default StatScreen;
