import template from './template.ts';
import Block from '../../core/Block.ts';

export default class Form extends Block {
    render() {
        return this.compile(template, this._props);
    }
}
