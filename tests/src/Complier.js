class Complier {
    constructor() {
        this.props = {
            content: null,
            data: {}
        };
    }

    parse() {
        throw "Method `parse()` is not create on extended class";
    }

    with(data) {
        Object.entries(data).forEach(([name, value]) => {
            this.props.data[name] = value;
        })
        return this;
    }

    get data() {
        return this.props.data;
    }

    get content() {
        return this.props.content;
    }

    set content(value) {
        this.props.content = value;
    }

    getDirectives() {
        return [];
    }

    getDecorators() {
        return [];
    }

    getConditions() {
        return [];
    }

    getOperators() {
        return [];
    }

    toString() {
        return this.content.toString();
    }
}

module.exports = Complier;
