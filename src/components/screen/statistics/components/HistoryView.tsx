import {View, Text, ScrollView} from 'react-native';
import React, {SetStateAction, useEffect, useState} from 'react';
import {colors} from 'src/assets';
import Calendars from './Calendars';
import SessionReport from 'src/components/screen/sessionReport/components/SessionReport';
import useSessionStore from 'src/store/useSessionStore';
import {sessionType} from 'src/types';

const HistoryView = () => {
  const getSessionsByDate = useSessionStore(state => state.getSessionsByDate);
  const sessions = useSessionStore(state => state.sessions);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [daySessions, setDaySessoins] = useState<sessionType[]>([]);

  useEffect(() => {
    if (selectedDate !== undefined) {
      // console.log('daySesison length: ', getSessionsByDate(selectedDate));
      setDaySessoins(getSessionsByDate(selectedDate));
    }
  }, [selectedDate, sessions.length]);
  return (
    <View style={{flex: 1, margin: 20}}>
      <ScrollView contentContainerStyle={{paddingBottom: 72}}>
        <Calendars setSelectedDate={setSelectedDate} />
        <Text style={{color: colors.white, marginTop: 20}}>
          {daySessions.length} {daySessions.length > 1 ? 'Sessions' : 'Session'}
        </Text>
        <Text style={{color: 'white', fontWeight: '200', marginTop: 12}}>
          Displaying Sessions with exercises only. if you want to see all
          sessions, kill switch is in the code. Or you prompet the user to not
          save session without exercise in sessoin controller component.
        </Text>

        {daySessions.length > 0 &&
          daySessions.map((daySession, i) => {
            // Render only if there is exercise in the session
            if (daySession.exercise.length > 0) {
              return (
                <View
                  key={i}
                  style={{
                    backgroundColor: colors.secondaryow,
                    padding: 20,
                    marginTop: 20,
                    borderRadius: 12,
                  }}>
                  <SessionReport session={daySession} />
                </View>
              );
            }
          })}
      </ScrollView>
    </View>
  );
};

export default HistoryView;
//<SessionReport key={i} session={item} />;
