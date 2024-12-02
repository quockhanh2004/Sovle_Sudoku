function isSafe(grid, row, col, num) {
  // Kiểm tra hàng
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) {
      return false;
    }
  }

  // Kiểm tra cột
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) {
      return false;
    }
  }

  // Kiểm tra ô 3x3
  let startRow = row - (row % 3);
  let startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
}

function findUnassignedLocation(grid) {
  let minRemainingValues = 10;
  let bestRow = -1;
  let bestCol = -1;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        let numPossibleValues = 0;
        for (let num = 1; num <= 9; num++) {
          if (isSafe(grid, row, col, num)) {
            numPossibleValues++;
          }
        }

        if (numPossibleValues < minRemainingValues) {
          minRemainingValues = numPossibleValues;
          bestRow = row;
          bestCol = col;
        }
      }
    }
  }
  return {row: bestRow, col: bestCol};
}

export const solveSudoku = grid => {
  let {row, col} = findUnassignedLocation(grid);
  if (row === -1) return true; // Đã điền xong

  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;

      if (solveSudoku(grid)) {
        return true;
      } else {
        grid[row][col] = 0; // Quay lui
      }
    }
  }

  return false; // Không tìm được giải pháp
};
