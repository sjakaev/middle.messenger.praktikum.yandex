import Block from '../../../core/Block.ts';
import template from './template.ts';

interface IChatItemListProps {
    items: {
        chatName: string;
        lastMessage: string;
        time: string;
        unreadsCount: number;
    }[];
}

export default class ChatItemList extends Block<IChatItemListProps> {
    render() {
        return this.compile(template, this._props);
    }
}
