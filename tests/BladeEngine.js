const Complier = require("./src/Complier");
const Tokenizer = require("./src/Tokenizer");

class BladeEngine extends Complier {
    parse() {
        let content = this.content.toString();
        let tokenize = new Tokenizer(this, content);
        return tokenize;
    }

    getDirectives() {
        return [/@extends\((.+)\)/gm, /@yield\((.+)\)/gm, /@section\((.+)\)/gm, /@endsection/gm];
    }

    getDecorators() {
        return [];
    }

    getConditions() {
        let baseCondtion = '@';
        let conditions = ['if', 'else', 'endif', 'unless', 'while', 'for', 'each'];
        return conditions.map(condition => new RegExp(`${baseCondtion}${condition}\((.+)\)`, 'gm'));
    }

    getOperators() {
        return ['=', '<', '>'];
    }
}


module.exports = BladeEngine;
