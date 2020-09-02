class Game {
    static _status = "ongoing"; // or lose or win


    static get status() {
        return Game._status;
    }

    static set status(value) {
        if(value === "lose") {

        }
        Game._status = value;
    }

    static startGame(bomb, size) {
        Board.bomb = bomb;
        Board.size = size;
        Game.resetGame();
        Board._createBoard();
    }

    static resetGame() {
        Board.board = [];
        Board.addedBomb = 0;
        document.getElementsByTagName("tbody")[0].innerHTML = "";
    }

    static losedGame() {
        Game.showBombs();
        document.querySelector("#myModalTitle").innerHTML = "Perdu !";
        document.querySelector("#myModalBody").innerHTML = "Vous avez perdu ! Ne perdez pas confiance, ca arrive à tout le monde !";
        $("#myModal").modal("show");
    }

    static winnedGame() {
        Game.showBombs();
        Game.status = "win";
        document.querySelector("#myModalTitle").innerHTML = "Gagné !";
        document.querySelector("#myModalBody").innerHTML = "Vous avez gagné ! Continuez sur votre lancée, vous devez avoir un don pour ce jeu !";
        $("#myModal").modal("show");
    }

    static showBombs() {
        for (let i = 0; i < Board.board.length; i++) {
            for (let j = 0; j < Board.board[i].length; j++) {
                if (Board._checkType([i, j]) === "bomb") {
                    Board.board[i][j].open = "open";
                    document.querySelector("#r" + i + "l" + j).className = "open bomb";
                }
            }
        }
    }
}