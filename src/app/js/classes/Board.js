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
        let handler = (position) => {
            if(!Board.board[position[0]][position[1]].open) {
                document.querySelector("#r" + position[0] + "l" + position[1]).className = "open"
                Board._checkAroundBlank([position[0], position[1]])
            }
        }

        let handlerNumber = (position) => {
            document.querySelector("#r" + position[0] + "l" + position[1]).className = "open"
            Board.checkCase(position);
        }

        Board.board[pos[0]][pos[1]].open = true;

        if(Board._checkType([pos[0]-1,pos[1]+1]) === "blank") {
            handler([pos[0]-1,pos[1]+1]);
        }
        if(Board._checkType([pos[0]-1,pos[1]]) === "blank") {
            handler([pos[0]-1,pos[1]]);
        } else if(Board._checkType([pos[0]-1,pos[1]]) === "number") {
            handlerNumber([pos[0]-1,pos[1]]);
        }
        if(Board._checkType([pos[0]-1,pos[1]-1]) === "blank") {
            handler([pos[0]-1,pos[1]-1]);
        }
        if(Board._checkType([pos[0]+1,pos[1]+1]) === "blank") {
            handler([pos[0]+1,pos[1]+1]);
        }
        if(Board._checkType([pos[0]+1,pos[1]]) === "blank") {
            handler([pos[0]+1,pos[1]]);
        } else if(Board._checkType([pos[0]+1,pos[1]]) === "number") {
            handlerNumber([pos[0]+1,pos[1]]);
        }
        if(Board._checkType([pos[0]+1,pos[1]-1]) === "blank") {
            handler([pos[0]+1,pos[1]-1]);
        }
        if(Board._checkType([pos[0],pos[1]+1]) === "blank") {
            handler([pos[0],pos[1]+1]);
        } else if(Board._checkType([pos[0],pos[1]+1]) === "number") {
            handlerNumber([pos[0],pos[1]+1]);
        }
        if(Board._checkType([pos[0],pos[1]-1]) === "blank") {
            handler([pos[0],pos[1]-1]);
        } else if(Board._checkType([pos[0],pos[1]-1]) === "number") {
            handlerNumber([pos[0],pos[1]-1]);
        }

    }

    static _checkType(pos){
        if(typeof Board.board[pos[0]] === "undefined" || typeof Board.board[pos[0]][pos[1]] === "undefined") {
            return "void";
        }
        return Board.board[pos[0]][pos[1]].type;
    }


    // EXTERNAL METHODS

    static checkCase(pos) {
        Board.board[pos[0]]
        let type = Board._checkType(pos);
        if (type === "bomb") {
            document.querySelector("#r" + pos[0] + "l" + pos[1]).className += " bomb";
        } else if (type === "number") {
            document.querySelector("#r" + pos[0] + "l" + pos[1]).innerHTML = Board.board[pos[0]][pos[1]].visual;
        } else if (type === "blank") {
            Board._checkAroundBlank(pos);
        } else if (type === "void") {
            return
        } else {
            console.error("The type of the cellule at the position " + pos + " isn't valid.\nType of the cellule : " + type)
        }
        return
    }
}