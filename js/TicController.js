

angular
    .module("ticApp")
    .controller("TicController", TicController);

TicController.$inject = ['$firebase'];

function TicController($firebase) {
    var self= this; 
    self.gameName = "TTT";
    // self.turns = turns;
    self.pickBox = pickBox;

    self.winner = winner;   
   

    self.board = getBoxes();
    self.clearBoard = clearBoard;


    function getBoxes() {
        var sync = new Firebase("https://tictactech.firebaseio.com/gameBoard");
        sync.remove();
        var board = $firebase(sync).$asArray();
        
        board.$loaded().then(function(){
            setBoard();

        });
        
        return board;

     
    }

    function setBoard(){
        console.log("Game Board Set!");
        for (var i=0; i<9; i++) {
            self.board.$add({index: i, owner: ""});
        };
    }
    
    self.gamePlay = getGamePlay(); 
    function getGamePlay() {
        var sync = new Firebase("https://tictactech.firebaseio.com/gamePlay");
        var gamePlay = $firebase(sync).$asObject();

        gamePlay.$loaded().then(function() {
            console.log("connected!");
            // gamePlay.turns = pickBox();
            // gamePlay.$save();
        })

        return gamePlay;
    }

    

    // function getLobby () { 
  
    //     var ref = $firebase(new Firebase("https://tictactech.firebaseio.com/lobby"));
    //     var lobby = ref.$asObject();
        
    //     lobby.$save({name: "TicTacTechLobby", numPlayer: 0});
    //     self.ref = ref;
    //     self.lobby= lobby;
    // }

    
    // self.getLobby= getLobby;
    // getLobby();


 


  




    // var turns= 1;

    // function playerTurn() {
    //     for (var i= 1; i<3; i++) {
    //         if (!self.lobby.numPlayers){
    //             self.lobby.numPlayers = 0;
    //             self.lobby.playerTurn= 1;
    //             self.lobby.$save();
    //         }
    //         self.playerNumber = self.room.numPlayers;
    //         self.room.numPlayers +=1;
    //         self.room.$save();
    //     }

   
    // var sync = $firebase(new Firebase("https://tictactech.firebaseio.com/playerTurn"));
    // var playerTurn = sync.$asObject();

    // function getPlayer() {

    //     }
    // }

    // self.getPlayer= getPlayer;
    // function playerTurn (){
    //     var ref = new Firebase("https://tictactech.firebaseio.com/player");
    //     var player = $firebase(ref); 

    //     function counter () {
    //         if (player=1) {
    //         player++;
    //        }
    //        else {
    //         player--;
    //        }
    //     };
       
    //     box.player.$save(box);
           
    //     return player;
    //        // self.box.player.$save();

    // };

    
    
    // function player ($firebase) {
    //     var player = function(playerName) {
    //         var ref = new Firebase("https:/tictactech.firebaseio/players");
    //         var firebasePlayer = $firebase(ref).$asObject();

    //         self.firebasePlayer = firebasePlayer;

    //         firebasePlayer.$loaded(function() {
    //             createPlayers();
    //         });
    //         return player()
    //     }

    //     function createPlayers(){
    //         if (firebasePlayer.playerCount===undefined) {
    //             firebasePlayer.playerCount= 1; 
    //             firebasePlayer.playerCount.$save(firebasePlayer);
    //         }
    //         else if (firebasePlayer.playerCount == 1) {
    //             firebasePlayer.playerCount = 2
    //             firebasePlayer.playerCount.$save(firebasePlayer);
    //         }
    //         else {
    //             firebasePlayer.playerCount = undefined;
    //         }
    //     };
    // }

    
    // var turns = 1;
    function pickBox($index) {
    

            self.gamePlay.turns++;


            // player = 1;

            if (self.board[$index].owner === "") {
                if (self.gamePlay.turns % 2 === 0) {
                    self.board[$index].owner = "X";
                    self.board.$save($index);
                    self.gamePlay.$save();

                    // player++
                    // box.player.$save($index);
                    // playerTurn();
                    console.log($index);
                    winner();
                }
                else {
                    // box.player.$save($index);
                    self.board[$index].owner = "O";
                    self.board.$save($index);
                    self.gamePlay.$save()

                    // player--
                    // box.player.$save(box);
                    // playerTurn();
                    console.log($index);
                    winner();
                }

            }
            else {
                window.alert("Now now, you know you can't have that space! Pick another!");
            }
        // return player;
    }
    var owner;
    var winner;


// still need a way to stop the function running if a win occurs
    function winner() {
        if (self.board[0].owner == "X" && self.board[1].owner == "X" && self.board[2].owner == "X") {
            self.winner ="PLAYER ONE WINS!";
            console.log("player one!");
        }
        else if (self.board[3].owner == "X" && self.board[4].owner == "X" && self.board[5].owner == "X") {
            self.winner ="PLAYER ONE WINS!";
        }
        else if (self.board[6].owner == "X" && self.board[7].owner == "X" && self.board[8].owner == "X") {
            self.winner ="PLAYER ONE WINS!";
        }
        else if (self.board[0].owner == "X" && self.board[3].owner == "X" && self.board[6].owner == "X") {
            self.winner ="PLAYER ONE WINS!";
        }
        else if (self.board[1].owner == "X" && self.board[4].owner == "X" && self.board[7].owner == "X") {
            self.winner ="PLAYER ONE WINS!";
        }
        else if (self.board[2].owner == "X" && self.board[5].owner == "X" && self.board[8].owner == "X") {
            self.winner ="PLAYER ONE WINS!";
        }
        else if (self.board[0].owner == "X" && self.board[4].owner == "X" && self.board[8].owner == "X") {
            self.winner ="PLAYER ONE WINS!";
        }
        else if (self.board[2].owner == "X" && self.board[4].owner == "X" && self.board[6].owner == "X") {
            self.winner ="PLAYER ONE WINS!";
        }
        else if (self.board[0].owner == "O" && self.board[1].owner == "O" && self.board[2].owner == "O") {
            self.winner ="PLAYER TWO WINS!";
        }
        else if (self.board[3].owner == "O" && self.board[4].owner == "O" && self.board[5].owner == "O") {
            self.winner ="PLAYER TWO WINS!";
        }
        else if (self.board[6].owner == "O" && self.board[7].owner == "O" && self.board[8].owner == "O") {
            self.winner="PLAYER TWO WINS!";
        }
        else if (self.board[0].owner == "O" && self.board[3].owner == "O" && self.board[6].owner == "O") {
            self.winner ="PLAYER TWO WINS!";
        }
        else if (self.board[1].owner == "O" && self.board[4].owner == "O" && self.board[7].owner == "O") {
            self.winner ="PLAYER TWO WINS!";
        }
        else if (self.board[2].owner == "O" && self.board[5].owner == "O" && self.board[8].owner == "O") {
            self.winner ="PLAYER TWO WINS!";
        }
        else if (self.board[0].owner == "O" && self.board[4].owner == "O" && self.board[8].owner == "O") {
            self.winner ="PLAYER TWO WINS!";
        }
        else if (self.board[2].owner == "O" && self.board[4].owner == "O" && self.board[6].owner == "O") {
            self.winner ="PLAYER TWO WINS!";
        }
        else if(self.gamePlay.turns == 10){
            self.winner= "It's a tie! Wow!";
        }
        else if (self.gamePlay.turns % 2 == 0) {
            self.winner = "PLAYER TWO, PICK A BOX!";
        } else {
            self.winner = "PLAYER ONE, PICK A BOX";
        }
        return self.winner;
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
        self.board.$save();
        self.gamePlay.$save();
        console.log("reset");
    }


}

