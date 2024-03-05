import Block from '../../core/Block.ts';
import template from './template.ts';

export interface IButton {
    text?: string;
    icon?: string;
    alt?: string;
}

export default class Button extends Block<IButton> {
    render() {
        return this.compile(template, this._props);
    }
}
