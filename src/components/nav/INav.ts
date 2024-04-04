import {
    Link,
} from '../index.ts';

export interface INavProps {
    url?: string;
    title?: string;
    text?: string;
    items?: Link[];
    attr?: { [key: string]: string };
    // eslint-disable-next-line no-unused-vars
    events?: { [key: string]: (event: Event) => void };
    loginLink: Link;
    registerLink: Link;
    messengerLink: Link;
    error404Link: Link;
    error500Link: Link;
    settingsLink: Link;
}
