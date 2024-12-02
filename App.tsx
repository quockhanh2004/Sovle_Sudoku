import {View} from 'react-native-ui-lib';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Sudoku from './src/Sudoku';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View bg-white flex>
        <Sudoku />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
