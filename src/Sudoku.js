/* eslint-disable radix */
import React, {useState} from 'react';
import {TextInput, StyleSheet, Alert} from 'react-native';
import {View, Button} from 'react-native-ui-lib';
import {solveSudoku} from './func/solveSudoku';

const Sudoku = () => {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(0)));
  const [initialGrid, setInitialGrid] = useState(
    JSON.parse(JSON.stringify(grid)),
  ); // Lưu trạng thái ban đầu

  const handleInputChange = (row, col, value) => {
    try {
      const newGrid = JSON.parse(JSON.stringify(grid));
      newGrid[row][col] = +value ?? 0;
      setGrid(newGrid);
      // Cập nhật initialGrid khi người dùng thay đổi
      const newInitialGrid = JSON.parse(JSON.stringify(newGrid));
      setInitialGrid(newInitialGrid);
    } catch (error) {}
  };

  const handleSolve = () => {
    const copiedGrid = JSON.parse(JSON.stringify(grid)); // Deep copy để tránh thay đổi state trực tiếp
    if (solveSudoku(copiedGrid)) {
      setGrid(copiedGrid);
    } else {
      Alert.alert('Không tìm thấy lời giải!');
    }
  };

  const handleClear = () => {
    setGrid(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(0)),
    );
    setInitialGrid(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(0)),
    );
  };

  const renderCell = (row, col, value) => {
    let borderStyle = {};
    const isInitialValue = initialGrid[row][col] !== 0;
    const cellStyle = [
      styles.cell,
      borderStyle,
      !isInitialValue && styles.highlightedCell,
    ];

    if (row % 3 === 0) {
      borderStyle.borderTopWidth = 3; // Đường kẻ đậm cho khối 3x3
      borderStyle.borderTopColor = 'black';
    }
    if (row === 8) {
      borderStyle.borderBottomWidth = 3; // Đường kẻ đậm cho cạnh dưới cùng
      borderStyle.borderBottomColor = 'red';
    }
    if (col % 3 === 0) {
      borderStyle.borderLeftWidth = 3; // Đường kẻ đậm cho khối 3x3
      borderStyle.borderLeftColor = 'red';
    }
    if (col === 8) {
      borderStyle.borderRightWidth = 3; // Đường kẻ đậm cho cạnh phải cùng
      borderStyle.borderRightColor = 'red';
    }

    return (
      <TextInput
        key={`${row}-${col}`}
        style={cellStyle} // Sử dụng cellStyle
        keyboardType="numeric"
        maxLength={1}
        value={value === 0 ? '' : value.toString()}
        onChangeText={text => handleInputChange(row, col, text)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => renderCell(rowIndex, colIndex, cell))}
          </View>
        ))}
        {/* {console.log(grid)} */}
      </View>
      <View height={10} />
      <Button label="Giải" onPress={handleSolve} />
      <View height={10} />
      <Button label="Clear" onPress={handleClear} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    borderWidth: 2, // Viền ngoài cho toàn bộ lưới
    borderColor: 'red',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 42,
    height: 42,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 0.5,
    alignItems: 'center',
  },
  highlightedCell: {
    backgroundColor: '#b0e0e6', // Màu nền xanh nhạt
    color: 'teal', // Màu chữ xanh đậm
  },
});

export default Sudoku;
