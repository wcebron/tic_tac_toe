var app = angular.module('ticApp', []);

app.controller('ticCtrl', function($scope){
	$scope.board = ['','','','','','','','',''];
	
	$scope.counter = 0;

	$scope.winningCombo = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],
		[0, 4, 8],
	];

	$scope.runGame = function(index){
		if(($scope.board[index]) !== "X" && ($scope.board[index]) !== "O" && ($scope.counter % 2 == 0)){
		$scope.board[index] = "X"; //adds x to the board at the indexed position
		$scope.checkWin(); //runs win condition function
		$scope.counter++; //increments counter by one
		console.log($scope.board);
		}

		else if (($scope.board[index]) !== "X" && ($scope.board[index]) !== "O"){ 
		$scope.board[index] = "O";
		$scope.checkWin();
		$scope.counter++;
		console.log($scope.board);
		}
	};

	$scope.checkWin = function(){
		if (($scope.board[0] == "X" && $scope.board[1] == "X" && $scope.board[2] == "X") ||
			($scope.board[3] == "X" && $scope.board[4] == "X" && $scope.board[5] == "X") || 
			($scope.board[6] == "X" && $scope.board[7] == "X" && $scope.board[8] == "X") || 
			($scope.board[0] == "X" && $scope.board[3] == "X" && $scope.board[6] == "X") || 
			($scope.board[1] == "X" && $scope.board[4] == "X" && $scope.board[7] == "X") || 
			($scope.board[2] == "X" && $scope.board[5] == "X" && $scope.board[8] == "X") || 
			($scope.board[2] == "X" && $scope.board[4] == "X" && $scope.board[6] == "X") ||
			($scope.board[0] == "X" && $scope.board[4] == "X" && $scope.board[8] == "X"))
		{
			$scope.blaiseWins = true;

		}
		else if (($scope.board[0] == "O" && $scope.board[1] == "O" && $scope.board[2] == "O") ||
			($scope.board[3] == "O" && $scope.board[4] == "O" && $scope.board[5] == "O") || 
			($scope.board[6] == "O" && $scope.board[7] == "O" && $scope.board[8] == "O") || 
			($scope.board[0] == "O" && $scope.board[3] == "O" && $scope.board[6] == "O") || 
			($scope.board[1] == "O" && $scope.board[4] == "O" && $scope.board[7] == "O") || 
			($scope.board[2] == "O" && $scope.board[5] == "O" && $scope.board[8] == "O") || 
			($scope.board[2] == "O" && $scope.board[4] == "O" && $scope.board[6] == "O") ||
			($scope.board[0] == "O" && $scope.board[4] == "O" && $scope.board[8] == "O"))
		{
			$scope.zachWins = true;
		}
		else if ($scope.counter == 8) {
			alert("Looks like a tie!");
		}

	};

});