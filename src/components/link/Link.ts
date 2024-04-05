import template from './template.ts';
import Block from '../../core/Block.ts';

export interface ILinkProps {
    href: string;
    text: string;
    class?: string;
    attr?: { [key: string]: string };
    // eslint-disable-next-line no-unused-vars
    events?: { [key: string]: (event: Event) => void };
}

export default class Link extends Block<ILinkProps> {
    render() {
        return this.compile(template, this._props);
    }
}
