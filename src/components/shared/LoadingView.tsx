import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingView = (isLoading: boolean) => {
  return (
    <>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  // loading: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 200,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
