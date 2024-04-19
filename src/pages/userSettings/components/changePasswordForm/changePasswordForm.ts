/* eslint-disable no-use-before-define */
import Block from '../../../../core/Block.ts';
import {
    Input, Form, Button,
} from '../../../../components/index.ts';
import changePasswordFormTemplate from './template.ts';
import usersApi from '../../../../api/usersApi.ts';
import UserSettingsForm from '../userSettingsForm/userSettingsForm.ts';

import {
    passwordValidation,
} from '../../../../utils/validation.ts';

const setAttributeValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    const inputElement = event.target as HTMLInputElement;
    inputElement?.setAttribute('value', newValue);
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

const userSettingsOldPassword = new Input('div', {
    label: 'Old password',
    name: 'oldPassword',
    type: 'password',
    placeholder: 'Old password',
    class: 'change-password-form__field-input change-password-form__field-input_is_hidden',
    labelClass: 'change-password-form__field-label',
    attr: {
        class: 'change-password-form__field',
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
    class: 'change-password-form__field-input',
    labelClass: 'change-password-form__field-label',
    attr: {
        class: 'change-password-form__field',
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
    class: 'change-password-form__field-input',
    labelClass: 'change-password-form__field-label',
    attr: {
        class: 'change-password-form__field',
    },
    events: {
        focusout: validateConfirmPassword,
        input: setAttributeValue,
    },
});

interface IChangePasswordFormProps {
    userSettingsForm : UserSettingsForm,
    buttonSavePassword : Button,
    buttonCancel : Button,
    buttonChangeData : Button,
    buttonChangePassword : Button,
    buttonLogOut : Button,
}

interface IChangePasswordFormChildren {
    changePasswordForm: Form,
    userSettingsOldPassword: Input,
    userSettingsNewPassword: Input,
    userSettingsConfirmPassword: Input,
    attr: { name: string, id: string, class: string },
}

interface IChangePasswordForm extends IChangePasswordFormProps, IChangePasswordFormChildren {}

export default class СhangePasswordForm extends Block<IChangePasswordForm> {
    constructor(props: IChangePasswordFormProps) {
        const changePasswordForm = new Form('form', {
            userSettingsOldPassword,
            userSettingsNewPassword,
            userSettingsConfirmPassword,
            attr: {
                name: 'change-password-form',
                id: 'change-password-form',
            },
        });
        super('section', {
            changePasswordForm,
            ...props,
        });
        changePasswordForm._props.events = {
            submit: this.submitChangePassword,
        };
    }

    submitChangePassword: any = async (event: Event) => {
        const form = this._children.changePasswordForm._element as HTMLFormElement;
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

            event.preventDefault();
            event.stopPropagation();

            await usersApi.changePassword(data);

            this._children.changePasswordForm.hide();
            this._children.changePasswordForm._children.buttonSavePassword?.hide();
            this._children.changePasswordForm._children.buttonCancel?.hide();
            this._children.userSettingsForm.show();
            this._children.buttonChangeData.show();
            this._children.buttonChangePassword.show();
            this._children.buttonLogOut.show();
        } catch (error) {
            // eslint-disable-next-line
            console.log('error: ', error);
        }
    };

    render() {
        return this.compile(changePasswordFormTemplate, this._props);
    }
}
