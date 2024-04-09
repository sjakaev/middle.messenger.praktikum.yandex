/* eslint-disable no-use-before-define */
import Block from '../../core/Block.ts';
import Router from '../../core/Router.ts';
import {
    Input, Button, Form, Avatar,
} from '../../components/index.ts';
import userSettingsTemplate from './template.ts';
import defaultAvatarIcon from '../../assets/default-avatar.svg';
import authApi from '../../api/authApi.ts';
import usersApi from '../../api/usersApi.ts';
import arrowLeftIcon from '../../assets/arrow-left.svg';

import {
    loginValidation,
    passwordValidation,
    emailValidation,
    nameValidation,
    phoneValidation,
    displayNameValidation,
} from '../../utils/validation.ts';

type IUser = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar: string;
};

async function getUserData() {
    try {
        const response = await authApi.getUser() as { response: unknown };
        const user = response.response as IUser;

        const data: any = {
            email: user.email,
            login: user.login,
            first_name: user.first_name,
            second_name: user.second_name,
            display_name: user.display_name,
            phone: user.phone,
            avatar: user.avatar,
        };

        userAvatar.setProps({
            displayName: user.display_name,
            src: `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`,
        });

        Object.entries(data).forEach(([key, value]) => {
            const input = document.getElementById(key) as HTMLInputElement;
            if (key === 'avatar') {
                const avatarImg = document.querySelector('.avatar__image') as HTMLImageElement;
                const avatar = value
                    ? `https://ya-praktikum.tech/api/v2/resources/${value}`
                    : defaultAvatarIcon;
                if (avatarImg) {
                    avatarImg.src = avatar;
                }
            }

            input.value = String(value);
            input.setAttribute('value', String(value));
        });
    } catch (error) {
        // eslint-disable-next-line
        console.log('error: ', error);
    }
}

async function handleChangeAvatar() {
    try {
        const input: any = document.querySelector('.avatar__input');
        const data = new FormData();
        data.append('avatar', input.files[0]);

        const result = await usersApi.changeAvatar(data) as any;
        const avatarImg = document.querySelector('.avatar__image') as HTMLImageElement;

        if (avatarImg) {
            avatarImg.src = `https://ya-praktikum.tech/api/v2/resources/${result.response.avatar}`;
        }
    } catch (error) {
        // eslint-disable-next-line
        console.log('error: ', error);
    }
}

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

interface IUserSettingsPageProps {
    avatar: string;
    userAvatar: Avatar;
    userSettingsForm: Form;
    changePasswordForm: Form;
    buttonChangeData: Button;
    buttonChangePassword: Button;
    buttonLogOut: Button;
    buttonBackToMessenger: Button;
}

const handleChangeData = (event: Event) => {
    const settings = [
        userSettingsMail,
        userSettingsLogin,
        userSettingsFirstName,
        userSettingsSecondName,
        userSettingsDisplayName,
        userSettingsPhoneNumber,
    ];

    settings.forEach((inputInstance: any) => {
        const value = inputInstance.getValue();
        inputInstance.setProps({ readonly: false, value });
    });

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

const submitUserSettings = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = userSettingsForm._element as HTMLFormElement;
    const formData = new FormData(form);
    const firstName = formData.get('first_name') as string;
    const secondName = formData.get('second_name') as string;
    const login = formData.get('login') as string;
    const email = formData.get('email') as string;
    const displayName = formData.get('display_name') as string;
    const phone = formData.get('phone') as string;

    const data = {
        first_name: firstName,
        second_name: secondName,
        login,
        email,
        display_name: displayName,
        phone,
    };

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

    try {
        await usersApi.changeSettings(data);

        userAvatar.setProps({ displayName: data.display_name });
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
    } catch (error) {
        // eslint-disable-next-line
        console.log('error: ', error);
    }
};

const submitChangePassword = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = changePasswordForm._element as HTMLFormElement;
    const formData = new FormData(form);

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

    try {
        const oldPassword = formData.get('oldPassword') as string;
        const newPassword = formData.get('newPassword') as string;

        const data = {
            oldPassword,
            newPassword,
        };

        await usersApi.changePassword(data);

        changePasswordForm.hide();
        userSettingsForm.show();
        buttonChangeData.show();
        buttonChangePassword.show();
        buttonLogOut.show();
    } catch (error) {
        // eslint-disable-next-line
        console.log('error: ', error);
    }
};

const handleLogOutClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    authApi.logout()
        .then(() => Router.go('/'))
        // eslint-disable-next-line
        .catch((error) => alert(error));
};

const userSettingsMail = new Input('div', {
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
        focusout: validateMail,
        input: setAttributeValue,
    },
});

const userSettingsLogin = new Input('div', {
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
        focusout: validateLogin,
        input: setAttributeValue,
    },
});

const userSettingsFirstName = new Input('div', {
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
        focusout: validateFirstName,
        input: setAttributeValue,
    },
});

const userAvatar = new Avatar({
    src: defaultAvatarIcon,
    events: {
        change: handleChangeAvatar,
    },
});

const userSettingsSecondName = new Input('div', {
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
        focusout: validateSecondName,
        input: setAttributeValue,
    },
});

const userSettingsDisplayName = new Input('div', {
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
        focusout: validateDisplayName,
        input: setAttributeValue,
    },
});

const userSettingsPhoneNumber = new Input('div', {
    value: '-',
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
        focusout: validatePhone,
        input: setAttributeValue,
    },
});

const userSettingsOldPassword = new Input('div', {
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
        focusout: validateOldPassword,
        input: setAttributeValue,
    },
});

const userSettingsNewPassword = new Input('div', {
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
        focusout: validateNewPassword,
        input: setAttributeValue,
    },
});

const userSettingsConfirmPassword = new Input('div', {
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
        focusout: validateConfirmPassword,
        input: setAttributeValue,
    },
});

const buttonSaveUserSettings = new Button('button', {
    text: 'Save',
    attr: {
        class: 'btn profile__submit-button profile__submit-button_type_settings',
        type: 'submit',
    },
    events: {
        click: submitUserSettings,
    },
});

const buttonSaveNewPassword = new Button('button', {
    text: 'Save',
    attr: {
        class: 'btn profile__submit-button  profile__submit-button_type_password',
        type: 'submit',
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
    },
    events: {
        click: handleLogOutClick,
    },
});

const buttonBackToMessenger: any = new Button('button', {
    text: '',
    icon: `${arrowLeftIcon}`,
    alt: 'Back to messanger button',
    attr: {
        class: 'profile__button-back',
        type: 'button',
    },
    events: {
        click: () => {
            Router.go('/messenger');
        },
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

export default class UserSettingsPage extends Block<IUserSettingsPageProps> {
    constructor() {
        super('section', {
            avatar: `${defaultAvatarIcon}`,
            userAvatar,
            userSettingsForm,
            changePasswordForm,
            buttonChangeData,
            buttonChangePassword,
            buttonLogOut,
            buttonBackToMessenger,
        });
        getUserData();
    }
    render() {
        return this.compile(userSettingsTemplate, this._props);
    }
}
