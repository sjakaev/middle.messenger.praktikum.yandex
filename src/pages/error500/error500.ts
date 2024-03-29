import Block from '../../core/Block.ts';
import Router from '../../core/Router.ts';
import { ErrorInfo, Link } from '../../components/index.ts';
import template from './template.ts';

interface IError500PageProps {
    errorInfo: ErrorInfo;
    backToChatsLink: Link;
}

const errorInfo = new ErrorInfo(
    'div',
    {
        code: '500',
        message: "We've already fixed it",
        attr: {
            class: 'error-info',
        },
    },
);

const handlerBackClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    Router.go('/messenger');
};

const backToChatsLink = new Link('div', {
    href: '/messenger',
    text: 'Back to chats',
    class: 'error-info__back-link',
    events: {
        click: handlerBackClick,
    },
});

export default class Error500Page extends Block<IError500PageProps> {
    constructor() {
        super('section', {
            errorInfo,
            backToChatsLink,
        });
    }
    render() {
        return this.compile(template, this._props);
    }
}
