/* eslint-disable no-use-before-define */
import Block from '../../core/Block.ts';
import Router from '../../core/Router.ts';
import {
    Button, Avatar,
} from '../../components/index.ts';
import userSettingsTemplate from './template.ts';
import authApi from '../../api/authApi.ts';
import usersApi from '../../api/usersApi.ts';
import arrowLeftIcon from '../../assets/arrow-left.svg';
import UserSettingsForm from './components/userSettingsForm/userSettingsForm.ts';
import ChangePasswordForm from './components/changePasswordForm/changePasswordForm.ts';
import defaultAvatarIcon from '../../assets/default-avatar.svg';

const userAvatar = new Avatar({
    src: defaultAvatarIcon,
    events: {
        change: handleChangeAvatar,
    },
});

async function getUserData() {
    try {
        const response = await authApi.getUser() as { response: unknown };
        const user = response.response as any;
        const userInfoInputs = userSettingsForm._children.userSettingsForm._children;

        if (!userInfoInputs) {
            // eslint-disable-next-line
            console.log('userInfoInputs is not defined');
            return;
        }

        userInfoInputs.userSettingsMail?.setProps({ value: user.email });
        userInfoInputs.userSettingsLogin?.setProps({ value: user.login });
        userInfoInputs.userSettingsFirstName?.setProps({ value: user.first_name });
        userInfoInputs.userSettingsSecondName?.setProps({ value: user.second_name });
        userInfoInputs.userSettingsDisplayName?.setProps({ value: user.display_name });
        userInfoInputs.userSettingsPhoneNumber?.setProps({ value: user.phone });
        userAvatar.setProps({
            src: `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`,
            displayName: user.display_name,
        });
    } catch (error) {
        // eslint-disable-next-line
        console.log('error: ', error);
    }
}

interface IUserSettingsPageProps {
    avatar: string;
    userAvatar: Avatar;
    userSettingsForm: UserSettingsForm;
    changePasswordForm: ChangePasswordForm;
    buttonSavePassword: Button;
    buttonSaveUserSettings: Button;
    buttonCancel: Button;
    buttonChangeData: Button;
    buttonChangePassword: Button;
    buttonLogOut: Button;
    buttonBackToMessenger: Button;
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

const handleChangeData = (event: Event) => {
    userSettingsForm.readonlyOff();

    buttonChangeData.hide();
    buttonChangePassword.hide();
    buttonLogOut.hide();

    buttonSaveUserSettings.show();
    buttonCancel.show();

    event.preventDefault();
    event.stopPropagation();
};

const handleChangePassword = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    changePasswordForm.show();
    buttonCancel.show();
    buttonSavePassword.show();

    userSettingsForm.hide();
    buttonChangeData.hide();
    buttonChangePassword.hide();
    buttonLogOut.hide();
};

const handleLogOutClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    authApi.logout()
        .then(() => Router.go('/'))
        // eslint-disable-next-line
        .catch((error) => alert(error));
};

const buttonSavePassword = new Button('button', {
    text: 'Save',
    attr: {
        class: 'btn profile__submit-button  profile__submit-button_type_password',
        type: 'submit',
        form: 'change-password-form',
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

const cancelButtonHandler = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    userSettingsForm.readonlyOn();
    buttonSaveUserSettings.hide();
    buttonSavePassword.hide();
    buttonCancel.hide();
    changePasswordForm.hide();
    userSettingsForm.show();
    buttonChangeData.show();
    buttonChangePassword.show();
    buttonLogOut.show();
};

const buttonCancel = new Button('button', {
    text: 'Cancel',
    attr: {
        class: 'btn profile__submit-button profile__submit-button_type_settings',
        type: 'submit',
    },
    events: {
        click: cancelButtonHandler,
    },
});

const buttonSaveUserSettings = new Button('button', {
    text: 'Save',
    attr: {
        class: 'btn profile__submit-button profile__submit-button_type_settings',
        type: 'submit',
        form: 'user-settings-form',
    },
});

const userSettingsForm = new UserSettingsForm({
    userAvatar,
    buttonSaveUserSettings,
    buttonCancel,
    buttonChangeData,
    buttonChangePassword,
    buttonLogOut,
});

const changePasswordForm = new ChangePasswordForm({
    userSettingsForm,
    buttonSavePassword,
    buttonCancel,
    buttonChangeData,
    buttonChangePassword,
    buttonLogOut,
});

changePasswordForm.hide();
buttonSaveUserSettings.hide();
buttonSavePassword.hide();
buttonCancel.hide();
buttonLogOut.show();

export default class UserSettingsPage extends Block<IUserSettingsPageProps> {
    constructor() {
        super('section', {
            userAvatar,
            userSettingsForm,
            changePasswordForm,
            buttonSaveUserSettings,
            buttonSavePassword,
            buttonCancel,
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
