const Complier = require("./Complier");
let uid = 0;

class Tokenizer {
    constructor(complier, content) {
        if (!complier instanceof Complier) {
            throw new TypeError('argument[0] `complier` must be instance of Complier');
        }
        let contents = {};
        let conditions = complier.getConditions();
        let directives = complier.getDirectives();
        let decorators = complier.getDecorators();
        let operators = complier.getOperators();

        for (let condition of conditions) {
            let tokens = [];
            let matched = content.match(condition);
            if (matched) {
                tokens.push({
                    type: 'condition',
                    prototype: condition,
                    matched: condition.exec(content)[1]
                });
            }
            contents[uid++] = tokens;
        }

        this.conditions = contents;

        contents = {};
        uid = 0;

        for (let directive of directives) {
            let tokens = [];
            let matched = content.match(directive);
            if (matched) {
                tokens.push({
                    type: 'directive',
                    prototype: directive,
                    matched: directive.exec(content)[1]
                })
            }
            contents[uid++] = tokens;
        }

        this.directives = contents;
    }
}

module.exports = Tokenizer;
