class Game {
    static _status = "ongoing"; // or lose or win


    static get status() {
        return Game._status;
    }

    static set status(value) {
        Game._status = value;
    }

    static resetGame() {
        Board.board = [];
        Board.addedBomb = 0;
    }
}