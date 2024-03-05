import template from './template.ts';
import Block from '../../core/Block.ts';

export interface IForm {
    name?: string;
}

export default class Form extends Block<IForm> {
    render() {
        return this.compile(template, this._props);
    }
}
