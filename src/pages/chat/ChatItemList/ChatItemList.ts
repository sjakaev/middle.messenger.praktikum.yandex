import Block from '../../../core/Block.ts';
import template from './template.ts';

export default class ChatItemList extends Block {
    render() {
        return this.compile(template, this._props);
    }
}
