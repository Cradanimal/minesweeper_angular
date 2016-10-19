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
        $scope.grid[i].push({val : j, active : false});
      }
    }

    for (let i = 0; i < bombCount; i++) {
      let bomb = getRandomIndex(size);
      console.log(bomb);
      $scope.grid[bomb[0]][bomb[1]].active = true;
    }
  }





});