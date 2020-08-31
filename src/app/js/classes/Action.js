class Action {

    static allEventListeners = []

    static initActions() {
        Action._removeAllListeners();

        Action._clickBoard();
    }

    static _removeAllListeners(){
        Action.allEventListeners.forEach((eventlistener) => {
            eventlistener[0].removeEventListener(eventlistener[1], eventlistener[2]);
        })
    }

    static _clickBoard() {
        let handler1 = (event) => {
            if (event.target.localName === "td") {
                    if (event.target.className === "") {
                        event.target.className = "open";
                    }
                    let id = event.target.attributes.id.value;
                    Board.checkCase([id[1], id[3]]);
            }
            return false
        }
        window.addEventListener("click", handler1);
        Action.allEventListeners.push([window, "click", handler1])


        let handler2 = (event) => {
            event.preventDefault();
            if (event.target.localName === "td") {
                console.log(event.target.className === "flagged")
                if (event.target.className === "flagged"){
                    event.target.className = "";
                } else if (event.target.className === ""){
                    event.target.className = "flagged";
                }

            }
            return false;
        }
        window.addEventListener("contextmenu", handler2);
        Action.allEventListeners.push([window, "contextmenu",handler2])
    }
}