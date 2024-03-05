import template from './template.ts';
import Block from '../../core/Block.ts';
import {
    IInput, IButton,
} from '../index.ts';

export interface IForm {
    name?: string;
    inputEmail: IInput,
    inputLogin: IInput,
    inputFirstName: IInput,
    inputSecondName: IInput,
    inputPhone: IInput,
    inputPassword: IInput,
    inputRepeatPassword: IInput,
    inputChatSearc: IInput,
    inputSendMessag: IInput,
    userSettingsMail: IInput,
    userSettingsLogin: IInput,
    userSettingsFirstName: IInput,
    userSettingsSecondName: IInput,
    userSettingsDisplayName: IInput,
    userSettingsPhoneNumber: IInput,
    buttonSaveUserSettings :IButton,
    buttonSendMessage: IButton,
    buttonRegister: IButton,
    buttonSignIn: IButton,
}

export default class Form extends Block<IForm> {
    render() {
        return this.compile(template, this._props);
    }
}
