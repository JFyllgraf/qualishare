import * as Helpers from '../Utility/Helpers';

class Code {
    static ID = 0;

    constructor(name) {
        const Name = name; //'const' is private variable
        const Id = () => Code.ID++;
        this.memo = []; //'this' is publicly accessible variable
        this.link = undefined;
        const color = Helpers.rainbow(2,10);

        //getters
        this.getName = function() { return Name };
        this.getId = function() { return Id };
        this.getColor = function() { return color};
    }
}

export default Code


