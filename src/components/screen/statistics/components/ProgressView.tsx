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
import {Pressable, ScreenContainer} from 'src/components/shared';
import ScreenContainerScroll from 'src/components/shared/ScreenContainerScroll';
import useUserBodyMeasurementsRecordStore from 'src/store/useUserBodyMeasurementsRecordStore';

const LineChart_ChartKit = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
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
      width={width} // from react-native
      height={height}
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
  );
};

const LineChart_Victor = ({width, height}: {width: number; height: number}) => {
  const userBodyRecord = useUserBodyMeasurementsRecordStore(
    s => s.bodyMeasurementsRecord,
  );

  type dataObjType = {
    x: string;
    y: string;
  };

  const dataObj: dataObjType[] = [];
  for (let i = 0; i < userBodyRecord.length; i++) {
    dataObj.push({
      x: new Date(userBodyRecord[i].registerDate).getMinutes().toString(),
      y: userBodyRecord[i].weightRecord,
    });
  }

  dataObj.sort((a, b) => parseInt(a.y) - parseInt(b.y));
  dataObj.sort((a, b) => parseInt(a.x) - parseInt(b.x));
  const data = dataObj;
  // [
  //   {x: 'Mon', y: 150},
  //   {x: 'Tue', y: 230},
  //   {x: 'Wed', y: 224},
  //   {x: 'Thu', y: 218},
  //   {x: 'Fri', y: 135},
  //   {x: 'Sat', y: 147},
  //   {x: 'sun', y: 260},

  // ];
  return (
    <View style={{alignItems: 'center'}}>
      <VictoryChart theme={VictoryTheme.material} height={height} width={width}>
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
  // Skitch weight loss
  // Every time user register new weight value it should be counted by value(Y) and date(X)
  // X-axis
  // Let the use choose time frame period (day, month, year)
  // present data for a day by 7 days
  // present data for month by registerd days
  // present data for year by 12 months
  // Y-axis
  // present data for y-axis by the max value and divide by value(?)

  // present scatter weigt goal different
  const userBodyRecord = useUserBodyMeasurementsRecordStore(
    s => s.bodyMeasurementsRecord,
  );

  const screenWidth = Dimensions.get('window').width;
  return (
    <ScreenContainerScroll>
      <Pressable
        title="Chart data"
        style={{
          backgroundColor: 'white',
          marginHorizontal: 20,
          marginTop: 20,
          padding: 20,
        }}
        onPress={() => {
          console.warn(
            'Not Implemented, this button should allow user to choose which data to progress view',
          );
          for (let i = 0; i < userBodyRecord.length; i++) {
            console.log(
              userBodyRecord[i].registerDate +
                ' ' +
                userBodyRecord[i].weightRecord,
            );
          }

          console.log(
            new Date(userBodyRecord[0].registerDate).getMinutes().toString(),
          );
        }}
      />
      <LineChart_Victor width={screenWidth} height={250} />
      {/* <LineChart_ChartKit width={screenWidth} height={250} /> */}
      <View style={{padding: 20}}>
        <Text style={{color: 'white', fontWeight: '600'}}>
          {'Skitch weight loss'.toUpperCase() + '\n'}
        </Text>
        {/* <Text style={{color: 'white', fontWeight: '200'}}></Text> */}
        <Text style={{color: 'white', fontWeight: '200'}}>
          * Every time user register new weight value it should be counted by
          value(Y) and date(X)
        </Text>
        <Text style={{color: 'white', fontWeight: '200'}}></Text>
        <Text style={{color: 'white', fontWeight: '200'}}>X-axis</Text>
        <Text style={{color: 'white', fontWeight: '200'}}>
          * Let the user choose time frame period {'\n'} (day,month, year){' '}
          {/* you can insert new line like so ;) */}
        </Text>
        <Text style={{color: 'white', fontWeight: '200'}}>
          * present data for a day by 7 days
        </Text>
        <Text style={{color: 'white', fontWeight: '200'}}>
          * present data for month by registerd days
        </Text>
        <Text style={{color: 'white', fontWeight: '200'}}>
          * present data for year by 12 months
        </Text>
        <Text style={{color: 'white', fontWeight: '200'}}></Text>
        <Text style={{color: 'white', fontWeight: '200'}}>Y-axis</Text>
        <Text style={{color: 'white', fontWeight: '200'}}>
          * present data for y-axis by the max value and divide by value(?)
          present
        </Text>
        <Text style={{color: 'white', fontWeight: '200'}}></Text>
        <Text style={{color: 'white', fontWeight: '200'}}>
          * scatter weigt goal different
        </Text>
        <Text style={{color: 'white', fontWeight: '200'}}>
          {'\n'}* Number of records {userBodyRecord.length}
        </Text>
      </View>
    </ScreenContainerScroll>
  );
};

export default ProgressView;
