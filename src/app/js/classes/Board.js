class Board {

    // PROPERTIES

    static _board = [];
    static _size = 10;
    static _bomb = 10;
    static _addedBomb = 0;



    // GETTERS & SETTERS

    static get board() {
        return Board._board;
    }

    static set board(value) {
        Board._board = value;
    }

    static get size() {
        return Board._size;
    }

    static set size(value) {
        Board._size = value;
    }

    static get bomb() {
        return Board._bomb;
    }

    static set bomb(value) {
        Board._bomb = value;
    }

    static get addedBomb() {
        return Board._addedBomb;
    }

    static set addedBomb(value) {
        Board._addedBomb = value;
    }



    // LOCAL METHODS

    static _createBoard() {
        Game.resetGame();
        for (let i = 0; i < Board.size; i++) {
            Board.board[i] = [];
            for (let j = 0; j < Board.size; j++) {
                Board.board[i][j] = Board._randomCase([i,j]);
                if(this._checkType([i,j]) === "bomb") {
                    Board.addedBomb++;
                }
            }
        }
        if (Board.addedBomb < Board.bomb) {
            Board._createBoard();
        }
        document.getElementsByTagName("tbody")[0].innerHTML = "";
        for (let i = 0; i < Board.size; i++) {
            document.getElementsByTagName("tbody")[0].innerHTML = document.getElementsByTagName("tbody")[0].innerHTML + "<tr id='r"+i+"'></tr>";
            for (let j = 0; j < Board.size; j++) {
                if(Board._checkType([i,j]) != "bomb") {
                    let bombAround = this._checkAroundBomb([i,j]);
                    if(bombAround > 0) {
                        Board.board[i][j] = new Case("number", bombAround.toString(), "at the position : " + [i,j]);
                    }
                }
                document.getElementById("r"+i).innerHTML = document.getElementById("r"+i).innerHTML + "<td id='r"+ i + "l" + j + "' ></td>";
            }
        }
    }

    static _randomCase(pos){
        if(Board.addedBomb >= Board.bomb) {
            return new Case("blank", "", "at the position : " + pos);
        }
        let rdmInt = Utility.getRandomInt(Board.size*Board.size);
        return rdmInt <= (Board.bomb/(Board.size/3.5)) ? new Case("bomb", "x",  "at the position : " + pos) : new Case("blank", "",  "at the position : " + pos);
    }

    static _checkAroundBomb(pos) {
        let bombCount = 0;
        if(Board._checkType([pos[0]-1,pos[1]+1]) === "bomb") {
            bombCount++;
        }
        if(Board._checkType([pos[0]-1,pos[1]]) === "bomb") {
            bombCount++;
        }
        if(Board._checkType([pos[0]-1,pos[1]-1]) === "bomb") {
            bombCount++;
        }
        if(Board._checkType([pos[0]+1,pos[1]+1]) === "bomb") {
            bombCount++;
        }
        if(Board._checkType([pos[0]+1,pos[1]]) === "bomb") {
            bombCount++;
        }
        if(Board._checkType([pos[0]+1,pos[1]-1]) === "bomb") {
            bombCount++;
        }
        if(Board._checkType([pos[0],pos[1]+1]) === "bomb") {
            bombCount++;
        }
        if(Board._checkType([pos[0],pos[1]-1]) === "bomb") {
            bombCount++;
        }
        return bombCount;
    }

    static _checkAroundBlank(pos) {
        if (typeof pos[0] != "object") {
            pos = [pos];
        }

        let foundBlanksPos = [];
        pos.forEach((position) => {
            Board._checkCross(position, "blank", (pos) => {
                foundBlanksPos.push([pos[0], pos[1]]);
                Board.board[pos[0]][pos[1]].open = true;
                document.querySelector("#r" + (pos[0]).toString() + "l" + (pos[1]).toString()).className = "open";

            })
        })
        if (foundBlanksPos.length > 0) {
            Board._checkAroundBlank(foundBlanksPos);
        }
        return Board._checkAroundNumber();
    }

    static _checkAroundNumber() {
        for (let i = 0; i < Board.board.length; i++) {
            for (let j = 0; j < Board.board[i].length; j++) {
                if(Board.board[i][j].open && Board._checkType([i, j]) === "blank") {
                    Board._checkCross([i, j], 'number', (pos) => {
                        Board.board[pos[0]][pos[1]].open = true;
                        document.querySelector("#r" + (pos[0]).toString() + "l" + (pos[1]).toString()).className = "open";
                        document.querySelector("#r" + (pos[0]).toString() + "l" + (pos[1]).toString()).innerHTML = Board.board[pos[0]][pos[1]].visual;
                    })
                }
            }
        }
    }

    static _checkType(pos){
        if(typeof pos === "undefined" || typeof pos[0] === "undefined" || typeof pos[1] === "undefined" || typeof Board.board[pos[0]] === "undefined" || typeof Board.board[pos[0]][pos[1]] === "undefined") {
            return "void";
        }
        return Board.board[pos[0]][pos[1]].type;
    }

    static _checkCross(position, type, todo = () => {}) {
        if (Board._checkType([position[0], position[1]+1]) === type && !Board.board[position[0]][position[1]+1].open) {
            todo([position[0], position[1]+1]);
        }

        if (Board._checkType([position[0], position[1]-1]) === type && !Board.board[position[0]][position[1]-1].open) {
            todo([position[0], position[1]-1]);
        }

        if (Board._checkType([position[0]+1, position[1]]) === type && !Board.board[position[0]+1][position[1]].open) {
            todo([position[0]+1, position[1]]);
        }

        if (Board._checkType([position[0]-1, position[1]]) === type && !Board.board[position[0]-1][position[1]].open) {
            todo([position[0]-1, position[1]]);
        }
    }

    static _isOnlyBomb() {
        let nbOpenedCase = 0;
        for (let i = 0; i < Board.board.length; i++) {
            for (let j = 0; j < Board.board[i].length; j++) {
                if(Board._checkType([i, j]) === "number" && Board._checkType([i, j]) === "blank"){
                    if(!Board.board[i][j].open) {
                        nbOpenedCase++;
                    }
                }
            }
        }
        if (nbOpenedCase >= ((Board.size * Board.size) - Board.bomb)) {
            Game.winnedGame();
        }
    }


    // EXTERNAL METHODS

    static checkCase(pos) {
        let type = Board._checkType(pos);
        if (type === "bomb") {
            document.querySelector("#r" + pos[0] + "l" + pos[1]).className += " bomb";
            Game.losedGame();
        } else if (type === "number") {
            document.querySelector("#r" + pos[0] + "l" + pos[1]).innerHTML = Board.board[pos[0]][pos[1]].visual;
            Board._isOnlyBomb();
        } else if (type === "blank") {
            Board._checkAroundBlank(pos);
            Board._checkAroundNumber();
            Board._isOnlyBomb();
        } else if (type === "void") {
            return
        } else {
            console.error("The type of the cellule at the position " + pos + " isn't valid.\nType of the cellule : " + type)
        }
        return
    }
}