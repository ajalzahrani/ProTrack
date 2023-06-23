import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {colors} from 'src/assets';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {
  VictoryArea,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native';
import {ScreenContainer} from 'src/components/shared';
import ScreenContainerScroll from 'src/components/shared/ScreenContainerScroll';

const data = {
  labels: ['Jan', 'February', 'March', 'April', 'May', 'June', 'Jul'],
  datasets: [
    {
      data: [10, 45, 28, 80, 99, 43],
    },
  ],
};

const LineChart2 = props => {
  const data = [
    {x: 'Mon', y: 150},
    {x: 'Tue', y: 230},
    {x: 'Wed', y: 224},
    {x: 'Thu', y: 218},
    {x: 'Fri', y: 135},
    {x: 'Sat', y: 147},
    {x: 'sun', y: 260},
  ];
  return (
    <View>
      <VictoryChart theme={VictoryTheme.material} height={250} width={400}>
        <VictoryArea
          style={{data: {fill: 'rgba(230, 231, 231,0.8)'}}}
          data={data}
          animate={{
            duration: 2000,
            onLoad: {duration: 1000},
          }}
        />
        <VictoryLine
          data={data}
          style={{data: {stroke: '#d6d6d7', strokeWidth: 2}}}
        />
        <VictoryScatter
          data={data}
          size={4}
          style={{data: {fill: '#24262a'}}}
        />
      </VictoryChart>
    </View>
  );
};

const ProgressView = () => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <ScreenContainerScroll>
      <LineChart
        data={{
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        // data={data}
        // width={Dimensions.get('window').width} // from react-native
        width={screenWidth} // from react-native
        height={320}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          ackgroundGradientFrom: '#fff',
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: '#fff',
          backgroundGradientToOpacity: 0.5,
          // backgroundColor: '#e26a00',
          // backgroundGradientFrom: '#fb8c00',
          // backgroundGradientTo: '#ffa726',
          // decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            // margin: 20,
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            // stroke: '#ffa726',
            stroke: colors.red,
          },
        }}
        bezier
        style={{
          marginVertical: 10,
          borderRadius: 16,
          margin: 20,
        }}
      />
      <LineChart2 />
    </ScreenContainerScroll>
  );
};

export default ProgressView;
