import template from './template.ts';
import Block from '../../core/Block.ts';

export interface ILink {
    href: string;
    text: string;
    page?: string;
    class?: string;
}

export default class Link extends Block<ILink> {
    render() {
        return this.compile(template, this._props);
    }

    addEvents() {
        if (!this._props.events) {
            return;
        }

        this._element
            .querySelector('.link')
            .addEventListener('click', this._props.events.click);

        super.addEvents();
    }
}
