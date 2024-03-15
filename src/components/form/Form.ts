import template from './template.ts';
import Block from '../../core/Block.ts';
import {
    IInput, Button,
} from '../index.ts';

export interface IFormProps {
    name?: string;
    inputEmail?: IInput,
    inputLogin?: IInput,
    inputFirstName?: IInput,
    inputSecondName?: IInput,
    inputPhone?: IInput,
    inputPassword?: IInput,
    inputRepeatPassword?: IInput,
    inputChatSearc?: IInput,
    inputSendMessag?: IInput,
    userSettingsMail?: IInput,
    userSettingsLogin?: IInput,
    userSettingsFirstName?: IInput,
    userSettingsSecondName?: IInput,
    userSettingsDisplayName?: IInput,
    userSettingsPhoneNumber?: IInput,
    inputChatSearch?: IInput,
    inputSendMessage?: IInput,
    userSettingsOldPassword?: IInput,
    userSettingsNewPassword?: IInput,
    userSettingsConfirmPassword?: IInput,
    buttonSaveNewPassword?: Button,
    buttonChangeData?: Button,
    buttonChangePassword?: Button,
    buttonLogOut?: Button,
    buttonSaveUserSettings?: Button,
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
