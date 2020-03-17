import * as Helpers from '../Utility/Helpers';
var randomColor = require('randomcolor');

class Code {
    static ID = 0;

    constructor(name) {
        const Name = name; //'const' is private variable
        const Id = Code.ID;
        Code.ID = Code.ID + 1;
        this.memo = []; //'this' is publicly accessible variable
        this.link = undefined;
        const color = randomColor();

        //getters
        this.getName = function() { return Name };
        this.getId = function() { return Id };
        this.getColor = function() { return color};
    }
}

export default Code
