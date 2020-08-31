class Case {
    _type = "blank"; // or number or bomb
    _visual = "";
    _open = false;

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get visual() {
        return this._visual;
    }

    set visual(value) {
        this._visual = value;
    }

    get open() {
        return this._open;
    }

    set open(value) {
        this._open = value;
    }

    constructor(type, visual, moreInfos) {
        if(type != "blank" && type != "number" && type != "bomb") {
            console.error("An error occured while creating a new case, the attributed type isn't valid.\nMore infos : " + moreInfos);
        }
        this.type = type;
        this.visual = visual;
    }
}