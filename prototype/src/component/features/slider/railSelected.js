import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';

const RailSelected = () => {
  return (
    <View style={styles.root}>
      <View style={styles.root_child}></View>
    </View>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 2,
    backgroundColor: '#4499ff',
    borderRadius: 2,
  },
  root_child: {
    height: 2,
    backgroundColor: 'red',
    width: 30,
    marginLeft: 200
  }
});