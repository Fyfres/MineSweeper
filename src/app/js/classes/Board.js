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
            if (Board._checkType([position[0], position[1]+1]) === "blank" && !Board.board[position[0]][position[1]+1].open) {
                foundBlanksPos.push([position[0], position[1]+1]);
                Board.board[position[0]][position[1]+1].open = true;
                document.querySelector("#r" + (position[0]).toString() + "l" + (position[1]+1).toString()).className = "open";
            } else if (Board._checkType([position[0], position[1]+1]) === "number" && !Board.board[position[0]][position[1]+1].open) {
                Board.board[position[0]][position[1]+1].open = true;
                document.querySelector("#r" + (position[0]).toString() + "l" + (position[1]+1).toString()).className = "open";
                document.querySelector("#r" + (position[0]).toString() + "l" + (position[1]+1).toString()).innerHTML = Board.board[position[0]][position[1]+1].visual;
            }

            if (Board._checkType([position[0], position[1]-1]) === "blank" && !Board.board[position[0]][position[1]-1].open) {
                foundBlanksPos.push([position[0], position[1]-1]);
                Board.board[position[0]][position[1]-1].open = true;
                Board.checkCase([position[0], position[1]-1]);
                document.querySelector("#r" + (position[0]).toString() + "l" + (position[1]-1).toString()).className = "open";
            } else if (Board._checkType([position[0], position[1]-1]) === "number" && !Board.board[position[0]][position[1]-1].open) {
                Board.board[position[0]][position[1]-1].open = true;
                document.querySelector("#r" + (position[0]).toString() + "l" + (position[1]-1).toString()).className = "open";
                document.querySelector("#r" + (position[0]).toString() + "l" + (position[1]-1).toString()).innerHTML = Board.board[position[0]][position[1]-1].visual;
            }

            if (Board._checkType([position[0]+1, position[1]]) === "blank" && !Board.board[position[0]+1][position[1]].open) {
                foundBlanksPos.push([position[0]+1, position[1]]);
                Board.board[position[0]+1][position[1]].open = true;
                Board.checkCase([position[0]+1, position[1]]);
                document.querySelector("#r" + (position[0]+1).toString() + "l" + (position[1]).toString()).className = "open";
            } else if (Board._checkType([position[0]+1, position[1]]) === "number" && !Board.board[position[0]+1][position[1]].open) {
                Board.board[position[0]+1][position[1]].open = true;
                document.querySelector("#r" + (position[0]+1).toString() + "l" + (position[1]+1).toString()).className = "open";
                document.querySelector("#r" + (position[0]+1).toString() + "l" + (position[1]+1).toString()).innerHTML = Board.board[position[0]+1][position[1]].visual;
            }

            if (Board._checkType([position[0]-1, position[1]]) === "blank" && !Board.board[position[0]-1][position[1]].open) {
                foundBlanksPos.push([position[0]-1, position[1]]);
                Board.board[position[0]-1][position[1]].open = true;
                Board.checkCase([position[0]-1, position[1]]);
                document.querySelector("#r" + (position[0]-1).toString() + "l" + (position[1]).toString()).className = "open";
            } else if (Board._checkType([position[0]-1, position[1]]) === "number" && !Board.board[position[0]-1][position[1]].open) {
                Board.board[position[0]-1][position[1]].open = true;
                document.querySelector("#r" + (position[0]-1).toString() + "l" + (position[1]).toString()).className = "open";
                document.querySelector("#r" + (position[0]-1).toString() + "l" + (position[1]).toString()).innerHTML = Board.board[position[0]-1][position[1]].visual;
            }
        })
        if (foundBlanksPos.length > 0) {
            Board._checkAroundBlank(foundBlanksPos);
        }
    }

    static _checkType(pos){
        if(typeof pos === "undefined" || typeof pos[0] === "undefined" || typeof pos[1] === "undefined" || typeof Board.board[pos[0]] === "undefined" || typeof Board.board[pos[0]][pos[1]] === "undefined") {
            return "void";
        }
        return Board.board[pos[0]][pos[1]].type;
    }


    // EXTERNAL METHODS

    static checkCase(pos) {
        let type = Board._checkType(pos);
        if (type === "bomb") {
            document.querySelector("#r" + pos[0] + "l" + pos[1]).className += " bomb";
            Game.losedGame();
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