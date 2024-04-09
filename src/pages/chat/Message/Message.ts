import template from './template.ts';
import Block from '../../../core/Block.ts';
import { IMessage } from './IMessage.ts';

export default class Message extends Block {
    constructor(messageInfo: IMessage, isResponse: boolean) {
        super('section', {
            messageInfo,
            isResponse,
            attr: {
                class: 'chat-message',
            },
        });
    }

    static scrollToLastMessage() {
        const messagesWrapper = document.querySelector('.chat-window-body__messages-wrapper');
        const lastMessage = messagesWrapper?.lastChild as HTMLElement;
        lastMessage?.scrollIntoView();
    }

    addMessage() {
        const messagesWrapper = document.querySelector('.chat-window-body__messages-wrapper');
        if (messagesWrapper) {
            messagesWrapper.append(this._element);
        }
        Message.scrollToLastMessage();
    }

    render() {
        return this.compile(template, this._props);
    }
}
