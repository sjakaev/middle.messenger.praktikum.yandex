import template from './template.ts';
import Block from '../../../core/Block.ts';
import {
    Input,
    Button,
    Form,
} from '../../../components/index.ts';

const inputSendMessage = new Input('div', {
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
});

const submitMessage = () => {
    const messageInputItem = inputSendMessage._element.querySelector('[name="message"]');
    const messageInputValue = messageInputItem.getAttribute('value');
    const form = document.querySelector('#message-send-form');

    if (messageInputValue) {
        console.log('--------------------------------');
        // eslint-disable-next-line
        console.log('messageSendForm', messageSendForm);
        console.log('Form name:', form.name);
        console.log('message', messageInputValue);
        console.log('--------------------------------');
    }
};

const buttonSendMessage = new Button('button', {
    text: '',
    icon: '/src/assets/arrow-right.svg',
    alt: 'Send message',
    attr: {
        class: 'message-send-form__send-button',
        type: 'submit',
        page: 'chat',
    },
    events: {
        click: submitMessage,
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

export default class MessageSendForm extends Block {
    constructor() {
        super('div', {
            messageSendForm,
            attr: {
                class: 'chat__window-footer',
            },
        });
    }
    render() {
        return this.compile(template);
    }
}
