import Block from '../../../core/Block.ts';

import template from './template.ts';
import {
    Input,
    Form,
} from '../../../components/index.ts';

const inputChatSearch = new Input('div', {
    value: '',
    name: 'chat_search',
    type: 'text',
    placeholder: 'Search',
    class: 'chat-search__input',
    attr: {
        class: 'chat-search input',
    },
});

const submitChatSearchForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
};

const chatSearchForm = new Form('form', {
    inputChatSearch,
    events: {
        submit: submitChatSearchForm,
    },
    attr: {
        id: 'chat_search',
        name: 'chat_search',
    },
});

export default class ChatSearch extends Block {
    constructor() {
        super('section', {
            chatSearchForm,
        });
    }
    render() {
        return this.compile(template);
    }
}
