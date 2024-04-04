import Block from '../../core/Block.ts';
import template from './template.ts';
import {
    Link,
} from '../index.ts';
import Router from '../../core/Router.ts';
import './nav.scss';
import { INavProps } from './INav.ts';

const handlerNavClick = (event: Event, url: string) => {
    event.preventDefault();
    event.stopPropagation();
    Router.go(url);
};

const loginLink = new Link('li', {
    href: '/',
    text: 'Login',
    class: 'nav__link',
    attr: {
        class: 'nav__item',
    },
    events: {
        click: (event: Event) => handlerNavClick(event, '/'),
    },
});

const registerLink = new Link('li', {
    href: '/sign-up',
    text: 'Register',
    class: 'nav__link',
    attr: {
        class: 'nav__item',
    },
    events: {
        click: (event: Event) => handlerNavClick(event, '/sign-up'),
    },
});

const messengerLink = new Link('li', {
    href: '/messenger',
    text: 'Messenger',
    class: 'nav__link',
    attr: {
        class: 'nav__item',
    },
    events: {
        click: (event: Event) => handlerNavClick(event, '/messenger'),
    },
});

const error404Link = new Link('li', {
    href: '/error404',
    text: 'Error 404',
    class: 'nav__link',
    attr: {
        class: 'nav__item',
    },
    events: {
        click: (event: Event) => handlerNavClick(event, '/error404'),
    },
});

const error500Link = new Link('li', {
    href: '/error500',
    text: 'Error 500',
    class: 'nav__link',
    attr: {
        class: 'nav__item',
    },
    events: {
        click: (event: Event) => handlerNavClick(event, '/error500'),
    },
});

const settingsLink = new Link('li', {
    href: '/settings',
    text: 'Settings',
    class: 'nav__link',
    attr: {
        class: 'nav__item',
    },
    events: {
        click: (event: Event) => handlerNavClick(event, '/settings'),
    },
});

export default class Nav extends Block<INavProps> {
    constructor() {
        super('ul', {
            loginLink,
            registerLink,
            messengerLink,
            error404Link,
            error500Link,
            settingsLink,

            attr: {
                class: 'nav',
            },
        });
    }
    render() {
        return this.compile(template, this._props);
    }
}
