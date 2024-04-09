import Block from '../../../core/Block.ts';
import template from './template.ts';
import { IChatList } from './IChatList.ts';

export default class ChatList extends Block<IChatList> {
    render() {
        return this.compile(template, this._props);
    }
}
