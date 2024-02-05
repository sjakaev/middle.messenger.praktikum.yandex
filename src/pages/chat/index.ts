import Handlebars from 'handlebars';
import { ChatItem } from './ChatItem/index.ts';
import { ChatSearch } from './ChatSearch/index.ts';
import { UserSettingsButton } from './UserSettingsButton/index.ts';
import { MessageSendForm } from './MessageSendForm/index.ts';
import './ChatSearch/ChatSearch.scss';
import './ChatItem/ChatItem.scss';
import './UserSettingsButton/UserSettingsButton.scss';
import './MessageSendForm/MessageSendForm.scss';
import arrowRight from '../../assets/arrow-right.svg';
import addFile from '../../assets/add-file.svg';

export { default as chat } from './chat.hbs?raw';

Handlebars.registerPartial('ChatItem', ChatItem);
Handlebars.registerPartial('ChatSearch', ChatSearch);
Handlebars.registerPartial('UserSettingsButton', UserSettingsButton);
Handlebars.registerPartial('MessageSendForm', MessageSendForm);
Handlebars.registerHelper('arrowRight', arrowRight);
Handlebars.registerHelper('addFile', addFile);

Handlebars.registerHelper('chats', () => [
  {
    chatName: 'Alex',
    lastMessage: 'Hi, how are you?',
    time: '08:16',
    unreadCount: 1,
  },
  {
    chatName: 'Alex',
    lastMessage: 'Hi, how are you?',
    time: '08:16',
    unreadCount: 1,
  },
  {
    chatName: 'Alex',
    lastMessage: 'Hi, how are you?',
    time: '08:16',
    unreadCount: 1,
  },
  {
    chatName: 'Alex',
    lastMessage: 'Hi, how are you?',
    time: '08:16',
    unreadCount: 1,
  },
]);
