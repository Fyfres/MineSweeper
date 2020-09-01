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

    static resetGame() {
        Board.board = [];
        Board.addedBomb = 0;
        document.getElementsByTagName("tbody")[0].innerHTML = "";
    }

    static losedGame() {
        for (let i = 0; i < Board.board.length; i++) {
            for (let j = 0; j < Board.board[i].length; j++) {
                if (Board._checkType([i, j]) === "bomb") {
                    Board.board[i][j].open = "open";
                    document.querySelector("#r" + i + "l" + j).className = "open bomb";
                }
            }
        }

        document.querySelector("#myModalTitle").innerHTML = "Perdu !";
        document.querySelector("#myModaBody").innerHTML = "Vous avez perdu ! Ne perdez pas confiance, ca arrive à tout le monde !";
        $("#myModal").modal("show");
    }
}