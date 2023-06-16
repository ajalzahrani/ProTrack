import {View, Text, ScrollView} from 'react-native';
import React, {SetStateAction, useEffect, useState} from 'react';
import {colors} from 'src/assets';
import Calendars from './Calendars';
import SessionReport from 'src/components/screen/sessionReport/components/SessionReport';
import useSessionStore from 'src/store/useSessionStore';
import {sessionType} from 'src/types';

const HistoryView = () => {
  const getSessionsByDate = useSessionStore(state => state.getSessionsByDate);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [daySessions, setDaySessoins] = useState<sessionType[]>([]);

  useEffect(() => {
    if (selectedDate !== undefined) {
      setDaySessoins(getSessionsByDate(selectedDate));
    }
  }, [selectedDate]);
  return (
    <View style={{flex: 1, margin: 20}}>
      <ScrollView contentContainerStyle={{paddingBottom: 72}}>
        <Calendars setSelectedDate={setSelectedDate} />
        <Text style={{color: colors.white}}>
          {daySessions.length} {daySessions.length > 1 ? 'Sessions' : 'Session'}
        </Text>
        {daySessions.length > 0 &&
          daySessions.map((daySession, i) => {
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
          })}
      </ScrollView>
    </View>
  );
};

export default HistoryView;
//<SessionReport key={i} session={item} />;
