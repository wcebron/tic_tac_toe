var ticApp = angular.module('ticApp', ["firebase"]);

ticApp.controller('ticCtrl', function($scope, $firebase){
	var ref = new Firebase("https://wctictactoeangular.firebaseio.com/");
    // creates an AngularFire reference to the data
    var sync = $firebase(ref);
    // creates a synchronized array for use in our HTML code


    var boardRef = ref.child('board');  //creates a child ref for the board in firebase
    var boardSync = $firebase(boardRef); //creates a synchronized object for board
    $scope.board = boardSync.$asArray(); //creates an array for each board data

    var counterRef = ref.child('counter'); //creates a child ref for the counter in firebase
   	var counterSync = $firebase(counterRef);  //creates a synchronized object for counter
    $scope.counter = counterSync.$asArray(); //creates an array for the counter data

    var turnsRef = ref.child('turns'); //creates a child ref for the turn in firebase
   	var turnsSync = $firebase(turnsRef);  //creates a synchronized object for turn
    $scope.turns= turnsSync.$asArray(); //creates an array for the turn data

    var winnerRef = ref.child('winner'); //creates a child ref for the winner in firebase
   	var winnerSync = $firebase(winnerRef);  //creates a synchronized object for winner
    $scope.winner= winnerSync.$asArray(); //creates an array for the winner data


		//Shoutout to Sam and Wendy for helping me understand the logic around creating the board
	$scope.board.$loaded(function(){
  		if ($scope.board.length === 0){
  			for(var i = 0; i < 9; i++){
  				$scope.board.$add({marker: ""}); //creates board with nine tiles because it doesn't exist
  			}
  		}
  		else{
  			for(i = 0; i < 9; i++){
  				$scope.board[i].marker =""; //empties an existing board by iterating through each piece and marking it blank
  				$scope.board.$save(i);  //Saves board data to specified Firebase reference
  			}
  		}
  	});

  	$scope.counter.$loaded(function(){
  		if($scope.counter.length === 0){  //essentially asking if counter does not exist
  			$scope.counter.$add({move: 0}); //creates counter in Firebase with a move key and value of zero
  		}
  		else{
  			$scope.counter[0].move = 0; //if counter exists, set the move node to zero locally
  			$scope.counter.$save(0); //then save the move node (0 spot in the array) into firebase

  		}
  	});

	//$scope.blaiseTurn = true;  //Sets blaiseTurn to true to start

	$scope.turns.$loaded(function(){
		if($scope.turns.length === 0){  
			$scope.turns.$add({player1: false}); //if turns doesn't exist, create a node with a player 1 key and a value of false
		}
		else{
			$scope.turns[0].player1 = false; //if turns exists, when reloaded, set player 1 to false
			$scope.turns.$save(0); //save the first item in turns to firebase (in this case player 1 as false)
		}
	})

	$scope.winner.$loaded(function(){
		if($scope.winner.length === 0){  
			$scope.winner.$add({blaiseWins: false}); //if winner doesn't exist, create a node with a blaiseWin key and a value of false
			$scope.winner.$add({zachWins: false});
			$scope.winner.$add({tie: false});
		}
		else{
			$scope.winner[0].blaiseWins = false;
			$scope.winner[1].zachWins = false;
			$scope.winner[2].tie = false;
			$scope.winner.$save(0);
			$scope.winner.$save(1);
			$scope.winner.$save(2);
		}
	})



	// $scope.winningCombo = [
	// 	[0, 1, 2],
	// 	[3, 4, 5],
	// 	[6, 7, 8],
	// 	[0, 3, 6],
	// 	[1, 4, 7],
	// 	[2, 5, 8],
	// 	[2, 4, 6],
	// 	[0, 4, 8],
	// ];

	$scope.runGame = function(index){

		if($scope.zachWins === true || $scope.blaiseWins === true){
			//console.log("Is this running?")
			//$scope.blaiseTurn = false;
			//$scope.zachTurn = false;
			return false;  //stops game in its tracks because there is a winner
		}

		if($scope.counter[0].move === 0){
			$scope.turns[0].player1 = true; //set player1 to true locally.  This makes only the first mover player1.
			//console.log("What is player one set to" + $scope.turns[0].player1);
		}

		if(($scope.board[index].marker !== "X") && ($scope.board[index].marker !== "O") && ($scope.counter[0].move % 2 == 0) && ($scope.turns[0].player1)){
		$scope.board[index].marker = "X" //adds x to the board in firebase (won't work with above)
		$scope.board.$save(index);
		$scope.counter[0].move++; //increments counter by one
		$scope.counter.$save(0); //saves state of counter to firebase
		//$scope.blaiseTurn = false;	
		//$scope.zachTurn = true;
		$scope.checkWin(); //runs win condition function
		}

		else if (($scope.board[index].marker !== "X") && ($scope.board[index].marker !== "O") && ($scope.counter[0].move % 2 == 1) && (!$scope.turns[0].player1)){
		$scope.board[index].marker = "O";
		$scope.board.$save($scope.board[index]);
		$scope.counter[0].move++;
		$scope.counter.$save(0);
		//$scope.zachTurn = false; //need to update this in firebase
		//$scope.blaiseTurn = true;//need to update this in firebase
		$scope.checkWin();
		}

	};

	$scope.checkWin = function(){
		if (($scope.board[0].marker == "X" && $scope.board[1].marker == "X" && $scope.board[2].marker == "X") ||
			($scope.board[3].marker == "X" && $scope.board[4].marker == "X" && $scope.board[5].marker == "X") ||
			($scope.board[6].marker == "X" && $scope.board[7].marker == "X" && $scope.board[8].marker == "X") ||
			($scope.board[0].marker == "X" && $scope.board[3].marker == "X" && $scope.board[6].marker == "X") ||
			($scope.board[1].marker == "X" && $scope.board[4].marker == "X" && $scope.board[7].marker == "X") ||
			($scope.board[2].marker == "X" && $scope.board[5].marker == "X" && $scope.board[8].marker == "X") ||
			($scope.board[2].marker == "X" && $scope.board[4].marker == "X" && $scope.board[6].marker == "X") ||
			($scope.board[0].marker == "X" && $scope.board[4].marker == "X" && $scope.board[8].marker == "X"))
		{
			$scope.winner[0].blaiseWins = true;  //set to true so it shows Blaise Wins! on the board
			$scope.winner.$save(0);  //saves into firebase and triggers ng-show
			//$scope.zachTurn = false; //turns off 

		}
		else if (($scope.board[0].marker == "O" && $scope.board[1].marker == "O" && $scope.board[2].marker == "O") ||
			($scope.board[3].marker == "O" && $scope.board[4].marker == "O" && $scope.board[5].marker == "O") ||
			($scope.board[6].marker == "O" && $scope.board[7].marker == "O" && $scope.board[8].marker == "O") ||
			($scope.board[0].marker == "O" && $scope.board[3].marker == "O" && $scope.board[6].marker == "O") ||
			($scope.board[1].marker == "O" && $scope.board[4].marker == "O" && $scope.board[7].marker == "O") ||
			($scope.board[2].marker == "O" && $scope.board[5].marker == "O" && $scope.board[8].marker == "O") ||
			($scope.board[2].marker == "O" && $scope.board[4].marker == "O" && $scope.board[6].marker == "O") ||
			($scope.board[0].marker == "O" && $scope.board[4].marker == "O" && $scope.board[8].marker == "O"))
		{
			$scope.winner[1].zachWins = true;
			$scope.winner.$save(1);
			//$scope.blaiseTurn = false;
		}
		else if ($scope.counter[0].move == 9) {
			$scope.winner[2].tie = true;
			$scope.winner.$save(2);
			//$scope.zachTurn = false;
		}

	};

});
