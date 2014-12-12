

angular
    .module("ticApp")
    .controller("TicController", TicController);

TicController.$inject = ['$firebase'];

function TicController($firebase) {
    var self= this; 

    self.turns = turns;
    self.pickBox = pickBox;
    self.player = player;
    self.winner = winner;   
    // self.owner = owner;

    self.board = getBoxes();
    // self.board= board
    // self.board = board;

    function getBoxes() {
        var sync = new Firebase("https://tictactech.firebaseio.com/gameBoard");
        sync.remove();
        var board = $firebase(sync).$asArray();
        
        board.$loaded().then(function(){
            setBoard();
            // board.$add({owner:""});
            // board.$add({owner:""});
            // board.$add({owner:""});
            // board.$add({owner:""});
            // board.$add({owner:""});
            // board.$add({owner:""});
            // board.$add({owner:""});
            // board.$add({owner:""});
            // board.$add({owner:""});
            // console.log(board);
        });
        
        return board;

        // self.board = board;
    }

    function setBoard(){
        console.log("Game Board Set!");
        for (var i=0; i<9; i++) {
            self.board.$add({index: i, owner: ""});
        };
    }

    // getBoxes();

    // function getBoxes () {
    
    //     board.boxes = [ {box:0, owner:""}, {box:1, owner:""}, {box:2, owner:""}, {box:3, owner:""}, {box:4, owner:""}, {box:5, owner:""}, {box:6, owner:""}, {box:7, owner:""}, {box:8, owner:""}];
    //     // var board = sync.$asArray()
    //     board.boxes.$save();
    //     return board; 
    // }

    // getBoxes();

    // function getBoxes () {
    // boxes.$save({box:0, owner:""});
    // boxes.$save({box:1, owner:""});
    // boxes.$save({box:2, owner:""});
    // boxes.$save({box:3, owner:""});
    // boxes.$save({box:4, owner:""});
    // boxes.$save({box:5, owner:""});
    // boxes.$save({box:6, owner:""});
    // boxes.$save({box:7, owner:""});
    // boxes.$save({box:8, owner:""});

    // // boxes.$save(boxes);
    // self.boxes= boxes;
    // self.sync= sync;

    // }

    
    // getBoxes();
   


    // self.playerNumber= null; 
    // self.room = getTicTacTech();

    // self.room.$loaded(function(){
    //     if(!self.room.numPlayers) {
    //         self.room.numPlayers=0;
    //         self.room.playerTurn=0;
    //         self.room.$save;
    //     }
    //     self.playerNumber = self.room.numPlayers;
    //     self.room.numPlayers +=1
    //     self.room.$save();
    // });

    // function getTicTacTech () {
    //     var ref= new Firebase("https://tictactech.firebaseio.com/room");
    //     var TicTacTech = $firebase(ref).$asObject();
    //     return TicTacTech;
    // }

    // function getLobby () { 
  
    //     var ref = $firebase(new Firebase("https://tictactech.firebaseio.com/lobby"));
    //     var lobby = ref.$asObject();
        
    //     lobby.$save({name: "TicTacTechLobby", numPlayer: 0});
    //     self.ref = ref;
    //     self.lobby= lobby;
    // }

    
    // self.getLobby= getLobby;
    // getLobby();


    // angular.extend( self.lobby, 
    //     {
    //         name: "TicTacTech", 
    //         numPlayer: 0
    //     }); 
    // self.lobby.$save();
    // self.ref = ref;
    // self.lobby = lobby;
    // self.lobby.$save();


  

    // self.ref = ref
    // self.lobby = lobby 
    // self.sync2 = sync2;
    // self.lobby= lobby;

    // self.getLobby= getLobby;


    // var turns= 1;

    // function playerTurn($index) {
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

    // turns++;

    //     if (self.boxes[$index].owner === "") {
    //         if (turns % 2 === 0) {
    //             return self.boxes[$index].owner = "X";
    //         }
    //         else {
    //             return self.boxes[$index].owner = "O";
    //         }
    //     }
    //     else {
    //         window.alert("Now now, you know you can't have that space! Pick another!");
    //     }
    // }

    // var sync = $firebase(new Firebase("https://tictactech.firebaseio.com/playerTurn"));
    // var playerTurn = sync.$asObject();

    // function getPlayer() {

    //     }
    // }

    // self.getPlayer= getPlayer;


    
    var turns = 1;
    function pickBox(box) {
            
            turns++;

            if (box.owner === "") {
                if (turns % 2 === 0) {
                    box.owner = "X";
                    self.board.$save(box);
                    console.log(box);
                    winner();
                }
                else {
                    box.owner = "O";
                    self.board.$save(box);
                    console.log(box);
                    winner();
                }
            }
            else {
                window.alert("Now now, you know you can't have that space! Pick another!");
            }
    }
    var owner;
    var player;


// still need a way to stop the function running if a win occurs
    function winner() {
        if (self.board[0].owner == "X" && self.board[1].owner == "X" && self.board[2].owner == "X") {
            self.player ="PLAYER ONE WINS!";
            console.log("player one!");
        }
        else if (self.board[3].owner == "X" && self.board[4].owner == "X" && self.board[5].owner == "X") {
            self.player ="PLAYER ONE WINS!";
        }
        else if (self.board[6].owner == "X" && self.board[7].owner == "X" && self.board[8].owner == "X") {
            self.player ="PLAYER ONE WINS!";
        }
        else if (self.board[0].owner == "X" && self.board[3].owner == "X" && self.board[6].owner == "X") {
            self.player ="PLAYER ONE WINS!";
        }
        else if (self.board[1].owner == "X" && self.board[4].owner == "X" && self.board[7].owner == "X") {
            self.player ="PLAYER ONE WINS!";
        }
        else if (self.board[2].owner == "X" && self.board[5].owner == "X" && self.board[8].owner == "X") {
            self.player ="PLAYER ONE WINS!";
        }
        else if (self.board[0].owner == "X" && self.board[4].owner == "X" && self.board[8].owner == "X") {
            self.player ="PLAYER ONE WINS!";
        }
        else if (self.board[2].owner == "X" && self.board[4].owner == "X" && self.board[6].owner == "X") {
            self.player ="PLAYER ONE WINS!";
        }
        else if (self.board[0].owner == "O" && self.board[1].owner == "O" && self.board[2].owner == "O") {
            self.player ="PLAYER TWO WINS!";
        }
        else if (self.board[3].owner == "O" && self.board[4].owner == "O" && self.board[5].owner == "O") {
            self.player ="PLAYER TWO WINS!";
        }
        else if (self.board[6].owner == "O" && self.board[7].owner == "O" && self.board[8].owner == "O") {
            self.player ="PLAYER TWO WINS!";
        }
        else if (self.board[0].owner == "O" && self.board[3].owner == "O" && self.board[6].owner == "O") {
            self.player ="PLAYER TWO WINS!";
        }
        else if (self.board[1].owner == "O" && self.board[4].owner == "O" && self.board[7].owner == "O") {
            self.player ="PLAYER TWO WINS!";
        }
        else if (self.board[2].owner == "O" && self.board[5].owner == "O" && self.board[8].owner == "O") {
            self.player ="PLAYER TWO WINS!";
        }
        else if (self.board[0].owner == "O" && self.board[4].owner == "O" && self.board[8].owner == "O") {
            self.player ="PLAYER TWO WINS!";
        }
        else if (self.board[2].owner == "O" && self.board[4].owner == "O" && self.board[6].owner == "O") {
            self.player ="PLAYER TWO WINS!";
        }
        else if(turns == 10){
            self.player= "It's a tie! Wow!";
        }
        else if (turns % 2 == 0) {
            self.player = "PLAYER TWO, PICK A BOX!";
        } else {
            self.player = "PLAYER ONE, PICK A BOX";
        }
        return self.player;
    }



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
    }


}

