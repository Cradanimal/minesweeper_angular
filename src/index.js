const minesweeper = angular.module('minesweeper', []);

minesweeper.controller('mainController', function( $scope ) {

  $scope.gridSize = 10;

  $scope.getSize = function() {
    console.log($scope.gridSize);
    initTable($scope.gridSize);
  }

  $scope.grid = [];
  $scope.swapVal = function(x,y){
    this.grid[x][y].val = 22;
    logg();
  };

  $scope.test = function(x){
    console.log(x)
    let i = x.$parent.$index;
    let j = x.$index;
    this.grid[i][j].active = !this.grid[i][j].active;

  }


  function getRandomIndex (size) {
    return [Math.floor(Math.random() * size),Math.floor(Math.random() * size)]
  }

  function initTable (size) {
    let bombCount = size;

    for (let i = 0; i < size; i++) {
      $scope.grid.push([]);
      for (let j = 0; j < size; j++) {
        $scope.grid[i].push({val : j, active : false, bomb : false, touchingBombs : 0, nearCells : []});
        let nearCells = $scope.grid[i][j].nearCells
        if (j !== 0) {
          nearCells.push([i, j - 1]);
          if (i !== 0) {
            nearCells.push([i - 1, j])
            nearCells.push([i - 1, j - 1]);
          }
          if (i !== size - 1) {
            nearCells.push([i + 1, j])
            nearCells.push([i + 1, j - 1]);
          }
        }
        if (j !== size - 1) {
          nearCells.push([i, j + 1]);
          if (i !== 0) {
            nearCells.push([i - 1, j + 1]);
          }
          if (i !== size - 1) {
            nearCells.push([i + 1, j + 1]);
          }
        }
      }
    }
    console.log('so far')

    addAndTrackBombs(size, bombCount);


    $scope.grid.forEach(function(row) {
      row.forEach(function(cell) {
        console.log(cell);
      });
    });
  };

  function addAndTrackBombs (size, bombCount) {
    for (let i = 0; i < bombCount; i++) {
      let bomb = getRandomIndex(size);
      console.log(bomb);
      if (!$scope.grid[bomb[0]][bomb[1]].bomb) {
        $scope.grid[bomb[0]][bomb[1]].nearCells.forEach(function(tuple) {
          $scope.grid[tuple[0]][tuple[1]].touchingBombs++;
        });
      }
      $scope.grid[bomb[0]][bomb[1]].bomb = true;
    }
  };

  function near (cell) {
      let nearCells = [];
      let cellIndex = cell.$index;
      let currentRow = cell.$parent;
      console.log(cell.$parent);
      let nextRow = $scope.grid[cell.$parent.$index + 1];
      let prevRow = $scope.grid[cell.$parent.$index - 1];
      let leftCheck = cellIndex > 0;
      let rightCheck = cellIndex < currentRow.length - 1;

      if (rightCheck) {
        nearCells.push(currentRow[cellIndex + 1]);
        if (prevRow) {
          nearCells.push(prevRow[cellIndex + 1])
        }
        if (nextRow) {
          nearCells.push(nextRow[cellIndex + 1])
        }
      }
      if (leftCheck) {
        nearCells.push(currentRow[cellIndex - 1]);
        if (prevRow) {
          nearCells.push(prevRow[cellIndex - 1])
        }
        if (nextRow) {
          nearCells.push(nextRow[cellIndex - 1])
        }
      }
      console.log(nearCells);
      return nearCells;
    };





});