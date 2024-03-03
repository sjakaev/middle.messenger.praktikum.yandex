/* eslint-disable no-use-before-define */
import Block from '../../core/Block.ts';
import { Input, Button } from '../../components/index.ts';
import userSettingsTemplate from './template.ts';

const handleChangeData = (event) => {
    userSettingsMail.setProps({ readonly: false });
    userSettingsLogin.setProps({ readonly: false });
    userSettingsFirstName.setProps({ readonly: false });
    userSettingsSecondName.setProps({ readonly: false });
    userSettingsDisplayName.setProps({ readonly: false });
    userSettingsPhoneNumber.setProps({ readonly: false });
    const userSettingsButton = document.querySelector('.profile__submit-button');
    const buttonChangeDataItem = document.querySelector('.profile__button-change-data');
    const buttonChangePasswordItem = document.querySelector('.profile__button-change-password');
    const buttonLogOutItem = document.querySelector('.profile__button-log-out');
    buttonChangeDataItem?.classList.add('btn_is_hidden');
    buttonChangePasswordItem?.classList.add('btn_is_hidden');
    buttonLogOutItem?.classList.add('btn_is_hidden');
    userSettingsButton?.classList.remove('btn_is_hidden');
    event.preventDefault();
    event.stopPropagation();
};

const submitUserSettings = (event) => {
    userSettingsMail.setProps({ readonly: true });
    userSettingsLogin.setProps({ readonly: true });
    userSettingsFirstName.setProps({ readonly: true });
    userSettingsSecondName.setProps({ readonly: true });
    userSettingsDisplayName.setProps({ readonly: true });
    userSettingsPhoneNumber.setProps({ readonly: true });
    const userSettingsButton = document.querySelector('.profile__submit-button');
    const buttonChangeDataItem = document.querySelector('.profile__button-change-data');
    const buttonChangePasswordItem = document.querySelector('.profile__button-change-password');
    const buttonLogOutItem = document.querySelector('.profile__button-log-out');
    buttonChangeDataItem?.classList.remove('btn_is_hidden');
    buttonChangePasswordItem?.classList.remove('btn_is_hidden');
    buttonLogOutItem?.classList.remove('btn_is_hidden');
    userSettingsButton?.classList.add('btn_is_hidden');
    event.preventDefault();
    event.stopPropagation();
};

const userSettingsMail = new Input('div', {
    value: 'pochta@yandex.ru',
    name: 'mail111',
    type: 'email',
    placeholder: 'email',
    class: 'profile__field-input',
    label: 'Email',
    labelClass: 'profile__field-label',
    readonly: true,
    attr: {
        class: 'profile__field',
    },
});

const userSettingsLogin = new Input('div', {
    value: 'Ivan3000',
    name: 'login',
    type: 'text',
    placeholder: 'Login',
    class: 'profile__field-input',
    label: 'Login',
    labelClass: 'profile__field-label',
    readonly: true,
    attr: {
        class: 'profile__field',
    },
});

const userSettingsFirstName = new Input('div', {
    value: 'Ivan',
    name: 'first_name',
    type: 'text',
    placeholder: 'First name',
    class: 'profile__field-input',
    label: 'First name',
    labelClass: 'profile__field-label',
    readonly: true,
    attr: {
        class: 'profile__field',
    },
});

const userSettingsSecondName = new Input('div', {
    value: 'Ivanov',
    name: 'second_name',
    type: 'text',
    placeholder: 'Second name',
    class: 'profile__field-input',
    label: 'Second name',
    labelClass: 'profile__field-label',
    readonly: true,
    attr: {
        class: 'profile__field',
    },
});

const userSettingsDisplayName = new Input('div', {
    value: 'Ivanches',
    name: 'display_name',
    type: 'text',
    placeholder: 'Display name',
    class: 'profile__field-input',
    label: 'Display name',
    labelClass: 'profile__field-label',
    readonly: true,
    attr: {
        class: 'profile__field',
    },
});

const userSettingsPhoneNumber = new Input('div', {
    value: '+7123456789',
    name: 'phone',
    type: 'tel',
    placeholder: 'Phone number',
    class: 'profile__field-input',
    label: 'Phone number',
    readonly: true,
    labelClass: 'profile__field-label',
    attr: {
        class: 'profile__field',
    },
});

const buttonSaveUserSettings = new Button('button', {
    text: 'Save',
    attr: {
        class: 'btn btn_is_hidden profile__submit-button',
        type: 'submit',
        page: 'chat',
    },
    events: {
        click: submitUserSettings,
    },
});

const buttonChangeData = new Button('button', {
    text: 'Change data',
    attr: {
        class: 'profile__button profile__button-change-data',
        type: 'submit',
    },
    events: {
        click: handleChangeData,
    },
});

const buttonChangePassword = new Button('button', {
    text: 'Change password',
    attr: {
        class: 'profile__button profile__button-change-password',
        type: 'submit',
        page: 'chat',
    },
});

const buttonLogOut = new Button('button', {
    text: 'Log Out',
    attr: {
        class: 'profile__button profile__button_color_red profile__button-log-out',
        type: 'submit',
        page: 'chat',
    },
});

export default class UserSettingsPage extends Block {
    constructor() {
        super('section', {
            avatar: '/src/assets/default-avatar.svg',
            userSettingsMail,
            userSettingsLogin,
            userSettingsFirstName,
            userSettingsSecondName,
            userSettingsDisplayName,
            userSettingsPhoneNumber,
            buttonSaveUserSettings,
            buttonChangeData,
            buttonChangePassword,
            buttonLogOut,
        });
    }
    render() {
        return this.compile(userSettingsTemplate, this._props);
    }
}
