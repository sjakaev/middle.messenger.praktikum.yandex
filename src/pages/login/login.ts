/* eslint-disable no-use-before-define */
import Block from '../../core/Block.ts';
import template from './template.ts';
import {
    Link,
    Button,
    Input,
    Form,
} from '../../components/index.ts';

import { loginValidation, passwordValidation } from '../../utils/validation.ts';

const validateLogin = () => {
    inputLogin.validateInput(loginValidation);
};

const validatePassword = () => {
    inputPassword.validateInput(passwordValidation);
};

const submitLoginForm = (event) => {
    const form = document.querySelector('#login-form');
    const formData = new FormData(form);
    const formName = form.name;

    validateLogin();
    validatePassword();

    if (inputLogin._props.error || inputPassword._props.error) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }

    console.log('--------------------------------');
    console.log('loginForm', loginForm);
    console.log('Form name:', formName);

    Array.from(formData.entries()).forEach(([name, value]) => {
        console.log(`${name}:`, value);
    });
    console.log('-------------------------------');
};

const inputLogin = new Input('div', {
    value: 'Login',
    name: 'login',
    type: 'text',
    placeholder: 'Login',
    attr: {
        class: 'input login__input',
    },
    events: {
        blur: validateLogin,
    },
});

const inputPassword = new Input('div', {
    value: 'Password1',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    attr: {
        class: 'input login__input',
    },
    events: {
        blur: validatePassword,
    },
});

const buttonSignIn = new Button('button', {
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

export default class LoginPage extends Block {
    constructor() {
        super('section', {
            loginForm,
            link,
        });
    }
    render() {
        return this.compile(template);
    }
}
