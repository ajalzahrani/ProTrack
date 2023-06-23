import React, {useState} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {ScreenContainer} from 'src/components/shared';
import ProgressView from './components/ProgressView';
import HistoryView from './components/HistoryView';
import StatisticView from './components/StatisticView';

const TabViewExample = () => {
  const [index, setIndex] = useState(0);

  const routes = [
    {key: 'history', title: 'History'},
    {key: 'progress', title: 'Progress'},
    {key: 'statistic', title: 'Statistic'},
  ];

  const handleIndexChange = index => {
    setIndex(index);
  };

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}
              key={i}>
              <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    history: HistoryView,
    progress: ProgressView,
    statistic: StatisticView,
  });

  return (
    <ScreenContainer>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: 'whtie',
    marginHorizontal: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 2,
    backgroundColor: 'white',
  },
});

export default TabViewExample;
