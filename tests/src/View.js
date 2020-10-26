class View {
    constructor({
        root = 'view',
        layoutsDir = 'view',
        layoutDefault = '',
    }) {
        this.root = root;
        this.layouts = {
            dir: layoutsDir,
            default: layoutDefault
        };

        console.log(layoutsDir);
    }
}

module.exports = View;
