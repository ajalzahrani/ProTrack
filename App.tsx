import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/components/navigation/Router';

// Storage
import {ImplementDataStructure} from './src/assets/database/ImplementDataStructure';

// Translation
import {I18nextProvider} from 'react-i18next';
import i18n from './src/Translation/i18n'; // import your i18n object
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    ImplementDataStructure();
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />
        <I18nextProvider i18n={i18n}>
          <Router />
        </I18nextProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

// npm i nativewind
// npm i --dev tailwindcss
