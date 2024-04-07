import Router from '../../core/Router.ts';
import './MessageSendForm/messageSendForm.scss';
import './ChatSearch/chatSearch.scss';
import './ChatList/chatList.scss';
import './ChatWindowHeader/chatWindowHeader.scss';
import './ChatWindowBody/chatWindowBody.scss';
import chatApi from '../../api/chatApi.ts';
import authApi from '../../api/authApi.ts';
import { IChat, IUser } from './IChat.ts';
import Message from './Message/Message.ts';

export function formatUserList(userList: Array<IUser> | undefined) {
    return userList?.map((user: IUser) => `${user.login} (id: ${user.id})`).join(', ');
}

export async function componentInit(сhatList: any) {
    try {
        const response = await chatApi.getChats() as { response: IChat[] };
        const chats = response.response;

        сhatList.setProps({
            items: chats,
        });
    } catch (error: any) {
        if (error.reason === 'Cookie is not valid') {
            Router.go('/');
            return;
        }
        // eslint-disable-next-line
        console.log('error: ', error);
    }
}

export function getChatById(userChats: IChat[], chatId: number) {
    return userChats.find((chat: IChat) => chat.id === chatId);
}

export const openSettingsPage = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    Router.go('/settings');
};

export const createNewChat = async (event: Event, сhatList: any) => {
    event.preventDefault();
    event.stopPropagation();
    // eslint-disable-next-line
    const chatTitle = prompt('Enter the name of the new chat room');
    if (chatTitle) {
        await chatApi.createChat({ title: chatTitle }) as any;
        const responseGetChats = await chatApi.getChats() as { response: IChat[] };
        const chats = responseGetChats.response;
        сhatList.setProps({
            items: chats,
        });
    } else {
        // eslint-disable-next-line
        console.log('The name of the chat room cannot be empty');
    }
};

export const deleteChat = async (event: Event, сhatList: any) => {
    event.preventDefault();
    event.stopPropagation();
    // eslint-disable-next-line
    const chatTitle = prompt('Enter chat id');
    if (chatTitle) {
        await chatApi.deleteChat({ chatId: chatTitle }) as any;
        const responseGetChats = await chatApi.getChats() as { response: IChat[] };
        const chats = responseGetChats.response;
        сhatList.setProps({
            items: chats,
        });
    } else {
        // eslint-disable-next-line
        console.log('The chat id cannot be empty');
    }
};

export const sendMessage = async (socket: any, messageValue: string) => {
    socket.send(JSON.stringify({
        content: messageValue,
        type: 'message',
    }));
};

const socketСonnection = async (chatId: number, token: string, chatPage: any) => {
    const user: any = await authApi.getUser();
    const userId = user.response.id;

    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    socket.addEventListener('open', () => {
        // eslint-disable-next-line
        console.log('Connection established');

        const messagesWrapper = document
            .querySelector('.chat-window-body__messages-wrapper');
        if (messagesWrapper) {
            messagesWrapper.innerHTML = '';
        }

        socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
        }));
    });

    socket.addEventListener('close', (event) => {
        if (event.wasClean) {
            // eslint-disable-next-line
            console.log('Connection closed cleanly');
        } else {
            // eslint-disable-next-line
            console.log('Connection failure');
        }

        // eslint-disable-next-line
        console.log(`Code: ${event.code} | Reason: ${event.reason}`);
    });

    socket.addEventListener('message', (event) => {
        let data;
        try {
            data = JSON.parse(event.data);
        } catch (error) {
            console.error('Data parsing error:', error);
            return;
        }

        if (data instanceof Array) {
            if (data.length > 0) {
                data = data.reverse();
                data.forEach((message: any) => {
                    if (message.user_id === userId) {
                        const messageRequest = new Message(message, false);
                        messageRequest.addMessage();
                    }

                    if (message.user_id !== userId) {
                        const messageResponse = new Message(message, true);
                        messageResponse.addMessage();
                    }
                });
            }
        }

        if (data.content) {
            if (data.user_id === userId) {
                return;
            }

            const messageResponse = new Message(data, true);
            messageResponse.addMessage();
        }
    });

    const { messageSendForm } = chatPage._children;
    messageSendForm._props.events = {
        submit: (event: Event) => {
            event.preventDefault();
            const messageInputItem = document.querySelector('.message-send-form__message-input');
            const messageInputValue = messageInputItem?.getAttribute('value') || '';
            sendMessage(socket, messageInputValue);
        },
    };
};

const getToken = async (chatId: number) => {
    const host = 'https://ya-praktikum.tech';
    let socketToken;
    try {
        const response = await fetch(`${host}/api/v2/chats/token/${chatId}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        });
        const result = await response.json();
        socketToken = result.token;
    } catch (error) {
        // eslint-disable-next-line
        console.error('Error:', error);
    }
    return socketToken;
};

const getChatAndUsers = async (chatId: string) => {
    const responseGetChatUsers: any = await chatApi.getChatUsers(Number(chatId));
    const responseGetChats = await chatApi.getChats() as { response: IChat[] } as any;

    const chats = responseGetChats.response;
    const activeChat = getChatById(chats, Number(chatId));
    const users = responseGetChatUsers.response;

    return { activeChat, users };
};

const updateChatWindowHeader = (chatWindowHeader: any, activeChat: IChat
    | undefined, users: IUser[]) => {
    chatWindowHeader.setProps({
        chatName: activeChat?.title,
        chatId: activeChat?.id,
        users,
        usersFormattedString: formatUserList(users),
    });
};

const updateChatPageProps = (chatPage: any, activeChat: IChat | undefined) => {
    chatPage.setProps({
        activeChat,
    });
};

export const openTheСhat = async (event: Event, chatWindowHeader: any, chatPage: any) => {
    const target = (event.target as HTMLElement).closest('.chat-list__item');
    const chatId = target!.getAttribute('data-id')!;
    const { activeChat, users } = await getChatAndUsers(chatId);
    updateChatWindowHeader(chatWindowHeader, activeChat, users);
    updateChatPageProps(chatPage, activeChat);

    const token = await getToken(activeChat!.id);
    socketСonnection(activeChat!.id, token, chatPage);
};
