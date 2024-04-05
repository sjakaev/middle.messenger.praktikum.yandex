/* eslint-disable no-use-before-define */
import Button from '../../components/button/Button.ts';
import Block from '../../core/Block.ts';
import Router from '../../core/Router.ts';
import registerTemplate from './template.ts';
import authApi from '../../api/authApi.ts';
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

const submitRegisterForm = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = document.querySelector('#register-form') as HTMLFormElement;
    const formData = new FormData(form);
    const firstName = formData.get('first_name') as string;
    const secondName = formData.get('second_name') as string;
    const login = formData.get('login') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const phone = formData.get('phone') as string;

    const data = {
        first_name: firstName,
        second_name: secondName,
        login,
        email,
        password,
        phone,
    };

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
        return;
    }

    try {
        await authApi.signUp(data);
        Router.go('/messenger');
    } catch (error) {
        // eslint-disable-next-line
        console.log('error: ', error);
        // eslint-disable-next-line
        alert('Registration error');
    }
};

const handlerAuthLinkClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    Router.go('/');
};

const inputEmail: any = new Input('div', {
    value: '',
    label: 'Email',
    name: 'email',
    type: 'text',
    placeholder: 'Email',
    attr: {
        class: 'input register__input',
    },
    events: {
        focusout: validateMail,
        input: setAttributeValue,
    },
});

const inputLogin: any = new Input('div', {
    value: '',
    label: 'Login',
    name: 'login',
    placeholder: 'Login',
    type: 'text',
    attr: {
        class: 'input register__input',
    },
    events: {
        focusout: validateLogin,
        input: setAttributeValue,
    },
});

const inputFirstName: any = new Input('div', {
    value: '',
    label: 'First name',
    name: 'first_name',
    placeholder: 'First name',
    type: 'text',
    attr: {
        class: 'input register__input',
    },
    events: {
        focusout: validateFirstName,
        input: setAttributeValue,
    },
});

const inputSecondName: any = new Input('div', {
    value: '',
    label: 'Second name',
    name: 'second_name',
    placeholder: 'Second name',
    type: 'text',
    attr: {
        class: 'input register__input',
    },
    events: {
        focusout: validateSecondName,
        input: setAttributeValue,
    },
});

const inputPhone: any = new Input('div', {
    value: '',
    label: 'Phone number',
    name: 'phone',
    placeholder: '+7123456789',
    type: 'text',
    attr: {
        class: 'input register__input',
    },
    events: {
        focusout: validatePhone,
        input: setAttributeValue,
    },
});

const inputPassword: any = new Input('div', {
    value: '',
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    attr: {
        class: 'input register__input',
    },
    events: {
        focusout: validatePassword,
        input: setAttributeValue,
    },
});

const inputRepeatPassword: any = new Input('div', {
    value: '',
    label: 'Repeat password',
    name: 'second_password',
    type: 'password',
    placeholder: 'Repeat password',
    attr: {
        class: 'input register__input',
    },
    events: {
        focusout: validationConfirmPassword,
        input: setAttributeValue,
    },
});

const buttonRegister: any = new Button('button', {
    text: 'Sign up',
    attr: {
        type: 'submit',
        class: 'btn register__button',
    },
    events: {
        click: submitRegisterForm,
    },
});

const authLink = new Link('div', {
    href: '#',
    text: 'Sign in',
    events: {
        click: handlerAuthLinkClick,
    },
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
