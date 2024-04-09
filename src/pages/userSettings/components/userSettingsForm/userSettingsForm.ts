/* eslint-disable no-use-before-define */
import Block from '../../../../core/Block.ts';
import {
    Input, Form, Button, Avatar,
} from '../../../../components/index.ts';
import userSettingsFormTemplate from './template.ts';
import usersApi from '../../../../api/usersApi.ts';

import {
    loginValidation,
    emailValidation,
    nameValidation,
    phoneValidation,
    displayNameValidation,
} from '../../../../utils/validation.ts';

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

const userSettingsMail = new Input('div', {
    value: '',
    name: 'email',
    type: 'email',
    placeholder: 'email',
    class: 'user-settings-form__field-input',
    label: 'Email',
    labelClass: 'user-settings-form__field-label',
    readonly: true,
    attr: {
        class: 'user-settings-form__field',
    },
    events: {
        focusout: validateMail,
        input: setAttributeValue,
    },
});

const userSettingsLogin = new Input('div', {
    value: '',
    name: 'login',
    type: 'text',
    placeholder: 'Login',
    class: 'user-settings-form__field-input',
    label: 'Login',
    labelClass: 'user-settings-form__field-label',
    readonly: true,
    attr: {
        class: 'user-settings-form__field',
    },
    events: {
        focusout: validateLogin,
        input: setAttributeValue,
    },
});

const userSettingsFirstName = new Input('div', {
    value: '',
    name: 'first_name',
    type: 'text',
    placeholder: 'First name',
    class: 'user-settings-form__field-input',
    label: 'First name',
    labelClass: 'user-settings-form__field-label',
    readonly: true,
    attr: {
        class: 'user-settings-form__field',
    },
    events: {
        focusout: validateFirstName,
        input: setAttributeValue,
    },
});

const userSettingsSecondName = new Input('div', {
    value: '',
    name: 'second_name',
    type: 'text',
    placeholder: 'Second name',
    class: 'user-settings-form__field-input',
    label: 'Second name',
    labelClass: 'user-settings-form__field-label',
    readonly: true,
    attr: {
        class: 'user-settings-form__field',
    },
    events: {
        focusout: validateSecondName,
        input: setAttributeValue,
    },
});

const userSettingsDisplayName = new Input('div', {
    value: '',
    name: 'display_name',
    type: 'text',
    placeholder: 'Display name',
    class: 'user-settings-form__field-input',
    label: 'Display name',
    labelClass: 'user-settings-form__field-label',
    readonly: true,
    attr: {
        class: 'user-settings-form__field',
    },
    events: {
        focusout: validateDisplayName,
        input: setAttributeValue,
    },
});

const userSettingsPhoneNumber = new Input('div', {
    value: '',
    name: 'phone',
    type: 'tel',
    placeholder: 'Phone number',
    class: 'user-settings-form__field-input',
    label: 'Phone number',
    readonly: true,
    labelClass: 'user-settings-form__field-label',
    attr: {
        class: 'user-settings-form__field',
    },
    events: {
        focusout: validatePhone,
        input: setAttributeValue,
    },
});

interface IUserSettingsFormProps {
    userAvatar: Avatar,
    buttonSaveUserSettings: Button,
    buttonCancel: Button,
    buttonChangeData: Button,
    buttonChangePassword: Button,
    buttonLogOut: Button,
    displayName?: String
}

interface IUserSettingsFormChildren {
    userSettingsForm: Form,
    userSettingsMail: Input,
    userSettingsLogin: Input,
    userSettingsFirstName: Input,
    userSettingsSecondName: Input,
    userSettingsDisplayName: Input,
    userSettingsPhoneNumber: Input,
    attr: { name: string, id: string, class: string },
}

interface IUserSettingsForm extends IUserSettingsFormProps, IUserSettingsFormChildren {}

export default class UserSettingsForm extends Block<IUserSettingsForm> {
    constructor(props: IUserSettingsFormProps) {
        const userSettingsForm = new Form('form', {
            userSettingsMail,
            userSettingsLogin,
            userSettingsFirstName,
            userSettingsSecondName,
            userSettingsDisplayName,
            userSettingsPhoneNumber,
            attr: {
                name: 'user-settings-form',
                id: 'user-settings-form',
                class: 'user-settings-form',
            },
        });
        super('section', {
            userSettingsForm,
            ...props,
        });
        userSettingsForm._props.events = {
            submit: this.submitChangeUserSettings,
        };
    }

    submitChangeUserSettings : any = async (event: Event) => {
        const userSettingsForm = this._children.userSettingsForm;
        if (!userSettingsForm) {
            return;
        }

        const email = userSettingsForm._children.userSettingsMail?._props.value;
        const login = userSettingsForm._children.userSettingsLogin?._props.value;
        const firstName = userSettingsForm
            ._children.userSettingsFirstName?._props.value;
        const secondName = userSettingsForm
            ._children.userSettingsSecondName?._props.value;
        const displayName = userSettingsForm
            ._children.userSettingsDisplayName?._props.value;
        const phone = userSettingsForm
            ._children.userSettingsPhoneNumber?._props.value;

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
            event.preventDefault();
            event.stopPropagation();

            await usersApi.changeSettings(data);

            this._children.userAvatar.setProps({ displayName });
            this.readonlyOn();

            this._children.buttonSaveUserSettings?.hide();
            this._children.buttonCancel?.hide();

            this._children.buttonChangeData.show();
            this._children.buttonChangePassword.show();
            this._children.buttonLogOut.show();
        } catch (error) {
            // eslint-disable-next-line
            console.log('error: ', error);
        }
    };

    settings = [
        this._children.userSettingsForm._children.userSettingsMail,
        this._children.userSettingsForm._children.userSettingsLogin,
        this._children.userSettingsForm._children.userSettingsFirstName,
        this._children.userSettingsForm._children.userSettingsSecondName,
        this._children.userSettingsForm._children.userSettingsDisplayName,
        this._children.userSettingsForm._children.userSettingsPhoneNumber,
    ];

    readonlyOff() {
        this.settings.forEach((inputInstance: any) => {
            const value = inputInstance.getValue();
            inputInstance.setProps({ readonly: false, value });
        });
    }

    readonlyOn() {
        this.settings.forEach((inputInstance: any) => {
            inputInstance.setProps({ readonly: true });
        });
    }

    render() {
        return this.compile(userSettingsFormTemplate, this._props);
    }
}
