import ChatSearch from './ChatSearch/ChatSearch.ts';
import ChatList from './ChatList/ChatList.ts';
import MessageSendForm from './MessageSendForm/MessageSendForm.ts';
import template from './template.ts';
import Block from '../../core/Block.ts';
import './MessageSendForm/messageSendForm.scss';
import './ChatSearch/chatSearch.scss';
import './ChatList/chatList.scss';
import './ChatWindowHeader/chatWindowHeader.scss';
import './Message/message.scss';
import './ChatWindowBody/chatWindowBody.scss';
import {
    Link, Button,
} from '../../components/index.ts';
import ChatWindowBody from './ChatWindowBody/ChatWindowBody.ts';
import ChatWindowHeader from './ChatWindowHeader/ChatWindowHeader.ts';
import { IChatListItem, IChatPageProps } from '../index.ts';
import {
    createNewChat, deleteChat, openSettingsPage, openTheСhat, componentInit,
} from './utils.ts';

const chats: IChatListItem[] = [];
const chatSearch = new ChatSearch();
const messageSendForm = new MessageSendForm();
const chatWindowHeader = new ChatWindowHeader('Chat name');
const chatWindowBody = new ChatWindowBody();

export default class ChatPage extends Block<IChatPageProps> {
    constructor() {
        const userSettingsButton = new Link('span', {
            text: 'Profile',
            class: 'chat__user-settings-button',
            events: {
                click: openSettingsPage,
            },
        });

        const chatList = new ChatList('ul', {
            items: chats,
            events: {
                click: (event: Event) => openTheСhat(event, chatWindowHeader, this),
            },
        });

        const buttonCreateNewChat = new Button('button', {
            text: 'Add new chat',
            attr: {
                class: 'btn chat__new-chat-button',
            },
            events: {
                click: (event: Event) => createNewChat(event, chatList),
            },
        });

        const buttonDeleteChat = new Button('button', {
            text: 'Delete chat',
            attr: {
                class: 'btn chat__delete-chat-button',
            },
            events: {
                click: (event: Event) => deleteChat(event, chatList),
            },
        });

        super('section', {
            userSettingsButton,
            chatSearch,
            chatList,
            buttonCreateNewChat,
            buttonDeleteChat,
            chatWindowHeader,
            chatWindowBody,
            messageSendForm,
            chats,
        });

        componentInit(chatList);
    }

    render() {
        return this.compile(template, this._props);
    }
}
