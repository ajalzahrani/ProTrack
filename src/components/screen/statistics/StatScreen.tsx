import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {colors} from 'src/assets/theme';
import ProgressView from './components/ProgressView';
import HistoryView from './components/HistoryView';
import StatisticView from './components/StatisticView';
import ScreenContainer from 'src/components/shared/ScreenContainer';

const HistoryRoute = () => {
  return <HistoryView />;
};
const StatisticRoute = () => {
  return <StatisticView />;
};
const ProgressRoute = () => {
  return <ProgressView />;
};
const renderScene = SceneMap({
  history: HistoryRoute,
  progress: ProgressRoute,
  statistic: StatisticRoute,
});

const StatScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'History'},
    {key: 'second', title: 'Progress'},
    {key: 'third', title: 'Statistic'},
  ]);

  return (
    <ScreenContainer>
      <TabView
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={SceneMap({
          first: HistoryView,
          second: ProgressView,
          third: StatisticView,
        })}
      />
    </ScreenContainer>
  );
};

export default StatScreen;
