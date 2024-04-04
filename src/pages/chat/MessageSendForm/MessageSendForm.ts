import template from './template.ts';
import Block from '../../../core/Block.ts';
import arrowRightIcon from '../../../assets/arrow-right.svg';
import {
    Input,
    Button,
    Form,
} from '../../../components/index.ts';

export interface IMessageSendFormProps {
    messageSendForm: Form;
    attr?: { [key: string]: string };
}

const setAttributeValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    const inputElement = event.target as HTMLInputElement;
    inputElement?.setAttribute('value', newValue);
};

const inputSendMessage: any = new Input('div', {
    value: '',
    name: 'message',
    type: 'text',
    class: 'message-send-form__message-input',
    placeholder: 'Your message',
    attr: {
        class: 'message-send-form__message-input-wrapper',
        type: 'submit',
        page: 'chat',
    },
    events: {
        input: setAttributeValue,
    },
});

export function createMessageElement(content: string) {
    const message = document.createElement('div');
    message.className = 'chat-window-body__message';
    message.innerText = content;

    return message;
}

export function createMessageResponseElement(content: string) {
    const message = document.createElement('div');
    message.className = 'chat-window-body__message';
    message.classList.add('chat-window-body__message_type_response');
    message.innerText = content;

    return message;
}

export const submitMessage = () => {
    const messageInputItem = inputSendMessage._element.querySelector('[name="message"]');
    const messageInputValue = messageInputItem.getAttribute('value');

    if (messageInputValue) {
        const messageElement = createMessageElement(messageInputValue);
        document.querySelector('.chat-window-body__messages-wrapper')?.appendChild(messageElement);
        messageInputItem.value = '';
    }
};

const buttonSendMessage: any = new Button('button', {
    text: '',
    icon: `${arrowRightIcon}`,
    alt: 'Send message',
    attr: {
        class: 'message-send-form__send-button',
        type: 'submit',
        page: 'chat',
    },
});

const messageSendForm = new Form('form', {
    inputSendMessage,
    buttonSendMessage,
    events: {
        submit: submitMessage,
    },
    attr: {
        id: 'message-send-form',
        name: 'message',
        class: 'message-send-form',
    },
});

export default class MessageSendForm extends Block<IMessageSendFormProps> {
    constructor() {
        super('div', {
            messageSendForm,
            attr: {
                class: 'chat__window-footer',
            },
        });
    }
    render() {
        return this.compile(template, this._props);
    }
}
