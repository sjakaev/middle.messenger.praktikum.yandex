/* eslint-disable no-use-before-define */
import Block from '../../core/Block.ts';
import Router from '../../core/Router.ts';
import template from './template.ts';
import authApi from '../../api/authApi.ts';
import {
    Link,
    Button,
    Input,
    Form,
} from '../../components/index.ts';
import { loginValidation, passwordValidation } from '../../utils/validation.ts';

interface ILoginPageProps {
    loginForm: Form;
    link: Link;
}

const validateLogin = () => {
    inputLogin.validateInput(loginValidation);
};

const validatePassword = () => {
    inputPassword.validateInput(passwordValidation);
};

const setAttributeValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    const inputElement = event.target as HTMLInputElement;
    inputElement?.setAttribute('value', newValue);
};

const submitLoginForm = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = document.querySelector('#login-form') as HTMLFormElement;
    const formData = new FormData(form);
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    validateLogin();
    validatePassword();

    if (inputLogin._props.error || inputPassword._props.error) {
        return;
    }

    try {
        await authApi.signIn({ login, password });
        Router.go('/messenger');
    } catch (error: any) {
        if (error.reason === 'User already in system') {
            Router.go('/messenger');
            return;
        }
        // eslint-disable-next-line
        console.log('error: ', error);
        // eslint-disable-next-line
        alert(`Authorisation error: ${error.reason}`);
    }
};

const handlerLinkClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    Router.go('/sign-up');
};

const inputLogin: any = new Input('div', {
    value: '',
    name: 'login',
    type: 'text',
    placeholder: 'Login',
    attr: {
        class: 'input login__input',
    },
    events: {
        focusout: validateLogin,
        input: setAttributeValue,
    },
});

const inputPassword: any = new Input('div', {
    value: '',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    attr: {
        class: 'input login__input',
    },
    events: {
        focusout: validatePassword,
        input: setAttributeValue,
    },
});

const buttonSignIn: any = new Button('button', {
    text: 'Sign in',
    attr: {
        class: 'btn login__button',
        type: 'submit',
        page: 'chat',
    },
    events: {
        click: submitLoginForm,
    },
});

const link = new Link('div', {
    page: 'register',
    href: '#',
    text: 'Create a profile',
    class: 'login__footer-link',
    events: {
        click: handlerLinkClick,
    },
});

const loginForm = new Form('form', {
    inputLogin,
    inputPassword,
    buttonSignIn,
    events: {
        submit: submitLoginForm,
    },
    attr: {
        id: 'login-form',
        name: 'login',
    },
});

export default class LoginPage extends Block<ILoginPageProps> {
    constructor() {
        super('section', {
            loginForm,
            link,
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}
