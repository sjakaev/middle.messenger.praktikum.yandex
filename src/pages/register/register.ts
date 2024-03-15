/* eslint-disable no-use-before-define */
import Button from '../../components/button/Button.ts';
import Block from '../../core/Block.ts';
import registerTemplate from './template.ts';
import {
    Input,
    Link,
    Form,
} from '../../components/index.ts';

import {
    loginValidation,
    passwordValidation,
    emailValidation,
    nameValidation,
    phoneValidation,
} from '../../utils/validation.ts';

interface IRegisterPageProps {
    registerForm: Form;
    authLink: Link;
}

const validateMail = () => {
    inputEmail.validateInput(emailValidation);
};

const validateLogin = () => {
    inputLogin.validateInput(loginValidation);
};

const validateFirstName = () => {
    inputFirstName.validateInput(nameValidation);
};

const validateSecondName = () => {
    inputSecondName.validateInput(nameValidation);
};

const validatePhone = () => {
    inputPhone.validateInput(phoneValidation);
};

const validatePassword = () => {
    inputPassword.validateInput(passwordValidation);
};

const validationConfirmPassword = () => {
    const firstPasswordItem = inputPassword._element.querySelector('[name="password"]');
    const firstPasswordValue = firstPasswordItem.getAttribute('value');

    const secondPasswordItem = inputRepeatPassword
        ._element.querySelector('[name="second_password"]');
    const secondPasswordValue = secondPasswordItem.getAttribute('value');

    inputRepeatPassword.validateConfirmPassword(firstPasswordValue, secondPasswordValue);
};

const setAttributeValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    const inputElement = event.target as HTMLInputElement;
    inputElement?.setAttribute('value', newValue);
};

const submitRegisterForm = (event: Event) => {
    const form = document.querySelector('#register-form') as HTMLFormElement;
    const formData = new FormData(form);
    const formName = form.name;

    validateLogin();
    validatePassword();
    validateFirstName();
    validateSecondName();
    validatePhone();
    validateMail();
    validationConfirmPassword();

    if (inputLogin._props.error
        || inputPassword._props.error
        || inputFirstName._props.error
        || inputSecondName._props.error
        || inputPhone._props.error
        || inputEmail._props.error
        || inputRepeatPassword._props.error
    ) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }

    console.log('--------------------------------');
    console.log('registerForm', registerForm);
    console.log('Form name:', formName);

    Array.from(formData.entries()).forEach(([name, value]) => {
        console.log(`${name}:`, value);
    });
    console.log('-------------------------------');
};

const inputEmail: any = new Input('div', {
    value: 'roman@gmail.com',
    label: 'Email',
    name: 'email',
    type: 'text',
    attr: {
        class: 'input register__input',
    },
    events: {
        blur: validateMail,
        input: setAttributeValue,
    },
});

const inputLogin: any = new Input('div', {
    value: 'Roman3000',
    label: 'Login',
    name: 'login',
    type: 'text',
    attr: {
        class: 'input register__input',
    },
    events: {
        blur: validateLogin,
        input: setAttributeValue,
    },
});

const inputFirstName: any = new Input('div', {
    value: 'Ivan',
    label: 'First name',
    name: 'first_name',
    type: 'text',
    attr: {
        class: 'input register__input',
    },
    events: {
        blur: validateFirstName,
        input: setAttributeValue,
    },
});

const inputSecondName: any = new Input('div', {
    value: 'Petrov',
    label: 'Second name',
    name: 'second_name',
    type: 'text',
    attr: {
        class: 'input register__input',
    },
    events: {
        blur: validateSecondName,
        input: setAttributeValue,
    },
});

const inputPhone: any = new Input('div', {
    value: '+7123456789',
    label: 'Phone number',
    name: 'phone',
    type: 'text',
    attr: {
        class: 'input register__input',
    },
    events: {
        blur: validatePhone,
        input: setAttributeValue,
    },
});

const inputPassword: any = new Input('div', {
    value: 'Roman3001',
    label: 'Password',
    name: 'password',
    type: 'password',
    attr: {
        class: 'input register__input',
    },
    events: {
        blur: validatePassword,
        input: setAttributeValue,
    },
});

const inputRepeatPassword: any = new Input('div', {
    value: 'Roman3001',
    label: 'Repeat password',
    name: 'second_password',
    type: 'password',
    attr: {
        class: 'input register__input',
    },
    events: {
        blur: validationConfirmPassword,
        input: setAttributeValue,
    },
});

const buttonRegister: any = new Button('button', {
    text: 'Sign up',
    attr: {
        page: 'chat',
        type: 'submit',
        class: 'btn register__button',
    },
    events: {
        click: submitRegisterForm,
    },
});

const authLink = new Link('div', {
    page: 'login',
    href: '#',
    text: 'Sign in',
});

const registerForm = new Form('form', {
    inputEmail,
    inputLogin,
    inputFirstName,
    inputSecondName,
    inputPhone,
    inputPassword,
    inputRepeatPassword,
    buttonRegister,
    events: {
        submit: submitRegisterForm,
    },
    attr: {
        name: 'register',
        id: 'register-form',
    },
});

export default class RegisterPage extends Block<IRegisterPageProps> {
    constructor() {
        super('section', {
            registerForm,
            authLink,
        });
    }
    render() {
        return this.compile(registerTemplate, this._props);
    }
}
