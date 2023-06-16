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

const data = {
  labels: ['Jan', 'February', 'March', 'April', 'May', 'June', 'Jul'],
  datasets: [
    {
      data: [10, 45, 28, 80, 99, 43],
    },
  ],
};

const ProgressView = () => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
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
    </>
  );
};

export default ProgressView;
