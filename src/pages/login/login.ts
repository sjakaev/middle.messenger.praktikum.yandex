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

const submitLoginForm = (event: Event) => {
    const form = document.querySelector('#login-form') as HTMLFormElement;
    const formData = new FormData(form);
    const formName = form?.name;

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

const inputLogin: any = new Input('div', {
    value: 'Login',
    name: 'login',
    type: 'text',
    placeholder: 'Login',
    attr: {
        class: 'input login__input',
    },
    events: {
        blur: validateLogin,
        input: setAttributeValue,
    },
});

const inputPassword: any = new Input('div', {
    value: 'Password1',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    attr: {
        class: 'input login__input',
    },
    events: {
        blur: validatePassword,
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
