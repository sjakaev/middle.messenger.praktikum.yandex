import Router from '../../core/Router.ts';
import './MessageSendForm/messageSendForm.scss';
import './ChatSearch/chatSearch.scss';
import './ChatList/chatList.scss';
import './ChatWindowHeader/chatWindowHeader.scss';
import './ChatWindowBody/chatWindowBody.scss';
import chatApi from '../../api/chatApi.ts';
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
            console.log('users = ', users);
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

            if (chatWindowBody) {
                chatWindowBody.textContent = '';
                chatWindowBody.textContent = JSON.stringify(responseGetChatUsers.response, null, 2);
            }
        }
    }
};
