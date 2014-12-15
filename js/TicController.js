

angular
    .module("ticApp")
    .controller("TicController", TicController);

// injecting firebase into the controller as a dependency
TicController.$inject = ['$firebase'];

// controller function
function TicController($firebase) {
    var self= this; 
   
    self.getBoxes= getBoxes(); 
    // self.getGamePlay = getGamePlay(); 
    self.setBoard= setBoard; 
    self.setGame= setGame; 
    self.pickBox = pickBox; 
    self.clearBoard = clearBoard; 
    self.gamePlay = getGamePlay();
    self.winnerFunc = winnerFunc;
   

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


    function getGamePlay() {
        var ref = new Firebase("https://tictactech.firebaseio.com/gamePlay");
        var gamePlay = $firebase(ref).$asObject();
        return gamePlay; 
    }

    self.board.$loaded().then(function() {

        setBoard();


    });

    self.gamePlay.$loaded().then(function(){
        self.gamePlay.turns = 1; 
        self.gamePlay.winner= "";
        // self.gamePlay.numPlayers= null;
        setGame();
    })



    function setGame() {
        
        if(!self.gamePlay.numPlayers) {
            self.gamePlay.numPlayers = 0; 
            self.gamePlay.$save();
        }

        // self.playerID = self.gamePlay.numPlayers;
       
        self.gamePlay.numPlayers ++;
        self.gamePlay.$save();

        if(self.gamePlay.numPlayers == 1) {
            self.playerID = self.gamePlay.numPlayers;
            console.log ("First player set"); 
            self.gamePlay.$save();
        }

        else if (self.gamePlay.numPlayers == 2) {
            self.playerID = self.gamePlay.numPlayers; 
            console.log("Second player set");
            self.gamePlay.$save();
        }

        else {
            self.playerID = "watcher"; 
            console.log("May watch but can't play this time!"); 
        } 

        self.gamePlay.$save();
        // return setGame; 
    };
    

    function pickBox($index) {
    

            // self.gamePlay.turns = 1;
            self.gamePlay.turns++;
            self.gamePlay.$save();


            // player = 1;
            // self.player = 0;
            if (self.board[$index].owner === "") {
                if ((self.gamePlay.turns % 2 === 0) && (self.playerID == 1)) {
                    self.board[$index].owner = "X";
                    self.board.$save($index);
                    // self.gamePlay.$save();
                    // if (turns = 1) {
                    //     player= 1;
                    //     console.log("Player 1 assigned")
                    // }

                    // player++
                    // box.player.$save($index);
                    // playerTurn();
                    console.log($index);
                    // winnerFunc();
                }
                else if ((self.gamePlay.turns % 2 === 1) && (self.playerID == 2)){
                    // box.player.$save($index);
                    self.board[$index].owner = "O";
                    self.board.$save($index);
                    // self.gamePlay.$save();

                    // if (turns = 2){
                    //     player= 2
                    //     console.log("Player 2 assigned")
                    // }

                    // player--
                    // box.player.$save(box);
                    // playerTurn();
                    console.log($index);
                    // self.gamePlay.$save();
                    // winnerFunc();
                }

            }
            else {
                window.alert("Now now, you know you can't have that space! Pick another!");
            }

            // return self.gamePlay.owner;
            winnerFunc();
            return pickBox; 
        // return player;
    }
    // var owner;
    // var winner;


// still need a way to stop the function running if a win occurs
    function winnerFunc() {
        if (self.board[0].owner == "X" && self.board[1].owner == "X" && self.board[2].owner == "X") {
            self.gamePlay.winner ="PLAYER ONE WINS!";
            console.log("player one!");
            self.gamePlay.$save();
        }
        else if (self.board[3].owner == "X" && self.board[4].owner == "X" && self.board[5].owner == "X") {
            self.gamePlay.winner ="PLAYER ONE WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[6].owner == "X" && self.board[7].owner == "X" && self.board[8].owner == "X") {
            self.gamePlay.winner ="PLAYER ONE WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[0].owner == "X" && self.board[3].owner == "X" && self.board[6].owner == "X") {
            self.gamePlay.winner ="PLAYER ONE WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[1].owner == "X" && self.board[4].owner == "X" && self.board[7].owner == "X") {
            self.gamePlay.winner ="PLAYER ONE WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[2].owner == "X" && self.board[5].owner == "X" && self.board[8].owner == "X") {
            self.gamePlay.winner ="PLAYER ONE WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[0].owner == "X" && self.board[4].owner == "X" && self.board[8].owner == "X") {
            self.gamePlay.winner ="PLAYER ONE WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[2].owner == "X" && self.board[4].owner == "X" && self.board[6].owner == "X") {
            self.gamePlay.winner ="PLAYER ONE WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[0].owner == "O" && self.board[1].owner == "O" && self.board[2].owner == "O") {
            self.gamePlay.winner ="PLAYER TWO WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[3].owner == "O" && self.board[4].owner == "O" && self.board[5].owner == "O") {
            self.gamePlay.winner ="PLAYER TWO WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[6].owner == "O" && self.board[7].owner == "O" && self.board[8].owner == "O") {
            self.gamePlay.winner="PLAYER TWO WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[0].owner == "O" && self.board[3].owner == "O" && self.board[6].owner == "O") {
            self.gamePlay.winner ="PLAYER TWO WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[1].owner == "O" && self.board[4].owner == "O" && self.board[7].owner == "O") {
            self.gamePlay.winner ="PLAYER TWO WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[2].owner == "O" && self.board[5].owner == "O" && self.board[8].owner == "O") {
            self.gamePlay.winner ="PLAYER TWO WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[0].owner == "O" && self.board[4].owner == "O" && self.board[8].owner == "O") {
            self.gamePlay.winner ="PLAYER TWO WINS!";
            self.gamePlay.$save();
        }
        else if (self.board[2].owner == "O" && self.board[4].owner == "O" && self.board[6].owner == "O") {
            self.gamePlay.winner ="PLAYER TWO WINS!";
            self.gamePlay.$save();
        }
        else if(self.gamePlay.turns == 10){
            self.gamePlay.winner= "It's a tie! Wow!";
            self.gamePlay.$save();
        }
        else if (self.gamePlay.turns % 2 == 0) {
            self.gamePlay.winner = "PLAYER TWO, PICK A BOX!";
            self.gamePlay.$save();
        } else {
            self.gamePlay.winner = "PLAYER ONE, PICK A BOX";
            self.gamePlay.$save();
        }
        return self.gamePlay.winner;
        self.gamePlay.$save();
    }


// for loop this 
    function clearBoard() {
        self.board[0].owner = "";
        self.board[1].owner = "";
        self.board[2].owner = "";
        self.board[3].owner = "";
        self.board[4].owner = "";
        self.board[5].owner = "";
        self.board[6].owner = "";
        self.board[7].owner = "";
        self.board[8].owner = "";
        self.gamePlay.turns= 1;
        self.gamePlay.numPlayers = null;
        self.board.$save();
        self.gamePlay.$save();
        console.log("reset");
    return self.clearBoard;
    }


}
