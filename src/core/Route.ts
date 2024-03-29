import Block from './Block.ts';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(query: any, block: Block) {
    const root = document.querySelector(query);
    if (root === null) {
        throw new Error('root not found');
    }

    root.innerHTML = '';

    root.append(block.getContent()!);

    return root;
}

export default class Route {
    _pathname: string;
    _blockClass: any;
    _block: Block | null;
    _props: any;

    constructor(pathname: string, view: any, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block = null;
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            if (this._block) {
                render(this._props.rootQuery, this._block);
            }
        }
    }
}
