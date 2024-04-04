import {
    Link, Button,
} from '../../components/index.ts';
import ChatWindowBody from './ChatWindowBody/ChatWindowBody.ts';
import ChatList from './ChatList/ChatList.ts';
import ChatSearch from './ChatSearch/ChatSearch.ts';
import MessageSendForm from './MessageSendForm/MessageSendForm.ts';
import ChatWindowHeader from './ChatWindowHeader/ChatWindowHeader.ts';

export interface IUser {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
    role: string;
}

export interface IMessage {
    user: IUser;
    time: string;
    content: string;
}

export interface IChat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: IMessage;
}

export interface IChatPageProps {
    userSettingsButton: Link;
    chatSearch: ChatSearch;
    chatList: ChatList;
    buttonCreateNewChat: Button;
    buttonDeleteChat: Button;
    messageSendForm: MessageSendForm;
    chatWindowHeader: ChatWindowHeader;
    chatWindowBody: ChatWindowBody;
    chats: IChat[];
    activeChat?: any;
    chatId?: number;
    chatUsers?: any;
}

export type Chats = IChat[];
