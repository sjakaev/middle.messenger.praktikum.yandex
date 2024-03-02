import template from './template.ts';
import Block from '../../core/Block.ts';

export default class Link extends Block {
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
