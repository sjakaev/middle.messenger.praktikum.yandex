/* eslint-disable no-use-before-define */
import Block from '../../core/Block.ts';
import {
    Input, Button, Form,
} from '../../components/index.ts';
import userSettingsTemplate from './template.ts';
import defaultAvatarIcon from '../../assets/default-avatar.svg';

import {
    loginValidation,
    passwordValidation,
    emailValidation,
    nameValidation,
    phoneValidation,
    displayNameValidation,
} from '../../utils/validation.ts';

const setAttributeValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    const inputElement = event.target as HTMLInputElement;
    inputElement?.setAttribute('value', newValue);
};

const validateMail = () => {
    userSettingsMail.validateInput(emailValidation);
};

const validateLogin = () => {
    userSettingsLogin.validateInput(loginValidation);
};

const validateFirstName = () => {
    userSettingsFirstName.validateInput(nameValidation);
};

const validateSecondName = () => {
    userSettingsSecondName.validateInput(nameValidation);
};

const validatePhone = () => {
    userSettingsPhoneNumber.validateInput(phoneValidation);
};

const validateDisplayName = () => {
    userSettingsDisplayName.validateInput(displayNameValidation);
};

const validateOldPassword = () => {
    userSettingsOldPassword.validateInput(passwordValidation);
};

const validateNewPassword = () => {
    userSettingsNewPassword.validateInput(passwordValidation);
};

const validateConfirmPassword = () => {
    const firstPasswordItem = userSettingsNewPassword._element
        .querySelector('[name="newPassword"]');
    const firstPasswordValue = firstPasswordItem.getAttribute('value');

    const secondPasswordItem = userSettingsConfirmPassword._element
        .querySelector('[name="confirmPassword"]');
    const secondPasswordValue = secondPasswordItem.getAttribute('value');

    userSettingsConfirmPassword.validateConfirmPassword(firstPasswordValue, secondPasswordValue);
};

interface IUserSettingsPage {
    avatar: string;
    userSettingsForm: Form;
    changePasswordForm: Form;
    buttonChangeData: Button;
    buttonChangePassword: Button;
    buttonLogOut: Button;
}

const handleChangeData = (event: Event) => {
    userSettingsMail.setProps({ readonly: false });
    userSettingsLogin.setProps({ readonly: false });
    userSettingsFirstName.setProps({ readonly: false });
    userSettingsSecondName.setProps({ readonly: false });
    userSettingsDisplayName.setProps({ readonly: false });
    userSettingsPhoneNumber.setProps({ readonly: false });

    buttonSaveUserSettings.show();
    buttonChangeData.hide();
    buttonChangePassword.hide();
    buttonLogOut.hide();
    event.preventDefault();
    event.stopPropagation();
};

const handleChangePassword = (event: Event) => {
    changePasswordForm.show();
    userSettingsForm.hide();

    buttonChangeData.hide();
    buttonChangePassword.hide();
    buttonLogOut.hide();
    event.preventDefault();
    event.stopPropagation();
};

const submitUserSettings = (event: Event) => {
    const form = userSettingsForm._element as HTMLFormElement;
    const formData = new FormData(form);
    const formName = form.name;

    validateMail();
    validateLogin();
    validateFirstName();
    validateSecondName();
    validatePhone();
    validateDisplayName();

    if (userSettingsLogin._props.error
        || userSettingsMail._props.error
        || userSettingsFirstName._props.error
        || userSettingsSecondName._props.error
        || userSettingsDisplayName._props.error
        || userSettingsPhoneNumber._props.error
    ) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }

    console.log('--------------------------------');
    console.log('userSettingsForm', userSettingsForm);
    console.log('Form name:', formName);

    Array.from(formData.entries()).forEach(([name, value]) => {
        console.log(`${name}:`, value);
    });
    console.log('-------------------------------');

    userSettingsMail.setProps({ readonly: true });
    userSettingsLogin.setProps({ readonly: true });
    userSettingsFirstName.setProps({ readonly: true });
    userSettingsSecondName.setProps({ readonly: true });
    userSettingsDisplayName.setProps({ readonly: true });
    userSettingsPhoneNumber.setProps({ readonly: true });
    buttonChangeData.show();
    buttonChangePassword.show();
    buttonLogOut.show();
    buttonSaveUserSettings.hide();

    event.preventDefault();
    event.stopPropagation();
};

const submitChangePassword = (event: Event) => {
    const form = changePasswordForm._element as HTMLFormElement;
    const formData = new FormData(form);
    const formName = form.name;

    validateNewPassword();
    validateConfirmPassword();
    validateOldPassword();

    if (userSettingsOldPassword._props.error
        || userSettingsNewPassword._props.error
        || userSettingsConfirmPassword._props.error
    ) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }

    console.log('--------------------------------');
    console.log('userChangePassword', changePasswordForm);
    console.log('Form name:', formName);

    Array.from(formData.entries()).forEach(([name, value]) => {
        console.log(`${name}:`, value);
    });
    console.log('-------------------------------');

    changePasswordForm.hide();
    userSettingsForm.show();

    buttonChangeData.show();
    buttonChangePassword.show();
    buttonLogOut.show();

    event.preventDefault();
    event.stopPropagation();
};

const userSettingsMail = new Input('div', {
    value: 'pochta@yandex.ru',
    name: 'email',
    type: 'email',
    placeholder: 'email',
    class: 'profile__field-input',
    label: 'Email',
    labelClass: 'profile__field-label',
    readonly: true,
    attr: {
        class: 'profile__field',
    },
    events: {
        blur: validateMail,
        input: setAttributeValue,
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
    events: {
        blur: validateLogin,
        input: setAttributeValue,
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
    events: {
        blur: validateFirstName,
        input: setAttributeValue,
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
    events: {
        blur: validateSecondName,
        input: setAttributeValue,
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
    events: {
        blur: validateDisplayName,
        input: setAttributeValue,
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
    events: {
        blur: validatePhone,
        input: setAttributeValue,
    },
});

const userSettingsOldPassword = new Input('div', {
    value: 'Password123',
    label: 'Old password',
    name: 'oldPassword',
    type: 'password',
    placeholder: 'Old password',
    class: 'profile__field-input profile__field-input_is_hidden',
    labelClass: 'profile__field-label',
    attr: {
        class: 'profile__field',
    },
    events: {
        blur: validateOldPassword,
        input: setAttributeValue,
    },
});

const userSettingsNewPassword = new Input('div', {
    value: 'Password1234',
    label: 'New password',
    name: 'newPassword',
    type: 'password',
    placeholder: 'New password',
    class: 'profile__field-input',
    labelClass: 'profile__field-label',
    attr: {
        class: 'profile__field',
    },
    events: {
        blur: validateNewPassword,
        input: setAttributeValue,
    },
});

const userSettingsConfirmPassword = new Input('div', {
    value: 'Password1234',
    label: 'Confirm password',
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm password',
    class: 'profile__field-input',
    labelClass: 'profile__field-label',
    attr: {
        class: 'profile__field',
    },
    events: {
        blur: validateConfirmPassword,
        input: setAttributeValue,
    },
});

const buttonSaveUserSettings = new Button('button', {
    text: 'Save',
    attr: {
        class: 'btn profile__submit-button',
        type: 'submit',
        page: 'chat',
    },
    events: {
        click: submitUserSettings,
    },
});

const buttonSaveNewPassword = new Button('button', {
    text: 'Save',
    attr: {
        class: 'btn profile__submit-button',
        type: 'submit',
        page: 'chat',
    },
    events: {
        click: submitChangePassword,
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
    events: {
        click: handleChangePassword,
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

const userSettingsForm = new Form('form', {
    userSettingsMail,
    userSettingsLogin,
    userSettingsFirstName,
    userSettingsSecondName,
    userSettingsDisplayName,
    userSettingsPhoneNumber,
    userSettingsOldPassword,
    userSettingsNewPassword,
    userSettingsConfirmPassword,
    buttonSaveUserSettings,
    attr: {
        name: 'user_settings',
        id: 'user-settings-form',
    },
    events: {
        submit: submitUserSettings,
    },
});

const changePasswordForm = new Form('form', {
    userSettingsOldPassword,
    userSettingsNewPassword,
    userSettingsConfirmPassword,
    buttonSaveNewPassword,
    attr: {
        name: 'change_password',
        id: 'change-password-form',
    },
    events: {
        submit: submitChangePassword,
    },
});

buttonSaveUserSettings.hide();
changePasswordForm.hide();

export default class UserSettingsPage extends Block<IUserSettingsPage> {
    constructor() {
        super('section', {
            avatar: `${defaultAvatarIcon}`,
            userSettingsForm,
            changePasswordForm,
            buttonChangeData,
            buttonChangePassword,
            buttonLogOut,
        });
    }
    render() {
        return this.compile(userSettingsTemplate, this._props);
    }
}
