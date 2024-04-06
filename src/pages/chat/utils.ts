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

export function formatUserList(userList: any) {
    return userList?.map((user: IUser) => `${user.login} (id: ${user.id})`).join(', ');
}

export async function componentInit(сhatItemList: any) {
    try {
        const response = await chatApi.getChats() as { response: IChat[] };
        const chats = response.response;

        сhatItemList.setProps({
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

export const createNewChat = async (event: Event, сhatItemList: any) => {
    event.preventDefault();
    event.stopPropagation();
    // eslint-disable-next-line
    const chatTitle = prompt('Enter the name of the new chat room');
    if (chatTitle) {
        await chatApi.createChat({ title: chatTitle }) as any;
        const responseGetChats = await chatApi.getChats() as { response: IChat[] };
        const chats = responseGetChats.response;
        сhatItemList.setProps({
            items: chats,
        });
    } else {
        // eslint-disable-next-line
        console.log('The name of the chat room cannot be empty');
    }
};

export const deleteChat = async (event: Event, сhatItemList: any) => {
    event.preventDefault();
    event.stopPropagation();
    // eslint-disable-next-line
    const chatTitle = prompt('Enter chat id');
    if (chatTitle) {
        await chatApi.deleteChat({ chatId: chatTitle }) as any;
        const responseGetChats = await chatApi.getChats() as { response: IChat[] };
        const chats = responseGetChats.response;
        сhatItemList.setProps({
            items: chats,
        });
    } else {
        // eslint-disable-next-line
        console.log('The chat id cannot be empty');
    }
};

export const sendMessage = async (socket: any, messageValue: any) => {
    socket.send(JSON.stringify({
        content: messageValue,
        type: 'message',
    }));
};

const socketСonnection = (userId: number, chatId: number, token: any) => {
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    socket.addEventListener('open', () => {
        // eslint-disable-next-line
        console.log('Соединение установлено');

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
            console.log('Соединение закрыто чисто');
        } else {
            // eslint-disable-next-line
            console.log('Обрыв соединения');
        }

        // eslint-disable-next-line
        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);

        if (data instanceof Array) {
            if (data.length > 0) {
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

    socket.addEventListener('error', (event: any) => {
        // eslint-disable-next-line
        console.log('Ошибка', event.message);
    });

    document.querySelector('.message-send-form')!.addEventListener('submit', (event) => {
        event.preventDefault();

        const messageInputItem = document.querySelector('.message-send-form__message-input');
        const messageInputValue = messageInputItem?.getAttribute('value');

        sendMessage(socket, messageInputValue);
    });
};

export const openTheСhat = async (event: Event, chatWindowHeader: any, chatPage: any) => {
    event.preventDefault();
    event.stopPropagation();
    const target = (event.target as HTMLElement).closest('.chat-list__item');
    if (target) {
        const chatId = target.getAttribute('data-id');
        if (chatId) {
            const responseGetChatUsers: any = await chatApi.getChatUsers(Number(chatId));
            const responseGetChats = await chatApi.getChats() as { response: IChat[] } as any;

            const chats = responseGetChats.response;
            const activeChat = getChatById(chats, Number(chatId));
            const users = responseGetChatUsers.response;

            chatWindowHeader.setProps({
                chatName: activeChat?.title,
                chatId: activeChat?.id,
                users,
                usersFormattedString: formatUserList(users),
            });

            chatPage.setProps({
                activeChat: JSON.stringify(activeChat, null, 2),
            });

            const host = 'https://ya-praktikum.tech';

            try {
                const response = await fetch(`${host}/api/v2/chats/token/${activeChat?.id ?? 0}`, {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                });
                const data = await response.json();
                const result: any = await authApi.getUser();
                const user = result.response;
                socketСonnection(user.id, activeChat?.id ?? 0, data.token);
            } catch (error) {
                // eslint-disable-next-line
                console.error('Error:', error);
            }
        }
    }
};
