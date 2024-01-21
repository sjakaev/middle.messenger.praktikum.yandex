import Handlebars from "handlebars";
export { default as chat } from './chat.hbs?raw';
import {ChatItem} from "./ChatItem/index.ts";
import {ChatSearch} from "./ChatSearch/index.ts";
import "./ChatSearch/ChatSearch.scss";

Handlebars.registerPartial('ChatItem', ChatItem);
Handlebars.registerPartial('ChatSearch', ChatSearch);

Handlebars.registerHelper('chats', () => {
    return [
        {
            chatName: "Alex",
            lastMessage: "Hi, how are you?",
            time: "08:16",
            unreadCount: 1,
        },
        {
            chatName: "Alex",
            lastMessage: "Hi, how are you?",
            time: "08:16",
            unreadCount: 1,
        },
        {
            chatName: "Alex",
            lastMessage: "Hi, how are you?",
            time: "08:16",
            unreadCount: 1,
        },
        {
            chatName: "Alex",
            lastMessage: "Hi, how are you?",
            time: "08:16",
            unreadCount: 1,
        },
    ];
});
