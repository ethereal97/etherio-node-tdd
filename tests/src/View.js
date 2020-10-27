const {
    existsSync,
    readFileSync
} = require('fs');
const {
    join
} = require('path');
const Complier = require('./Complier');

class View {
    constructor({
        root,
        extension = 'blade.php',
        layoutsDir = 'layouts',
        data = {}
    }) {
        this.root = root;
        this.layouts = {
            dir: layoutsDir,
        };
        this.extension = extension;
        this.data = data;
        this.response = {
            file: null,
            data: {}
        };
        this.engine = new Complier;
    }

    use(engine) {
        if (!engine instanceof Complier) {
            throw new TypeError("View engine must be instance of Complier");
        }
        this.engine = engine;
    }

    path(file) {
        return [join(this.root || '.', file), this.extension].join('.');
    }

    render(path, data = {}) {
        this.response.file = this.path(path);
        if (!existsSync(this.response.file)) {
            throw new Error(`File does not exist: ${this.response.file}`);
        }
        let complier = this.engine
        complier = new complier;
        complier.content = readFileSync(this.response.file);
        complier.with(this.data).with(data);
        return complier;
    }
}

module.exports = View;
