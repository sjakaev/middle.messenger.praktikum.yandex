import template from './template.ts';
import Block from '../../core/Block.ts';

export interface ILink {
    href: string;
    text: string;
    page?: string;
    class?: string;
    attr?: { [key: string]: string };
    // eslint-disable-next-line no-unused-vars
    events?: { [key: string]: (event: Event) => void };
}

export default class Link extends Block<ILink> {
    render() {
        return this.compile(template, this._props);
    }
}
