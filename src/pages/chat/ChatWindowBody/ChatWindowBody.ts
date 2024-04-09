import Block from '../../../core/Block.ts';
import template from './template.ts';
import { IChatWindowBody } from './IChatWindowBody.ts';

export default class ChatWindowBody extends Block<IChatWindowBody> {
    constructor() {
        super('div', {
            attr: {
                class: 'chat-window-body',
            },
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}
