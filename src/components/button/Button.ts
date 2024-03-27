import Block from '../../core/Block.ts';
import template from './template.ts';

export interface IButtonProps {
    text?: string;
    icon?: string;
    alt?: string;
    attr?: { [key: string]: string };
    // eslint-disable-next-line no-unused-vars
    events?: { [key: string]: (event: Event) => void };
}

export default class Button extends Block<IButtonProps> {
    render() {
        return this.compile(template, this._props);
    }
}
