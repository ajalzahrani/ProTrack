import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';

// Assets
import {colors} from 'src/assets';
('react-native-heroicons/outline');

// Components
import * as Icons from 'react-native-heroicons/outline';
import SessionReport from './components/SessionReport';

// Store
import useSessionStore from 'src/store/useSessionStore';

// Navigation
import {useNavigation} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {RoutineStackRootParamList} from 'src/components/navigation/RoutineStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type SessionReportScreenRouteProp = RouteProp<
  RoutineStackRootParamList,
  'SessionReportScreen'
>;
type SessionReportScreenNavigationProp = NativeStackNavigationProp<
  RoutineStackRootParamList,
  'SessionReportScreen'
>;

type SessionReportScreenProp = {
  route: SessionReportScreenRouteProp;
  navigation: SessionReportScreenNavigationProp;
};

const SessionReportScreen: React.FC<SessionReportScreenProp> = ({
  route,
  navigation,
}) => {
  // FIXME: Adjust the design to be consist

  const sessionId = route.params.sessionId;
  const sessions = useSessionStore(state => state.sessions);
  const sessionIndex = sessions.findIndex(s => s.sesisonId === sessionId);
  const session = sessions[sessionIndex];

  return (
    <SafeAreaView style={style.saveAreaStyle}>
      <View style={style.headerStyle}>
        <Icons.CheckCircleIcon color={colors.yellow} size={200} />
        <Text style={style.headerTextStyle}>Workout Summary</Text>
      </View>
      <ScrollView
        style={{padding: 20}}
        contentContainerStyle={{paddingBottom: 72}}>
        <SessionReport session={session} />
      </ScrollView>

      <TouchableOpacity
        style={style.doneButtonStyle}
        onPress={() => {
          navigation.popToTop();
        }}>
        <Text style={{fontSize: 20}}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  saveAreaStyle: {
    flex: 1,
    backgroundColor: '#1a2421',
  },
  headerStyle: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#1a2421',
  },
  headerTextStyle: {
    fontSize: 35,
    color: colors.white,
  },
  doneButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 20,
    backgroundColor: colors.yellow,
    borderRadius: 10,
  },
});

export default SessionReportScreen;
