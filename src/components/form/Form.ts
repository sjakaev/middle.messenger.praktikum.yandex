import template from './template.ts';
import Block from '../../core/Block.ts';
import {
    Input, Button,
} from '../index.ts';

export interface IFormProps {
    name?: string;
    inputEmail?: Input,
    inputLogin?: Input,
    inputFirstName?: Input,
    inputSecondName?: Input,
    inputPhone?: Input,
    inputPassword?: Input,
    inputRepeatPassword?: Input,
    inputChatSearc?: Input,
    inputSendMessag?: Input,
    userSettingsMail?: Input,
    userSettingsLogin?: Input,
    userSettingsFirstName?: Input,
    userSettingsSecondName?: Input,
    userSettingsDisplayName?: Input,
    userSettingsPhoneNumber?: Input,
    inputChatSearch?: Input,
    inputSendMessage?: Input,
    userSettingsOldPassword?: Input,
    userSettingsNewPassword?: Input,
    userSettingsConfirmPassword?: Input,
    buttonSavePassword?: Button,
    buttonChangeData?: Button,
    buttonChangePassword?: Button,
    buttonLogOut?: Button,
    buttonSaveUserSettings?: Button,
    buttonCancel?: Button,
    buttonSendMessage?: Button,
    buttonRegister?: Button,
    buttonSignIn?: Button,
    attr?: { [key: string]: string };
    // eslint-disable-next-line no-unused-vars
    events?: { [key: string]: (event: Event) => void };
}

export default class Form extends Block<IFormProps> {
    render() {
        return this.compile(template, this._props);
    }
}
