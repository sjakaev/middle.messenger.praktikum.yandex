import Router from '../../core/Router.ts';
import './MessageSendForm/messageSendForm.scss';
import './ChatSearch/chatSearch.scss';
import './ChatList/chatList.scss';
import './ChatWindowHeader/chatWindowHeader.scss';
import './ChatWindowBody/chatWindowBody.scss';
import chatApi from '../../api/chatApi.ts';
import authApi from '../../api/authApi.ts';
import { createMessageResponseElement } from './MessageSendForm/MessageSendForm.ts';
import { IChat } from './IChat.ts';

export function formatUserList(userList: any) {
    return userList?.map((user) => `${user.login} (id: ${user.id})`).join(', ');
}

export async function componentInit(сhatItemList: any) {
    const response = await chatApi.getChats() as { response: IChat[] };
    const chats = response.response;
    console.log('chats = ', chats);

    сhatItemList.setProps({
        items: chats,
    });
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
    const chatTitle = prompt('Enter the name of the new chat room');
    if (chatTitle) {
        await chatApi.createChat({ title: chatTitle }) as any;
        const responseGetChats = await chatApi.getChats() as { response: IChat[] };
        const chats = responseGetChats.response;
        сhatItemList.setProps({
            items: chats,
        });
    } else {
        console.log('The name of the chat room cannot be empty');
    }
};

export const deleteChat = async (event: Event, сhatItemList: any) => {
    event.preventDefault();
    event.stopPropagation();
    const chatTitle = prompt('Enter chat id');
    if (chatTitle) {
        await chatApi.deleteChat({ chatId: chatTitle }) as any;
        const responseGetChats = await chatApi.getChats() as { response: IChat[] };
        const chats = responseGetChats.response;
        сhatItemList.setProps({
            items: chats,
        });
    } else {
        console.log('The chat id cannot be empty');
    }
};

export const sendMessage = async (socket: any, messageValue: any) => {
    socket.send(JSON.stringify({
        content: messageValue,
        type: 'message',
    }));
};

const socketСonnection = (userId: any, chatId: any, token: any) => {
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    socket.addEventListener('open', () => {
        console.log('Соединение установлено');

        socket.send(JSON.stringify({
            content: 'Моё первое сообщение миру!',
            type: 'message',
        }));
    });

    socket.addEventListener('close', (event) => {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', (event) => {
        const { content, user_id: dataUserId } = JSON.parse(event.data);

        if (dataUserId === userId) {
            return;
        }

        const messageElement = createMessageResponseElement(content);
        document.querySelector('.chat-window-body__messages-wrapper')?.appendChild(messageElement);
        console.log('Получены данные', event.data);
    });

    socket.addEventListener('error', (event: any) => {
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
            const chatWindowBody = document.querySelector('.chat__window-body');

            const chats = responseGetChats.response;
            const activeChat = getChatById(chats, Number(chatId));
            const users = responseGetChatUsers.response;
            // const users = JSON.stringify(responseGetChatUsers.response, null, 2);

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
                const response = await fetch(`${host}/api/v2/chats/token/${activeChat?.id}`, {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                });
                const data = await response.json();
                const result = await authApi.getUser();
                const user = result.response;
                socketСonnection(user.id, activeChat?.id, data.token);
            } catch (error) {
                console.error('Error:', error);
            }

            if (chatWindowBody) {
                chatWindowBody.textContent = '';
                chatWindowBody.textContent = JSON.stringify(responseGetChatUsers.response, null, 2);
            }
        }
    }
};
