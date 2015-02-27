

angular
    .module("ticApp")
    .controller("TicController", TicController);

// injecting firebase into the controller as a dependency
TicController.$inject = ['$firebase'];

// controller function
function TicController($firebase) {
    var self= this; 
   
    self.getBoxes= getBoxes();  
    self.setBoard= setBoard; 
    self.setGame= setGame; 
    self.pickBox = pickBox; 
    self.clearBoard = clearBoard; 
    self.gamePlay = getGamePlay();
    self.winnerFunc = winnerFunc;

 




    // function to sync game board with Firebase
    function getBoxes() {
        var sync = new Firebase("https://tictactech.firebaseio.com/gameBoard");
        sync.remove();
        var board = $firebase(sync).$asArray();
        self.board = board;
        return getBoxes; 
    }

     //  actual gameboard
    function setBoard(){
        console.log("Game Board loaded!");
        for (var i=0; i<9; i++) {
            self.board.$add({index: i, owner: ""});
        }
    };

    // function to sync game logic to Firebase
    function getGamePlay() {
        var ref = new Firebase("https://tictactech.firebaseio.com/gamePlay");
        var gamePlay = $firebase(ref).$asObject();
        return gamePlay; 
    }

    // loads game board when page loaded
    self.board.$loaded().then(function() {

        setBoard();


    });

    // loads gamePlay elements and turns and winner starting values
    self.gamePlay.$loaded().then(function(){
        self.gamePlay.turns = 1; 
        self.gamePlay.winner= "";
        // self.gamePlay.winCounterOne= 0;
        // self.gamePlay.winCounterTwo= 0;
        setGame();
    })


    // game play function, setting local player variables and spectators when player count above 2
    function setGame() {
        
        // start numPlayers at 0 if no players; won't run if there are already players in the room
        
        if(!self.gamePlay.numPlayers) {
            self.gamePlay.numPlayers = 0; 
            self.gamePlay.$save();
        }

       
        // increments numPlayers each time this function runs (which should be each time that a new players enters)
       
        self.gamePlay.numPlayers ++;
        self.gamePlay.$save();

        // if else statemet assigning local variables for player one, player two, and watcher
        if(self.gamePlay.numPlayers == 1) {
            self.playerID = self.gamePlay.numPlayers;
            console.log ("First player set"); 
            self.gamePlay.$save();
            self.message = "You are Player One! Get 3 X's in a row to win!"
        }

        else if (self.gamePlay.numPlayers == 2) {
            self.playerID = self.gamePlay.numPlayers; 
            console.log("Second player set");
            self.gamePlay.$save();
            self.message = "You are Player Two! Get 3 O's in a row to win!"
        }

        else {
            self.playerID = "watcher"; 
            console.log("May watch but can't play this time!"); 
            self.message = "Sorry, the game is full! Feel free to watch!"
        } 

        self.gamePlay.$save();
        return setGame; 
    };
    
    // turn sequence function, assigns X or O to the square depending on whether turns are even or odd (turns start at 1 when page loads, and increment up)
    function pickBox($index) {

            
            self.gamePlay.$save();

            if (self.board[$index].owner === "") {
                if ((self.gamePlay.turns % 2 === 0) && (self.playerID == 1)) {
                    self.board[$index].owner = "X";
                    self.board.$save($index);
                    console.log($index);
                    self.gamePlay.turns++;
                   
                }
                else if ((self.gamePlay.turns % 2 === 1) && (self.playerID == 2)){
                    self.board[$index].owner = "O";
                    self.board.$save($index);
                    console.log($index);
                    self.gamePlay.turns++;

                }

            }
            else {
                window.alert("Now now, that space is taken! Pick another!");
            }

            winnerFunc();
            self.gamePlay.$save();
            return pickBox; 
    }


    self.winCounterFunc = winCounterFunc
    function winCounterFunc() {
        if (!self.gamePlay.winCounterOne) {
            self.gamePlay.winCounterOne = 0;
        }
        if (!self.gamePlay.winCounterTwo) {
            self.gamePlay.winCounterTwo = 0;
        }
    }
// win logic
    function winnerFunc() {
        winCounterFunc();
        if (
        (self.board[0].owner == "X" && self.board[1].owner == "X" && self.board[2].owner == "X") ||
        (self.board[3].owner == "X" && self.board[4].owner == "X" && self.board[5].owner == "X") ||
        (self.board[6].owner == "X" && self.board[7].owner == "X" && self.board[8].owner == "X") ||
        (self.board[0].owner == "X" && self.board[3].owner == "X" && self.board[6].owner == "X") ||
        (self.board[1].owner == "X" && self.board[4].owner == "X" && self.board[7].owner == "X") ||
        (self.board[2].owner == "X" && self.board[5].owner == "X" && self.board[8].owner == "X") ||
        (self.board[0].owner == "X" && self.board[4].owner == "X" && self.board[8].owner == "X") ||
        (self.board[2].owner == "X" && self.board[4].owner == "X" && self.board[6].owner == "X")) {
            self.gamePlay.winner ="PLAYER ONE WINS!";
            self.gamePlay.winCounterOne+=1
            self.gamePlay.$save();
           
           
        }

        else if (
        (self.board[0].owner == "O" && self.board[1].owner == "O" && self.board[2].owner == "O") ||
        (self.board[3].owner == "O" && self.board[4].owner == "O" && self.board[5].owner == "O") ||
        (self.board[6].owner == "O" && self.board[7].owner == "O" && self.board[8].owner == "O") ||
        (self.board[0].owner == "O" && self.board[3].owner == "O" && self.board[6].owner == "O") ||
        (self.board[1].owner == "O" && self.board[4].owner == "O" && self.board[7].owner == "O") ||
        (self.board[2].owner == "O" && self.board[5].owner == "O" && self.board[8].owner == "O") ||
        (self.board[0].owner == "O" && self.board[4].owner == "O" && self.board[8].owner == "O") ||
        (self.board[2].owner == "O" && self.board[4].owner == "O" && self.board[6].owner == "O")) {
            self.gamePlay.winner ="PLAYER TWO WINS!";
            self.gamePlay.$save();
            self.gamePlay.winCounterTwo+=1;
           
           
        }

        else if(self.gamePlay.turns == 20){
            self.gamePlay.winner= "It's a tie! Wow!";
            self.gamePlay.$save();
            
        }

        else if (self.gamePlay.turns % 2 == 0) {
            self.gamePlay.winner = "PLAYER TWO, PICK A BOX!";
            self.gamePlay.$save();
        } 

        else {
            self.gamePlay.winner = "PLAYER ONE, PICK A BOX";
            self.gamePlay.$save();
        }

        return self.gamePlay.winner;
        self.gamePlay.$save();
    }



    function clearBoard() {
        // attempt to keep numPlayers from resetting again after setting player 1
        if (self.gamePlay.numPlayers !== 1) {
            self.gamePlay.numPlayers = null;
        }
        self.board[0].owner = "";
        self.board[1].owner = "";
        self.board[2].owner = "";
        self.board[3].owner = "";
        self.board[4].owner = "";
        self.board[5].owner = "";
        self.board[6].owner = "";
        self.board[7].owner = "";
        self.board[8].owner = "";
        self.board.$save();
        self.gamePlay.turns= 1;
        // self.gamePlay.numPlayers = null;
        self.gamePlay.$save();
        location.reload();
        console.log("reset");

    



        return self.clearBoard;
    }


}
