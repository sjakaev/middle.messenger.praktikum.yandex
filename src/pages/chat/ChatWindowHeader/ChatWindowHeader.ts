import Block from '../../../core/Block.ts';
import template from './template.ts';
import {
    Button,
} from '../../../components/index.ts';
import chatApi from '../../../api/chatApi.ts';
import chatSettingsIcon from '../../../assets/chat-settings.svg';
import { IUser } from '../IChat.ts';
import {
    formatUserList,
} from '../utils.ts';
import { IChatWindowHeader } from './IChatWindowHeader.ts';

const handlerUserSettingsClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    document.querySelector('.chat-window-header__settings-wrapper')?.classList
        .toggle('chat-window-header__settings-wrapper_active');
};

export default class chatWindowHeader extends Block<IChatWindowHeader> {
    constructor(chatName: string, chatId?: number, users?: IUser[]) {
        const userSettingsButton = new Button('button', {
            text: '',
            icon: `${chatSettingsIcon}`,
            attr: {
                class: 'chat-window-header__settings',
            },
            events: {
                click: handlerUserSettingsClick,
            },
        });

        const addUsersButton = new Button('button', {
            text: 'Add users',
            attr: {
                class: 'chat-window-header__add-user-button',
            },
            events: {
                click: (event: Event) => this.handlerAddUsersButtonClick(event),
            },
        });

        const deleteUsersButton = new Button('button', {
            text: 'Delete users',
            attr: {
                class: 'chat-window-header__delete-user-button',
            },
            events: {
                click: (event: Event) => this.handlerDeleteUsersButtonClick(event),
            },
        });

        const usersFormattedString = '';

        super('div', {
            chatName,
            chatId,
            users,
            usersFormattedString,
            userSettingsButton,
            addUsersButton,
            deleteUsersButton,
        });
    }

    handlerAddUsersButtonClick = async (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        // eslint-disable-next-line
        const usersId = prompt('Enter the user id');
        const { chatId } = this._props;
        if (usersId) {
            await chatApi.addUsersToChat(
                {
                    users: [usersId],
                    chatId,
                },
            );
            const responseGetChatUsers: any = await chatApi.getChatUsers(Number(chatId));
            const users = responseGetChatUsers.response;
            const usersFormattedString = formatUserList(users);

            this.setProps({
                ...this._props,
                users,
                usersFormattedString,
            });
        } else {
            // eslint-disable-next-line
            console.log('Error adding user to chat');
        }
    };

    handlerDeleteUsersButtonClick = async (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        // eslint-disable-next-line
        const usersId = prompt('Enter the user id');
        const { chatId } = this._props;
        if (usersId) {
            await chatApi.deleteUsersFromChat(
                {
                    users: [usersId],
                    chatId,
                },
            );
            const responseGetChatUsers: any = await chatApi.getChatUsers(Number(chatId));
            const users = responseGetChatUsers.response;
            const usersFormattedString = formatUserList(users);

            this.setProps({
                ...this._props,
                users,
                usersFormattedString,
            });
        } else {
            // eslint-disable-next-line
            console.log('Error deleting user from chat');
        }
    };

    render() {
        return this.compile(template, this._props);
    }
}
