import ChatSearch from './ChatSearch/ChatSearch.ts';
import ChatItemList from './ChatItemList/ChatItemList.ts';
import MessageSendForm from './MessageSendForm/MessageSendForm.ts';
import template from './template.ts';
import Block from '../../core/Block.ts';
import Router from '../../core/Router.ts';
import './MessageSendForm/messageSendForm.scss';
import './ChatSearch/chatSearch.scss';
import './ChatItemList/chatItemList.scss';
import {
    Nav, Link,
} from '../../components/index.ts';

interface IChatPageProps {
    userSettingsButton: Link;
    chatSearch: ChatSearch;
    chatItemList: ChatItemList;
    nav: Nav;
    messageSendForm: MessageSendForm;
}

const handlerUserSettingsClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    Router.go('/settings');
};

const userSettingsButton = new Link('span', {
    text: 'Profile',
    class: 'chat__user-settings-button',
    events: {
        click: handlerUserSettingsClick,
    },
});

const nav = new Nav();

const chatSearch = new ChatSearch();
const messageSendForm = new MessageSendForm();

const chatItemList = new ChatItemList(
    'ul',
    {
        items: [
            {
                chatName: 'Liza',
                lastMessage: 'I love you!',
                time: '11:11',
                unreadsCount: 1,
            },
            {
                chatName: 'Alex',
                lastMessage: 'Hi, Bro',
                time: '23:12',
                unreadsCount: 1,
            },
            {
                chatName: 'John',
                lastMessage: 'Hi, how are you?',
                time: '09:11',
                unreadsCount: 4,
            },
            {
                chatName: 'Anastasia',
                lastMessage: 'What do u think about it?',
                time: '08:16',
                unreadsCount: 91,
            },
            {
                chatName: 'Kate',
                lastMessage: 'ok',
                time: '10:01',
                unreadsCount: 2,
            },
        ],
    },
);

export default class ChatPage extends Block<IChatPageProps> {
    constructor() {
        super('section', {
            userSettingsButton,
            chatSearch,
            chatItemList,
            nav,
            messageSendForm,

        });
    }
    render() {
        return this.compile(template, this._props);
    }
}
